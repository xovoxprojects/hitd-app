import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PROMPT_INSTRUCTION = `You are an expert Meta Ads Strategist and Policy Compliance Reviewer.
Analyze the provided ad creative (image/text). 
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
    const contentArray: any[] = [{ type: "text", text: PROMPT_INSTRUCTION }];
    
    if (text) {
      contentArray.push({ type: "text", text: `Ad Copy: \n${text}` });
    }

    if (fileUrl) {
      if (type === "image") {
        contentArray.push({
          type: "image_url",
          image_url: {
            url: fileUrl,
            detail: "high"
          }
        });
      } else if (type === "video") {
        contentArray.push({
          type: "text",
          text: `[System Notice: The user uploaded a video. Video URL: ${fileUrl}. Current OpenAI models cannot directly watch MP4 URLs via Chat Completions, but please infer as much as you can from the surrounding text or file name if possible: ${fileName}]`
        });
      }
    }

    // Call OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: contentArray,
        },
      ],
      response_format: { type: "json_object" }
    });

    const aiText = response.choices[0].message.content;
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
