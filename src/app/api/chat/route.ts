import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const CHAT_COST = 0.5;

const SYSTEM_PROMPT = `Eres un auditor experto de compliance para Meta Ads. El usuario ya recibió un análisis inicial de su anuncio y ahora continúa la conversación contigo para hacer preguntas de seguimiento, subir versiones mejoradas, o pedir aclaraciones.

Tenés acceso completo al análisis inicial y al historial de la conversación. Respondé siempre en español, de forma clara, directa y accionable. Si el usuario sube un nuevo creativo (imagen o video), analizalo en el contexto de la conversación previa.`;

export const maxDuration = 300;

async function executeWithRetry<T>(fn: () => Promise<T>, retries = 10, delayMs = 2500): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      if (i === retries - 1) throw error;
      const msg = error.message || "";
      if (msg.includes("503") || msg.includes("429") || msg.includes("Too Many Requests") || msg.includes("high demand") || msg.includes("Resource has been exhausted") || msg.includes("Service Unavailable")) {
        await new Promise(r => setTimeout(r, delayMs));
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

    const { analysisId, message, fileUrl, fileMimeType, fileName } = await req.json();

    if (!analysisId || !message?.trim()) {
      return NextResponse.json({ error: "Missing analysisId or message" }, { status: 400 });
    }

    // Load the analysis and verify ownership
    const analysis = await prisma.analysis.findUnique({ where: { id: analysisId } });
    if (!analysis || analysis.userId !== session.user.id) {
      return NextResponse.json({ error: "Analysis not found" }, { status: 404 });
    }

    // Check credits
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user || user.credits < CHAT_COST) {
      return NextResponse.json({ error: "Créditos insuficientes. Necesitás al menos 0.5 créditos para continuar el chat." }, { status: 403 });
    }

    // Build message history
    const history = (analysis.messages as any[]) || [];

    // Compose the context string with initial analysis
    const initialAnalysisContext = `
=== ANÁLISIS INICIAL DEL ANUNCIO ===
Score: ${analysis.score}/100
Riesgo: ${analysis.riskLevel}
Violaciones: ${JSON.stringify(analysis.violations)}
Advertencias: ${JSON.stringify(analysis.warnings)}
Mejoras sugeridas: ${JSON.stringify(analysis.improvements)}
Explicación: ${analysis.complianceExplanation || "N/A"}
${analysis.textContent ? `Copy original analizado: ${analysis.textContent}` : ""}
${analysis.contentUrl ? `Creativo original: ${analysis.contentUrl}` : ""}
===================================`;

    let reply: string;

    // ── VIDEO follow-up → Gemini ─────────────────────────────────────────
    if (fileUrl && fileMimeType?.startsWith("video/")) {
      const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY!);
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: { temperature: 0.3 } });

      const videoResponse = await fetch(fileUrl);
      if (!videoResponse.ok) throw new Error("Failed to download video");
      const videoBuffer = await videoResponse.arrayBuffer();
      const boundary = `hitd_chat_${Date.now()}`;
      const metadataBytes = Buffer.from(JSON.stringify({ file: { display_name: fileName || "ad_creative" } }), "utf-8");
      const videoBytes = Buffer.from(videoBuffer);
      const body = Buffer.concat([
        Buffer.from(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n`),
        metadataBytes,
        Buffer.from(`\r\n--${boundary}\r\nContent-Type: ${fileMimeType}\r\n\r\n`),
        videoBytes,
        Buffer.from(`\r\n--${boundary}--`),
      ]);

      const uploadResponse = await fetch(
        `https://generativelanguage.googleapis.com/upload/v1beta/files?uploadType=multipart&key=${process.env.GEMINI_API_KEY}`,
        { method: "POST", headers: { "Content-Type": `multipart/related; boundary=${boundary}`, "Content-Length": body.length.toString() }, body }
      );
      if (!uploadResponse.ok) throw new Error(`Gemini upload failed: ${uploadResponse.status}`);
      const uploadJson = await uploadResponse.json();
      const uploadedFileName: string = uploadJson.file?.name;
      const uploadedFileUri: string = uploadJson.file?.uri;
      if (!uploadedFileUri) throw new Error("Gemini did not return a file URI");

      let uploadedFileInfo = await fileManager.getFile(uploadedFileName);
      while (uploadedFileInfo.state === "PROCESSING") {
        await new Promise(r => setTimeout(r, 2000));
        uploadedFileInfo = await fileManager.getFile(uploadedFileName);
      }
      if (uploadedFileInfo.state === "FAILED") throw new Error("Gemini file processing failed.");

      // Build history context as text
      const historyText = history.map((m: any) => `${m.role === "user" ? "Usuario" : "IA"}: ${m.content}`).join("\n");
      const videoPart: Part = { fileData: { mimeType: fileMimeType, fileUri: uploadedFileUri } };
      const textPart: Part = { text: `${SYSTEM_PROMPT}\n\n${initialAnalysisContext}\n\nHistorial:\n${historyText}\n\nUsuario (nuevo creativo adjunto): ${message}` };

      const result = await executeWithRetry(() => model.generateContent([textPart, videoPart]));
      reply = result.response.text();
      await fileManager.deleteFile(uploadedFileName).catch(() => {});

    // ── IMAGE / TEXT follow-up → GPT-4o ─────────────────────────────────
    } else {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      // Build OpenAI messages array with full history
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const messages: any[] = [
        { role: "system", content: SYSTEM_PROMPT + "\n\n" + initialAnalysisContext },
      ];

      // Add prior messages
      for (const m of history) {
        if (m.role === "user") {
          const content: any[] = [{ type: "text", text: m.content }];
          if (m.fileUrl) {
            content.push({ type: "image_url", image_url: { url: m.fileUrl, detail: "high" } });
          }
          messages.push({ role: "user", content });
        } else {
          messages.push({ role: "assistant", content: m.content });
        }
      }

      // Add current user message
      const currentContent: any[] = [{ type: "text", text: message }];
      if (fileUrl && fileMimeType?.startsWith("image/")) {
        currentContent.push({ type: "image_url", image_url: { url: fileUrl, detail: "high" } });
      }
      messages.push({ role: "user", content: currentContent });

      const response = await executeWithRetry(() =>
        openai.chat.completions.create({
          model: "gpt-4o",
          messages,
          temperature: 0.3,
          max_tokens: 2000,
        })
      );

      reply = response.choices[0].message.content || "";
    }

    // Persist messages and deduct credits
    const newMessages = [
      ...history,
      { role: "user", content: message, fileUrl: fileUrl || null, createdAt: new Date().toISOString() },
      { role: "assistant", content: reply, createdAt: new Date().toISOString() },
    ];

    const remainingCredits = Math.max(0, user.credits - CHAT_COST);

    await Promise.all([
      prisma.analysis.update({
        where: { id: analysisId },
        data: { messages: newMessages },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { credits: remainingCredits },
      }),
    ]);

    return NextResponse.json({ success: true, reply, remainingCredits });

  } catch (error: unknown) {
    let message = error instanceof Error ? error.message : "Error en el chat";
    if (message.includes("503") || message.includes("high demand") || message.includes("Service Unavailable")) {
      message = "Los servidores de IA están experimentando alta demanda. Por favor, intentá de nuevo en unos segundos.";
    } else if (message.includes("429") || message.includes("Resource has been exhausted")) {
      message = "Límite de peticiones alcanzado. Por favor, intentá de nuevo en un minuto.";
    }
    console.error("Chat Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
