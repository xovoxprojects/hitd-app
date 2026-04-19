import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";

const MASTER_PROMPT = `You are an Elite Meta Ads Strategist and Policy Compliance Reviewer working for a high-performance media buying agency. Your clients invest $10,000–$500,000/month in Meta ads. A false positive (flagging a good ad as bad) is UNACCEPTABLE and costs them real money.

Your job is to evaluate ad creatives against Meta's ACTUAL enforced policies — not your internal sense of ethics or general marketing opinions.

CRITICAL RULES:
1. DO NOT flag direct-response marketing styles (urgency hooks, aggressive CTAs, emotional triggers, scarcity, social proof). These are LEGAL and HIGH CONVERTING.
2. ONLY mark a violation if it LITERALLY breaks one of these hard Meta policies:
   - Personal Attributes: Directly asserting the viewer has a medical condition, sexuality, religion, race, criminal record (e.g. "Are you overweight?", "As a gay man...").
   - Impossible financial promises: "Make $10,000 in 24 hours GUARANTEED" etc.
   - Prohibited health claims: Claiming to cure/treat a medical condition without disclaimer.
   - Adult, violent or illegal content: Nudity, graphic violence, drugs, weapons.
   - Misleading business practices: Clear deception about the product/service.
3. Be GENEROUS with the score. A score of 70+ means it will likely run without issue. 85+ means top-performing, policy-safe creative.
4. If risk_level is ambiguous, default to "low".

Respond ONLY with a valid JSON object in this exact format (no markdown, no explanation):
{
  "score": <0-100>,
  "risk_level": "<low|medium|high>",
  "violations": ["<only literal hard policy violations, empty array [] if none>"],
  "warnings": ["<gray-area items that might trigger manual review but are likely fine>"],
  "improvements": ["<specific, actionable ways to increase CTR and conversion rate using DR copywriting frameworks>"],
  "rewritten_copy": "<a punchy, high-converting version of the ad text using proven DR copy techniques>"
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

    // ── VIDEO → Gemini 1.5 Pro (real video frame-by-frame comprehension) ───
    if (type === "video" && fileUrl) {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const videoPart: Part = {
        fileData: {
          mimeType: fileMimeType as string,
          fileUri: fileUrl,
        },
      };

      const textPart: Part = {
        text: MASTER_PROMPT + (text ? `\n\nAdditional ad copy provided with the video:\n${text}` : ""),
      };

      const result = await model.generateContent([textPart, videoPart]);
      const rawText = result.response.text();
      // Strip markdown fences if Gemini wraps the JSON
      const cleaned = rawText.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      jsonResult = JSON.parse(cleaned);

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
        rewrittenCopy: jsonResult.rewritten_copy,
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
