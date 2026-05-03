import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!sig) throw new Error("No signature");
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook Error:", err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle successful checkouts (both subscriptions and one-time payments)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Retrieve the metadata set during checkout creation
    const userId = session.metadata?.userId;
    const type = session.metadata?.type; // 'pack' or 'subscription'
    const planName = session.metadata?.planName; // 'starter', 'pro', 'elite' OR 'pack_100', etc.
    const creditsToAddStr = session.metadata?.creditsToAdd;
    
    if (userId) {
      if (type === "pack" && creditsToAddStr) {
        // One-time payment for credit pack
        const creditsToAdd = parseInt(creditsToAddStr, 10);
        await prisma.user.update({
          where: { id: userId },
          data: {
            credits: { increment: creditsToAdd }
          }
        });
      } else if (type === "subscription" && planName) {
        // New Subscription
        let creditsToAdd = 0;
        if (planName === "starter") creditsToAdd = 20;
        else if (planName === "pro") creditsToAdd = 50;
        else if (planName === "elite") creditsToAdd = 150;

        await prisma.user.update({
          where: { id: userId },
          data: {
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            plan: planName,
            credits: creditsToAdd
          }
        });
      }
    }
  }

  // Handle monthly renewals
  if (event.type === "invoice.payment_succeeded") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const invoice = event.data.object as any;
    // Renew credits for consecutive months
    if (invoice.subscription) {
      const subscriptionId = invoice.subscription as string;
      const user = await prisma.user.findUnique({
        where: { stripeSubscriptionId: subscriptionId }
      });
      
      if (user) {
        let creditsToReset = 0;
        if (user.plan === "starter") creditsToReset = 20;
        else if (user.plan === "pro") creditsToReset = 50;
        else if (user.plan === "elite") creditsToReset = 150;

        await prisma.user.update({
          where: { id: user.id },
          data: {
            credits: creditsToReset // Resets to base, could also accumulate if desired
          }
        });
      }
    }
  }

  // Handle subscription cancellations (Retention Tactic)
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    
    // Find the user with this subscription ID
    const user = await prisma.user.findUnique({
      where: { stripeSubscriptionId: subscription.id }
    });

    if (user) {
      // Wipe credits and remove plan
      await prisma.user.update({
        where: { id: user.id },
        data: {
          plan: "none",
          credits: 0,
          stripeSubscriptionId: null // Clear the subscription ID since it's cancelled
        }
      });
    }
  }

  return NextResponse.json({ received: true });
}
