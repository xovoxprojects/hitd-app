import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

// ── Real Stripe Price IDs ──────────────────────────────────────────────────
const PRICE_IDS: Record<string, string> = {
  growth: "price_1TO0V8FPLfWtW3yTxfohE2Ch", // TODO: Update with new Stripe Price ID for Growth ($9.99)
  pro:    "price_1TSxDEFPLfWtW3yTDqo98lcL",
  elite:  "price_1TSxDXFPLfWtW3yT8g1qZ5uL",
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planName } = await req.json();

    const priceId = PRICE_IDS[planName?.toLowerCase()];
    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: session.user.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/#pricing`,
      metadata: {
        userId: session.user.id,
        planName: planName.toLowerCase(),
      },
    });

    return NextResponse.json({ sessionId: stripeSession.id, url: stripeSession.url });
  } catch (err: unknown) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
