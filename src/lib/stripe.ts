import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-03-25.dahlia", // Adjust depending on stripe SDK version
  appInfo: {
    name: "HITD.ai",
    version: "0.1.0",
  },
});
