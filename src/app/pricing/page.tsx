"use client";

import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PricingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handleCheckout = async (priceId: string, planName: string) => {
    if (!session?.user) {
      router.push("/login?callbackUrl=/pricing");
      return;
    }

    setLoadingPriceId(priceId);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId, planName }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error("No checkout URL returned:", data);
        alert("There was an error initiating checkout. Check the console.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setLoadingPriceId(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 py-24 px-6 font-sans overflow-hidden">
      
      {/* Background Blurs */}
      <div className="absolute top-[-20%] left-[10%] w-[50%] h-[50%] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-indigo-300/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto text-center mb-20 z-10">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-10 shadow-sm">
          &larr; Back to home
        </Link>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-slate-900">
          Scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">profitably.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
          Start protecting your ad accounts and boosting conversions today. No free trials. Serious marketers only.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch z-10 perspective-[1000px]">
        {/* Growth Plan */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] p-10 flex flex-col shadow-lg shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 mt-8 md:mt-4">
          <h3 className="text-2xl font-bold mb-2 text-slate-900">Growth</h3>
          <div className="flex flex-wrap items-baseline gap-2 mb-6">
            <span className="text-5xl font-black text-slate-900">$9.99</span>
            <span className="text-lg text-slate-400 line-through font-bold decoration-slate-300">$29.99</span>
            <span className="text-slate-500 font-medium">/mo</span>
          </div>
          <p className="text-slate-500 mb-8 border-b border-slate-100 pb-8 text-sm font-medium">
            Perfect for casual advertisers looking to verify ad copy.
          </p>
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <Check className="w-5 h-5 text-blue-500 shrink-0" /> 20 credits per month
            </li>
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <Check className="w-5 h-5 text-blue-500 shrink-0" /> Full support (Image, Text)
            </li>
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <Check className="w-5 h-5 text-blue-500 shrink-0" /> Video & Screenshot analysis
            </li>
          </ul>
          <button 
            onClick={() => handleCheckout("price_placeholder_growth", "growth")}
            disabled={loadingPriceId !== null}
            className="w-full block text-center py-4 rounded-full bg-slate-100 text-slate-900 hover:bg-slate-200 font-bold transition-colors disabled:opacity-50"
          >
            {loadingPriceId === "price_placeholder_growth" ? "Processing..." : (session ? "Get Growth" : "Login to Subscribe")}
          </button>
        </div>

        {/* Pro Plan */}
        <div className="relative bg-slate-900 text-white rounded-[2.5rem] p-10 flex flex-col transform md:-translate-y-4 shadow-2xl shadow-indigo-500/20 mt-8 md:mt-0">
          <div className="absolute inset-0 rounded-[2.5rem] border-2 border-indigo-500/50 pointer-events-none" />
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg">
            <Sparkles className="w-4 h-4" /> Most Popular
          </div>
          
          <h3 className="text-2xl font-bold mb-2">Pro</h3>
          <div className="flex flex-wrap items-baseline gap-2 mb-6">
            <span className="text-5xl font-black">$49.99</span>
            <span className="text-lg text-slate-500 line-through font-bold decoration-slate-600">$129.99</span>
            <span className="text-slate-400 font-medium">/mo</span>
          </div>
          <p className="text-slate-300 mb-8 border-b border-slate-800 pb-8 text-sm font-medium">
            The full suite for serious media buyers and agencies.
          </p>
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3 text-white font-medium">
              <Check className="w-5 h-5 text-indigo-400 shrink-0" /> 50 credits per month
            </li>
            <li className="flex items-center gap-3 text-white font-medium">
              <Check className="w-5 h-5 text-indigo-400 shrink-0" /> Priority processing
            </li>
            <li className="flex items-center gap-3 text-white font-medium">
              <Check className="w-5 h-5 text-indigo-400 shrink-0" /> Advanced analysis depth
            </li>
            <li className="flex items-center gap-3 text-white font-medium">
              <Check className="w-5 h-5 text-indigo-400 shrink-0" /> Detailed Actionable Insights
            </li>
          </ul>
          <button 
            onClick={() => handleCheckout("price_placeholder_pro", "pro")}
            disabled={loadingPriceId !== null}
            className="relative group overflow-hidden w-full block text-center py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] disabled:opacity-50"
          >
            <span className="relative z-10 text-white">
               {loadingPriceId === "price_placeholder_pro" ? "Processing..." : (session ? "Get Pro" : "Login to Subscribe")}
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:scale-105 transition-transform duration-300"></div>
          </button>
        </div>

        {/* Elite Plan */}
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[2.5rem] p-10 flex flex-col shadow-lg shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 mt-8 md:mt-4">
          <h3 className="text-2xl font-bold mb-2 text-slate-900">Elite</h3>
          <div className="flex flex-wrap items-baseline gap-2 mb-6">
            <span className="text-5xl font-black text-slate-900">$499</span>
            <span className="text-lg text-slate-400 line-through font-bold decoration-slate-300">$999</span>
            <span className="text-slate-500 font-medium">/mo</span>
          </div>
          <p className="text-slate-500 mb-8 border-b border-slate-100 pb-8 text-sm font-medium">
            Volume analysis for scaling multiple ad accounts.
          </p>
          <ul className="space-y-4 mb-10 flex-grow">
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <Check className="w-5 h-5 text-blue-500 shrink-0" /> Unlimited usage*
            </li>
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <Check className="w-5 h-5 text-blue-500 shrink-0" /> Weekly calls with Ads Expert
            </li>
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <Check className="w-5 h-5 text-blue-500 shrink-0" /> Manual Content review by Meta Compliant Expert
            </li>
            <li className="flex items-center gap-3 text-slate-700 font-medium">
              <Check className="w-5 h-5 text-blue-500 shrink-0" /> Skool Community Access (Ads Protection & Content Creation)
            </li>
          </ul>
          <button 
            onClick={() => handleCheckout("price_placeholder_elite", "elite")}
            disabled={loadingPriceId !== null}
            className="w-full block text-center py-4 rounded-full bg-slate-900 text-white hover:bg-slate-800 font-bold transition-colors disabled:opacity-50"
          >
             {loadingPriceId === "price_placeholder_elite" ? "Processing..." : (session ? "Get Elite" : "Login to Subscribe")}
          </button>
          <p className="text-xs font-semibold text-slate-400 text-center mt-6 uppercase tracking-wider">
            *Subject to fair use policy (500 credits/mo)
          </p>
        </div>
      </div>
    </div>
  );
}
