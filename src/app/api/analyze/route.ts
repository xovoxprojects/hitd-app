import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";
import os from "os";

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

      // 1. Download the video from Supabase into /tmp
      const videoResponse = await fetch(fileUrl);
      if (!videoResponse.ok) throw new Error("Failed to download video from storage");
      const videoBuffer = await videoResponse.arrayBuffer();
      const ext = (fileMimeType as string).split("/")[1] || "mp4";
      const tmpPath = join(os.tmpdir(), `hitd_${Date.now()}.${ext}`);
      writeFileSync(tmpPath, Buffer.from(videoBuffer));

      let uploadedFileUri = "";
      try {
        // 2. Upload to Gemini Files API
        const uploadResult = await fileManager.uploadFile(tmpPath, {
          mimeType: fileMimeType as string,
          displayName: fileName || "ad_creative",
        });
        uploadedFileUri = uploadResult.file.uri;

        // 3. Wait until file is ACTIVE (processing)
        let fileInfo = await fileManager.getFile(uploadResult.file.name);
        while (fileInfo.state === "PROCESSING") {
          await new Promise((r) => setTimeout(r, 2000));
          fileInfo = await fileManager.getFile(uploadResult.file.name);
        }
        if (fileInfo.state === "FAILED") throw new Error("Gemini file processing failed.");

        // 4. Analyze
        const videoPart: Part = { fileData: { mimeType: fileMimeType as string, fileUri: uploadedFileUri } };
        const textPart: Part = { text: MASTER_PROMPT + (text ? `\n\nAdditional ad copy:\n${text}` : "") };
        const result = await model.generateContent([textPart, videoPart]);
        const rawText = result.response.text();
        const cleaned = rawText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        jsonResult = JSON.parse(cleaned);

        // 5. Delete the uploaded file from Gemini to avoid quota buildup
        await fileManager.deleteFile(uploadResult.file.name).catch(() => {});
      } finally {
        // Always clean up /tmp
        unlinkSync(tmpPath);
      }

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

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: contentArray }],
        response_format: { type: "json_object" },
      });

      const aiText = response.choices[0].message.content;
      if (!aiText) throw new Error("No response from AI");
      jsonResult = JSON.parse(aiText);
    }

    // Deduct credits
    const remainingCredits = Math.max(0, user.credits - cost);
    await prisma.user.update({
      where: { id: user.id },
      data: { credits: remainingCredits },
    });

    // Save Analysis
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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to analyze";
    console.error("Analysis Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
