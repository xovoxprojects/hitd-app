import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

const PROMPT_INSTRUCTION = `You are an Elite Meta Ads Strategist and Policy Reviewer. Your goal is to maximize direct-response conversions while staying safely within Meta's "Unacceptable Business Practices" and "Personal Attributes" policies.

You are evaluating an ad creative. You must NOT flag aggressive, high-converting direct-response copy unless it explicitly violates a hard Meta policy (e.g., explicitly claiming a user has a specific personal attribute "Are you fat?", making impossible health/financial promises, or using prohibited profanity/violence). 
Aggressive hooks, strong calls to action, and emotional triggers are GOOD and HIGH CONVERTING. Do not give false positives for strong marketing.

Provide a VERY STRICT JSON matching this format exactly:
{
  "score": <0-100 score, reward strong direct-response marketing heavily>,
  "risk_level": "<low|medium|high>. Mark 'low' unless there's a literal violation.",
  "violations": ["<Literal Meta policy violations ONLY, be very strict before adding one>"],
  "warnings": ["<List things that might trigger Meta manual review but are likely safe>"],
  "improvements": ["<How to make the copy even MORE direct, punchy, and Click-Through-Rate focused>"],
  "rewritten_copy": "<A high-converting CTR-focused version using proven Direct-Response copywriting frameworks>"
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
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
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
