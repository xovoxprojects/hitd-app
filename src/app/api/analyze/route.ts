import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const PROMPT_INSTRUCTION = `You are an expert Meta Ads Strategist and Policy Compliance Reviewer.
Analyze the provided ad creative (image/video/text). 
Evaluate it strictly against Meta's current advertising policies (e.g., Personal Attributes, Sensational Content, Misleading Claims) and general digital marketing best practices for conversions.

You MUST respond strictly with a valid JSON document matching the following format:
{
  "score": <number between 0-100 indicating conversion potential>,
  "risk_level": "<low|medium|high> indicating ban risk",
  "violations": ["<list of specific policy violations, empty if none>"],
  "warnings": ["<list of gray-area concerns>"],
  "improvements": ["<list of actionable performance improvements>"],
  "rewritten_copy": "<a high-converting alternative version of the text>"
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
    let cost = 0.5;

    if (fileUrl) {
      if (fileMimeType?.startsWith("video/")) {
        type = "video";
        cost = 4;
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

    // Prepare contents
    let contents: any[] = [];
    if (fileUrl) {
      // In production, we might need to download the file into buffer and encode as base64
      // or use Gemini File API if using standard storage. 
      // For simple MVP image/video via S3 url, we can fetch it, then convert to base64
      const response = await fetch(fileUrl);
      const arrayBuffer = await response.arrayBuffer();
      const base64Data = Buffer.from(arrayBuffer).toString('base64');
      
      contents.push({
        inlineData: {
            data: base64Data,
            mimeType: fileMimeType
        }
      });
    }

    if (text) {
      contents.push({ text });
    }
    contents.push({ text: PROMPT_INSTRUCTION });

    // Call Gemini
    const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
            responseMimeType: "application/json",
        }
    });

    const aiText = result.text;
    if (!aiText) throw new Error("No response from AI");

    const jsonResult = JSON.parse(aiText);

    // Deduct credits
    const remainingCredits = Math.max(0, user.credits - cost);
    await prisma.user.update({
      where: { id: user.id },
      data: { credits: remainingCredits }
    });

    // Save Analysis
    const analysis = await prisma.analysis.create({
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
        rewrittenCopy: jsonResult.rewritten_copy,
        cost: cost
      }
    });

    return NextResponse.json({ success: true, remainingCredits, analysis: jsonResult });
  } catch (error: any) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze" }, { status: 500 });
  }
}
