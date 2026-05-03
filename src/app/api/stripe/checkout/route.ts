import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

// ── Real Stripe Price IDs ──────────────────────────────────────────────────
const PRICE_IDS: Record<string, string> = {
  starter: "price_1TO0V8FPLfWtW3yTxfohE2Ch", // Formerly Growth ($9.99)
  pro:     "price_1TSxDEFPLfWtW3yTDqo98lcL",
  elite:   "price_1TSxDXFPLfWtW3yT8g1qZ5uL",
  pack_100: "price_1TSxb7FPLfWtW3yTtVHuYAQl",
  pack_300: "price_1TSxcCFPLfWtW3yTWhSe0wjb",
  pack_500: "price_1TSxcQFPLfWtW3yTGUB09gBV",
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planName } = await req.json();
    const normalizedPlanName = planName?.toLowerCase() as string;

    const priceId = PRICE_IDS[normalizedPlanName];
    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan or pack" }, { status: 400 });
    }

    const isPack = normalizedPlanName.startsWith("pack_");

    // Fetch fresh user data to verify plan status
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    
    if (isPack && (!user?.plan || user.plan === "none")) {
      return NextResponse.json({ error: "You must have an active subscription to buy credit packs." }, { status: 403 });
    }

    let creditsToAdd = "0";
    if (normalizedPlanName === "pack_100") creditsToAdd = "100";
    if (normalizedPlanName === "pack_300") creditsToAdd = "300";
    if (normalizedPlanName === "pack_500") creditsToAdd = "500";

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
      mode: isPack ? "payment" : "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
      cancel_url: isPack ? `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing` : `${process.env.NEXT_PUBLIC_APP_URL}/#pricing`,
      metadata: {
        userId: session.user.id,
        type: isPack ? "pack" : "subscription",
        planName: normalizedPlanName,
        creditsToAdd,
      },
    });

    return NextResponse.json({ sessionId: stripeSession.id, url: stripeSession.url });
  } catch (err: unknown) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
