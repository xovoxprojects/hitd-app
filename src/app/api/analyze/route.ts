import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const MASTER_PROMPT = `Actúa como un representante oficial de Meta que conoce TODAS las políticas de Meta basadas en el sitio web oficial. Analizarás el contenido, screenshot, texto, copywriting o video enviado para verificar que cumple con las políticas de Meta (Meta-Compliant). Este contenido es específicamente para Instagram y Facebook: contenido orgánico, historias, anuncios y creativos.

NICHOS DE ALTO RIESGO A REVISAR CON PROFUNDIDAD: Trading, Inversiones, Real Estate, OnlyFans, Criptomonedas, Suplementos, MLM, Pérdida de peso, Apuestas, y cualquier otro nicho en watchlist de Meta. Para estos nichos, analiza en profundidad la diferencia entre lo que Meta dice literalmente vs. lo que Meta enforce en la práctica.

REGLAS CRÍTICAS:
1. NO marques como violación el marketing direct-response agresivo (urgencia, hooks emocionales, CTAs fuertes, escasez, prueba social). Es LEGAL y de alto rendimiento.
2. SOLO marca violación si hay un incumplimiento LITERAL de una política de Meta.
3. Si hay errores: analiza en profundidad citando la política de Meta específica.
4. Proporciona SIEMPRE 3 alternativas Meta-Compliant (soft, medium, aggressive).
5. Si NO hay errores: explica por qué está bien, citando políticas de Meta, para reafirmar comprensión.
6. Sé generoso: 70+ corre sin problemas, 85+ es creativo de alto rendimiento y seguro.

Responde ÚNICAMENTE con un JSON válido en este formato exacto (sin markdown, sin nada fuera del JSON):
{
  "score": <0-100>,
  "risk_level": "<low|medium|high>",
  "violations": ["<solo violaciones literales de política de Meta, array vacío [] si no hay>"],
  "warnings": ["<zona gris que podría trigger revisión manual pero probablemente está bien>"],
  "compliance_explanation": "<si no hay violaciones, explica POR QUÉ el creativo está bien según políticas de Meta>",
  "improvements": ["<formas accionables de aumentar CTR y conversión>"],
  "alternatives": {
    "soft": "<versión muy conservadora, tono suave, 100% Meta-Compliant>",
    "medium": "<versión equilibrada, directa, Meta-Compliant>",
    "aggressive": "<versión agresiva de direct-response, máximo impacto, 100% Meta-Compliant>"
  }
}`;

export const maxDuration = 300; // Allow function to run up to 300 seconds

async function executeWithRetry<T>(fn: () => Promise<T>, retries = 15, delayMs = 2500): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      if (i === retries - 1) throw error;
      const msg = error.message || "";
      if (msg.includes("503") || msg.includes("429") || msg.includes("Too Many Requests") || msg.includes("high demand") || msg.includes("Resource has been exhausted") || msg.includes("Service Unavailable")) {
        console.warn(`AI Provider Error (${msg}). Retrying ${i + 1}/${retries}...`);
        await new Promise(r => setTimeout(r, delayMs)); // Fixed 2.5s delay
      } else {
        throw error;
      }
    }
  }
  throw new Error("Retry failed");
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { text, fileUrl, fileMimeType, fileName } = await req.json();

    // Determine type and cost
    let type = "text";
    let cost = 1;

    if (fileUrl) {
      if (fileMimeType?.startsWith("video/")) {
        type = "video";
        cost = 2;
      } else {
        type = "image";
        cost = 1;
      }
    }

    // Check credits
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user || user.credits < cost) {
      return NextResponse.json({ error: "Insufficient credits. Please upgrade your plan." }, { status: 403 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let jsonResult: any;

    // ── VIDEO → Gemini Files API + gemini-2.5-flash ───────────────────────
    if (type === "video" && fileUrl) {
      const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY!);
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // 1. Stream the video directly from Supabase → Gemini Files API (no /tmp writes)
      const videoResponse = await fetch(fileUrl);
      if (!videoResponse.ok) throw new Error("Failed to download video from storage");

      const videoBuffer = await videoResponse.arrayBuffer();
      const mimeType = fileMimeType as string;
      const displayName = fileName || "ad_creative";

      // Build multipart body manually for the Gemini Files REST API
      const boundary = `hitd_${Date.now()}`;
      const metadataPart = JSON.stringify({ file: { display_name: displayName } });
      const metadataBytes = Buffer.from(metadataPart, "utf-8");
      const videoBytes = Buffer.from(videoBuffer);

      const body = Buffer.concat([
        Buffer.from(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`),
        metadataBytes,
        Buffer.from(`\r\n--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n`),
        videoBytes,
        Buffer.from(`\r\n--${boundary}--`),
      ]);

      const uploadResponse = await fetch(
        `https://generativelanguage.googleapis.com/upload/v1beta/files?uploadType=multipart&key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": `multipart/related; boundary=${boundary}`,
            "Content-Length": body.length.toString(),
          },
          body,
        }
      );

      if (!uploadResponse.ok) {
        const errText = await uploadResponse.text();
        throw new Error(`Gemini upload failed: ${uploadResponse.status} – ${errText}`);
      }

      const uploadJson = await uploadResponse.json();
      const uploadedFileName: string = uploadJson.file?.name;
      const uploadedFileUri: string = uploadJson.file?.uri;

      if (!uploadedFileUri) throw new Error("Gemini did not return a file URI");

      let uploadedFileInfo = await fileManager.getFile(uploadedFileName);

      // 2. Wait until the file is ACTIVE
      while (uploadedFileInfo.state === "PROCESSING") {
        await new Promise((r) => setTimeout(r, 2000));
        uploadedFileInfo = await fileManager.getFile(uploadedFileName);
      }
      if (uploadedFileInfo.state === "FAILED") throw new Error("Gemini file processing failed.");

      // 3. Analyze
      const videoPart: Part = { fileData: { mimeType, fileUri: uploadedFileUri } };
      const textPart: Part = { text: MASTER_PROMPT + (text ? `\n\nAdditional ad copy:\n${text}` : "") };
      const result = await executeWithRetry(() => model.generateContent([textPart, videoPart]));
      const rawText = result.response.text();
      const cleaned = rawText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      jsonResult = JSON.parse(cleaned);

      // 4. Delete the uploaded file from Gemini to avoid quota buildup
      await fileManager.deleteFile(uploadedFileName).catch(() => {});

    // ── IMAGE / TEXT → GPT-4o ─────────────────────────────────────────────
    } else {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const contentArray: any[] = [{ type: "text", text: MASTER_PROMPT }];

      if (text) {
        contentArray.push({ type: "text", text: `Ad Copy:\n${text}` });
      }

      if (fileUrl && type === "image") {
        contentArray.push({
          type: "image_url",
          image_url: { url: fileUrl, detail: "high" },
        });
      }

      const response = await executeWithRetry(() => openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: contentArray }],
        response_format: { type: "json_object" },
      }));

      const aiText = response.choices[0].message.content;
      if (!aiText) throw new Error("No response from AI");
      jsonResult = JSON.parse(aiText);
    }

    // Deduct credits and save analysis — both in a single try block so a DB
    // failure here is logged but does NOT hide the result from the user.
    try {
      const remainingCredits = Math.max(0, user.credits - cost);
      await prisma.user.update({
        where: { id: user.id },
        data: { credits: remainingCredits },
      });

      await prisma.analysis.create({
        data: {
          userId: user.id,
          type,
          contentUrl: fileUrl,
          textContent: text,
          score: jsonResult.score,
          riskLevel: jsonResult.risk_level,
          violations: jsonResult.violations,
          warnings: jsonResult.warnings,
          improvements: jsonResult.improvements,
          rewrittenCopy: jsonResult.rewritten_copy ?? null,
          complianceExplanation: jsonResult.compliance_explanation ?? null,
          alternatives: jsonResult.alternatives ?? null,
          cost: cost,
        },
      });

      return NextResponse.json({ success: true, remainingCredits, analysis: jsonResult });
    } catch (dbError) {
      // DB write failed — log it but still return the analysis result to the user.
      // A background job or manual fix can reconcile credits later.
      console.error("DB write after analysis failed:", dbError);
      return NextResponse.json({ success: true, remainingCredits: user.credits - cost, analysis: jsonResult });
    }
  } catch (error: unknown) {
    let message = error instanceof Error ? error.message : "Failed to analyze";
    
    // Translate common provider errors to friendly Spanish messages
    if (message.includes("503") || message.includes("high demand") || message.includes("Service Unavailable")) {
      message = "Los servidores de IA están experimentando una alta demanda temporal. Por favor, intentá de nuevo en unos segundos.";
    } else if (message.includes("429") || message.includes("Resource has been exhausted") || message.includes("Too Many Requests")) {
      message = "Límite de peticiones a la IA alcanzado. Por favor, intentá de nuevo en un minuto.";
    } else if (message.includes("ENOSPC") || message.includes("no space left on device")) {
      message = "El servidor no tiene espacio disponible temporalmente. Por favor, intentá de nuevo en unos momentos.";
    }

    console.error("Analysis Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
