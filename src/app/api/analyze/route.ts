import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const MASTER_PROMPT = `Eres un auditor experto de compliance para Meta Ads con acceso completo a las Meta Advertising Policies, Business Help Center, y conocimiento profundo de cómo el sistema de enforcement de Meta funciona EN LA PRÁCTICA (no solo en teoría). Analizarás imágenes, videos, screenshots o copy de anuncios para Instagram y Facebook.

DISTINCIÓN CRÍTICA — POLÍTICA LITERAL vs. ENFORCEMENT REAL:
Meta tiene dos capas de riesgo que DEBES evaluar por separado:
- VIOLACIÓN LITERAL: Incumplimiento claro de una política escrita de Meta.
- RIESGO DE ENFORCEMENT: Patrones que el sistema de IA de Meta detecta y puede usar para bajar cuentas, incluso si no hay violación literal. Esto incluye: income claims específicos sin contexto, patrones "antes/después" de resultados financieros, testimonios con cifras exactas de ingresos, imágenes de personas sonrientes asociadas a claims de dinero/libertad financiera, y cualquier patrón que el sistema de ML de Meta asocie con esquemas de "get rich quick".

NICHOS DE ALTO RIESGO (requieren análisis de enforcement, no solo de política literal):
- Coaching, consultoría, cursos online, mentorías — ESPECIALMENTE cuando incluyen income claims
- Trading, Inversiones, Criptomonedas, Forex
- Real Estate / Bienes Raíces
- MLM / Network Marketing
- Suplementos, Pérdida de peso, Salud
- OnlyFans y contenido para adultos
- Apuestas y juegos de azar

INCOME CLAIMS — REGLA ESPECIAL (muy importante):
Si el anuncio menciona cifras específicas de ingresos (ej: "US$ 8.000/mes", "€5.000/semana", "gano X por mes"), evalúa:
1. ¿Hay un disclaimer visible de "resultados individuales varían"?
2. ¿Hay prueba social verificable o contexto que Meta pueda validar?
3. ¿El nicho del anunciante es coaching/consultoría/cursos? Si SÍ, el riesgo de enforcement es ALTO independientemente de si hay violación literal.
Sin estos elementos, el income claim es una señal de riesgo HIGH que puede resultar en cuenta baneada.

CALIBRACIÓN DE SCORE (sé preciso, no excesivamente generoso):
- 85-100: Anuncio limpio, sin riesgos, apto para cualquier nicho.
- 70-84: Corre bien generalmente, puede requerir revisión manual ocasional.
- 50-69: RIESGO REAL de rechazo o limitación de cuenta. Necesita cambios importantes.
- 30-49: Probabilidad alta de rechazo. Cambios urgentes recomendados.
- 0-29: Violación clara. No correr bajo ningún circunstancia.

Un anuncio con income claims específicos sin disclaimers en nicho de coaching NO puede tener score >65, independientemente de qué tan bueno sea el copy.

REGLA DE REDONDEO OBLIGATORIA: El score DEBE ser un múltiplo de 5 (ej: 55, 60, 65, 70, 75). Nunca uses valores como 63, 71, 78. Esto es mandatorio.

REGLAS DE ANÁLISIS:
1. Analiza TANTO violaciones literales COMO riesgos de enforcement real.
2. El campo "violations" es SOLO para violaciones literales de política escrita.
3. El campo "warnings" es para riesgos de enforcement real — tratar con la misma seriedad que las violations.
4. NO marques como violación el marketing direct-response agresivo (urgencia, hooks emocionales, CTAs fuertes, escasez, prueba social) si no hay income claims o patrones de alto riesgo.
5. Proporciona SIEMPRE 3 alternativas Meta-Compliant que eliminen el riesgo real.
6. Si el riesgo_level es "high", explica ESPECÍFICAMENTE qué patrón detecta el sistema de Meta.

Responde ÚNICAMENTE con un JSON válido en este formato exacto (sin markdown, sin nada fuera del JSON):
{
  "score": <0-100>,
  "risk_level": "<low|medium|high>",
  "violations": ["<violaciones LITERALES de política escrita de Meta — array vacío [] si no hay>"],
  "warnings": ["<riesgos de enforcement real que pueden resultar en rechazo o ban de cuenta, aunque no sean violaciones literales>"],
  "compliance_explanation": "<explicación detallada del análisis: qué está bien, qué está mal, y POR QUÉ el sistema de Meta podría flaggearlo>",
  "improvements": ["<cambios concretos y accionables para eliminar el riesgo y mantener el mensaje de marketing>"],
  "alternatives": {
    "soft": "<versión conservadora con disclaimers apropiados, 100% segura>",
    "medium": "<versión equilibrada que mantiene el impacto pero elimina el riesgo de enforcement>",
    "aggressive": "<versión de máximo impacto que sigue siendo segura para correr sin riesgo de ban>"
  }
}`;

export const maxDuration = 300; // Allow function to run up to 300 seconds

async function executeWithRetry<T>(fn: () => Promise<T>, retries = 8, delayMs = 3000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      if (i === retries - 1) throw error;
      const msg = error.message || "";
      const isRetryable = msg.includes("503") || msg.includes("429") || msg.includes("Too Many Requests") ||
        msg.includes("high demand") || msg.includes("Resource has been exhausted") ||
        msg.includes("Service Unavailable") || msg.includes("overloaded") || msg.includes("UNAVAILABLE");
      if (isRetryable) {
        console.warn(`AI Provider Error (attempt ${i + 1}/${retries}): ${msg}. Retrying in ${delayMs}ms...`);
        await new Promise(r => setTimeout(r, delayMs));
      } else {
        throw error;
      }
    }
  }
  throw new Error("Retry failed after all attempts");
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

    // ── VIDEO → Gemini Files API (gemini-2.5-flash, fallback gemini-1.5-flash) ──
    if (type === "video" && fileUrl) {
      const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY!);
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

      // Download video from Supabase once
      const videoResponse = await fetch(fileUrl);
      if (!videoResponse.ok) throw new Error("Failed to download video from storage");
      const videoBuffer = await videoResponse.arrayBuffer();
      const mimeType = fileMimeType as string;
      const displayName = fileName || "ad_creative";

      // Helper: upload video to Gemini Files API and wait until ACTIVE
      const uploadAndWait = async (): Promise<string> => {
        const boundary = `hitd_${Date.now()}`;
        const metadataBytes = Buffer.from(JSON.stringify({ file: { display_name: displayName } }), "utf-8");
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
          // Treat upload 429/503 as retryable
          if (uploadResponse.status === 429 || uploadResponse.status === 503) {
            throw new Error(`503 Gemini upload overloaded: ${errText}`);
          }
          throw new Error(`Gemini upload failed: ${uploadResponse.status} – ${errText}`);
        }

        const uploadJson = await uploadResponse.json();
        const uploadedFileName: string = uploadJson.file?.name;
        const uploadedFileUri: string = uploadJson.file?.uri;
        if (!uploadedFileUri) throw new Error("Gemini did not return a file URI");

        // Wait until ACTIVE
        let fileInfo = await fileManager.getFile(uploadedFileName);
        let waitMs = 2000;
        while (fileInfo.state === "PROCESSING") {
          await new Promise(r => setTimeout(r, waitMs));
          waitMs = Math.min(waitMs * 1.5, 10000); // progressive wait
          fileInfo = await fileManager.getFile(uploadedFileName);
        }
        if (fileInfo.state === "FAILED") {
          throw new Error("Gemini file processing failed.");
        }

        return uploadedFileUri;
      };

      // Upload with retry — max 3 tries, 3s fixed delay
      const uploadedFileUri = await executeWithRetry(uploadAndWait, 3, 3000);

      // Try primary model, fallback to gemini-2.0-flash-001
      const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash-001"];
      let lastError: any;
      let parsed = false;

      for (const modelName of modelsToTry) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName, generationConfig: { temperature: 0 } });
          const videoPart: Part = { fileData: { mimeType, fileUri: uploadedFileUri } };
          const textPart: Part = { text: MASTER_PROMPT + (text ? `\n\nAdditional ad copy:\n${text}` : "") };
          // Max 5 retries × 3s = 15s max wait per model before trying next
          const result = await executeWithRetry(() => model.generateContent([textPart, videoPart]), 5, 3000);
          const rawText = result.response.text();
          const cleaned = rawText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
          jsonResult = JSON.parse(cleaned);
          parsed = true;
          break;
        } catch (err: any) {
          lastError = err;
          console.warn(`Model ${modelName} failed: ${err.message}. ${modelsToTry.indexOf(modelName) < modelsToTry.length - 1 ? 'Trying fallback...' : 'No more fallbacks.'}`);
        }
      }

      if (!parsed) throw lastError;

      // Cleanup Gemini file (best effort)
      const uploadedFileName = uploadedFileUri.split("/").pop()!;
      await fileManager.deleteFile(`files/${uploadedFileName}`).catch(() => {});

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
        temperature: 0,
        seed: 42,
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

      const savedAnalysis = await prisma.analysis.create({
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

      return NextResponse.json({ success: true, remainingCredits, analysis: jsonResult, analysisId: savedAnalysis.id });
    } catch (dbError) {
      // DB write failed — log it but still return the analysis result to the user.
      // A background job or manual fix can reconcile credits later.
      console.error("DB write after analysis failed:", dbError);
      return NextResponse.json({ success: true, remainingCredits: user.credits - cost, analysis: jsonResult, analysisId: null });
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
