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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Retrieve the metadata set during checkout creation
    const userId = session.metadata?.userId;
    const planName = session.metadata?.planName; // 'starter', 'growth', 'pro'
    
    if (userId && planName) {
      let creditsToAdd = 0;
      if (planName === "growth") creditsToAdd = 20;
      else if (planName === "pro") creditsToAdd = 50;
      else if (planName === "elite") creditsToAdd = 200;

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

  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice;
    // Renew credits for consecutive months
    if (invoice.subscription) {
      const subscriptionId = invoice.subscription as string;
      const user = await prisma.user.findUnique({
        where: { stripeSubscriptionId: subscriptionId }
      });
      
      if (user) {
        let creditsToReset = 0;
        if (user.plan === "growth") creditsToReset = 20;
        else if (user.plan === "pro") creditsToReset = 50;
        else if (user.plan === "elite") creditsToReset = 200;

        await prisma.user.update({
          where: { id: user.id },
          data: {
            credits: creditsToReset // Resets to base, could also accumulate if desired
          }
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
