"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Activity, TrendingUp, Check, X, ChevronDown, Image as ImageIcon, Video, FileText, BarChart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// FAQ Data
const faqs = [
  {
    question: "What is an AI ad analyzer?",
    answer: "An AI ad analyzer reviews your ad creatives, copy, and structure to identify issues affecting performance and compliance, giving you actionable fixes instead of guesswork."
  },
  {
    question: "Why are my Facebook ads getting rejected?",
    answer: "Ads are often rejected due to Meta Ads policy violations, misleading claims, or restricted content. Our tool detects these issues instantly before you publish."
  },
  {
    question: "How can I improve my ad conversion rate?",
    answer: "Improving your ad copy, creative clarity, and targeting message can significantly increase conversions. hitd.ai helps optimize all of these in one place."
  },
  {
    question: "Can this analyze video ads?",
    answer: "Yes. You can upload images, videos, screenshots, or text copy – any format your ads come in."
  },
  {
    question: "Do I need experience in marketing?",
    answer: "No. The tool explains everything in simple terms and gives actionable recommendations anyone can follow."
  }
];

// Pricing component locally to embed in landing page
const LandingPricing = () => (
  <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-12">
    <div className="bg-white border border-slate-200 rounded-[2rem] p-10 flex flex-col hover:shadow-lg transition-transform duration-300">
      <h3 className="text-xl font-bold mb-1 text-slate-900">Growth</h3>
      <p className="text-slate-500 text-sm mb-6 font-medium">Perfect for casual advertisers.</p>
      <div className="flex flex-wrap items-baseline gap-2 mb-8 border-b border-slate-100 pb-8">
        <span className="text-4xl font-black text-slate-900">$19.99</span>
        <span className="text-slate-500 font-medium">/mo</span>
      </div>
      <ul className="space-y-4 mb-10 flex-grow">
        <li className="flex items-center gap-3 text-slate-700 font-medium text-sm">
          <Check className="w-5 h-5 text-blue-500 shrink-0" /> 20 credits per month
        </li>
        <li className="flex items-center gap-3 text-slate-700 font-medium text-sm">
          <Check className="w-5 h-5 text-blue-500 shrink-0" /> Full support (Image, Text)
        </li>
        <li className="flex items-center gap-3 text-slate-700 font-medium text-sm">
          <Check className="w-5 h-5 text-blue-500 shrink-0" /> Video analysis
        </li>
      </ul>
      <Link href="/pricing" className="w-full block text-center py-3 rounded-full border border-slate-200 text-slate-900 hover:bg-slate-50 font-bold transition-colors">
        Get Growth
      </Link>
    </div>

    <div className="relative bg-slate-900 text-white rounded-[2rem] p-10 flex flex-col shadow-2xl scale-105 z-10">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
        Recommended
      </div>
      <h3 className="text-xl font-bold mb-1 text-white">Pro</h3>
      <p className="text-slate-400 text-sm mb-6 font-medium">The full suite for serious media buyers.</p>
      <div className="flex flex-wrap items-baseline gap-2 mb-8 border-b border-slate-800 pb-8">
        <span className="text-4xl font-black text-white">$49.99</span>
        <span className="text-slate-400 font-medium">/mo</span>
      </div>
      <ul className="space-y-4 mb-10 flex-grow">
        <li className="flex items-center gap-3 text-slate-200 font-medium text-sm">
          <Check className="w-5 h-5 text-blue-400 shrink-0" /> 50 credits per month
        </li>
        <li className="flex items-center gap-3 text-slate-200 font-medium text-sm">
          <Check className="w-5 h-5 text-blue-400 shrink-0" /> Priority processing
        </li>
        <li className="flex items-center gap-3 text-slate-200 font-medium text-sm">
          <Check className="w-5 h-5 text-blue-400 shrink-0" /> Advanced depth analysis
        </li>
        <li className="flex items-center gap-3 text-slate-200 font-medium text-sm">
          <Check className="w-5 h-5 text-blue-400 shrink-0" /> Actionable Insights
        </li>
      </ul>
      <Link href="/pricing" className="w-full block text-center py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-bold transition-colors">
        Get Started
      </Link>
    </div>

    <div className="bg-white border border-slate-200 rounded-[2rem] p-10 flex flex-col hover:shadow-lg transition-transform duration-300">
      <h3 className="text-xl font-bold mb-1 text-slate-900">Elite</h3>
      <p className="text-slate-500 text-sm mb-6 font-medium">Volume analysis for scaling.</p>
      <div className="flex flex-wrap items-baseline gap-2 mb-8 border-b border-slate-100 pb-8">
        <span className="text-4xl font-black text-slate-900">$499</span>
        <span className="text-slate-500 font-medium">/mo</span>
      </div>
      <ul className="space-y-4 mb-10 flex-grow">
        <li className="flex items-center gap-3 text-slate-700 font-medium text-sm">
          <Check className="w-5 h-5 text-blue-500 shrink-0" /> Unlimited usage*
        </li>
        <li className="flex items-center gap-3 text-slate-700 font-medium text-sm">
          <Check className="w-5 h-5 text-blue-500 shrink-0" /> Weekly calls with Expert
        </li>
        <li className="flex items-center gap-3 text-slate-700 font-medium text-sm">
          <Check className="w-5 h-5 text-blue-500 shrink-0" /> Manual Content review
        </li>
      </ul>
      <Link href="/pricing" className="w-full block text-center py-3 rounded-full border border-slate-200 text-slate-900 hover:bg-slate-50 font-bold transition-colors">
        Get Elite
      </Link>
    </div>
  </div>
);

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 min-h-screen">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4 w-full sticky top-0 z-50 bg-slate-50/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="hitd.ai Logo" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
          <span className="text-xl font-bold tracking-tight text-slate-900 ml-1">hitd.ai</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/pricing" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors hidden md:block">Pricing</Link>
          <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Log in</Link>
          <Link href="/pricing" className="px-5 py-2 text-sm font-semibold text-white rounded-full bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 bg-white border border-slate-200 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">v2.0 Compliance Engine</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-tight"
        >
          AI Ad Analyzer for<br />
          <span className="text-blue-600">Meta Ads & Conversions</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium"
        >
          Analyze your ad creatives, detect Meta policy violations, and improve your conversion rate with AI in seconds.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Link href="/dashboard" className="inline-flex px-8 py-3.5 bg-slate-900 text-white rounded-full font-bold text-sm items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg">
            Start Analyzing <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-slate-400 mt-4 font-medium">No trial. No guesswork. Just better ads.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 w-full max-w-4xl"
        >
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 relative">
            <div className="absolute top-4 left-4 flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            </div>
            <div className="flex justify-center mt-2 mb-6">
               <div className="px-6 py-1 bg-slate-50 border border-slate-100 rounded-md text-[10px] text-slate-400 font-mono">
                  hitd.ai/dashboard/analyze
               </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 p-4 md:p-8 pt-0 items-center justify-center">
              <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-100 min-w-[200px]">
                <div className="text-5xl font-black text-blue-600 mb-2">92</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Performance Score</div>
              </div>
              <div className="flex flex-col gap-3 flex-1 w-full relative">
                <div className="flex items-start gap-3 p-4 bg-white border border-green-100 shadow-sm rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">0 Violations Detected</h4>
                    <p className="text-xs text-slate-500">Your creative aligns with Meta Personal Attributes policy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white border border-blue-100 shadow-sm rounded-xl">
                  <Activity className="w-5 h-5 text-blue-500 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Actionable Insight</h4>
                    <p className="text-xs text-slate-500">Increase CTA contrast by 15% to boost CTR.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-24 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3">The Problem</h4>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Most Ads Fail Before They Even Start</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-3">
              {[
                "Weak hooks that don't stop scrolling",
                "Hidden Meta policy violations you can't see",
                "Generic copy that doesn't convert",
                "Poor structure that kills engagement"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-red-50/50 border border-red-100 rounded-xl">
                  <X className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{text}</span>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 md:p-10">
               <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Meta Algorithm Sees This</h5>
               <div className="space-y-3">
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <ShieldCheck className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-red-700">Policy violation: restricted language detected</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <Activity className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-amber-700">Low engagement predicted: weak hook</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <Activity className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-amber-700">Ad rejected: misleading claim</span>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <Activity className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-amber-700">Poor CTR expected: unclear CTA</span>
                  </div>
               </div>
               <p className="text-[10px] text-slate-400 mt-4 italic">You don't see these, but the algorithm does.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-slate-50 py-24 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3">The Solution</h4>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">See Exactly What's Wrong and Fix It Instantly</h2>
            <p className="text-slate-500 md:text-lg max-w-2xl font-medium">hitd.ai analyzes your ads like a performance marketer and a compliance reviewer at the same time.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Performance Score", desc: "Instant 0-100 score based on real performance signals." },
              { num: "02", title: "Policy Detection", desc: "Catch Meta violations before they flag your account." },
              { num: "03", title: "Conversion Tips", desc: "Actionable suggestions to improve hooks, clarity, and CTR." },
              { num: "04", title: "AI Copy Rewrite", desc: "Get a rewritten version of your copy optimized to convert." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm"
              >
                <div className="text-3xl font-black text-blue-100 mb-4">{item.num}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="bg-white py-24 px-6 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3">Features</h4>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Everything you need to scale profitably.</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">No more guesswork. Automated compliance and performance checks for absolute peace of mind.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 border border-slate-200 rounded-2xl hover:shadow-md transition-shadow">
               <ShieldCheck className="w-8 h-8 text-blue-500 mb-4" />
               <h3 className="text-lg font-bold text-slate-900 mb-2">Meta Ads Policy Checker</h3>
               <p className="text-sm font-bold text-slate-400 mb-3">Avoid Rejections and Account Risks</p>
               <p className="text-slate-500 text-sm">Instantly detect hidden Meta Ads policy violations before they get your ads rejected or your account flagged.</p>
            </div>
            <div className="p-8 border border-slate-200 rounded-2xl hover:shadow-md transition-shadow">
               <FileText className="w-8 h-8 text-amber-500 mb-4" />
               <h3 className="text-lg font-bold text-slate-900 mb-2">Ad Copy Analyzer</h3>
               <p className="text-sm font-bold text-slate-400 mb-3">Fix What's Killing Your Conversions</p>
               <p className="text-slate-500 text-sm">Get AI-powered suggestions and rewrites to improve your messaging hooks and clarity.</p>
            </div>
            <div className="p-8 border border-slate-200 rounded-2xl hover:shadow-md transition-shadow">
               <BarChart className="w-8 h-8 text-indigo-500 mb-4" />
               <h3 className="text-lg font-bold text-slate-900 mb-2">Ad Performance Score</h3>
               <p className="text-sm font-bold text-slate-400 mb-3">Know If Your Ad Will Convert Before Spending</p>
               <p className="text-slate-500 text-sm">Get a predictive score (0-100) based on real performance signals before you spend a dollar.</p>
            </div>
            <div className="p-8 border border-slate-200 rounded-2xl hover:shadow-md transition-shadow">
               <Video className="w-8 h-8 text-rose-500 mb-4" />
               <h3 className="text-lg font-bold text-slate-900 mb-2">Creative Analysis</h3>
               <p className="text-sm font-bold text-slate-400 mb-3">Understand What Works and What Doesn't</p>
               <p className="text-slate-500 text-sm">Analyze images, videos, and copy to identify weak points and missed opportunities in your creatives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="bg-slate-50 py-24 px-6 border-t border-slate-200">
        <div className="max-w-5xl mx-auto text-center">
          <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3">How it works</h4>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-20">From Upload to Better Ads in Seconds</h2>
          
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-4">
            <div className="hidden md:block absolute top-6 left-0 w-full h-[2px] bg-slate-200 z-0"></div>
            
            {[
              { title: "Upload your ad", desc: "Image, video, or copy - any format works." },
              { title: "Get instant analysis", desc: "AI reviews compliance, copy, and performance." },
              { title: "Fix the issues", desc: "Apply suggestions or use the AI rewrite directly." },
              { title: "Launch with confidence", desc: "Run ads knowing they're built to convert." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center flex-1 max-w-[200px] mx-auto"
              >
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-lg mb-6 shadow-lg shadow-blue-500/30">
                  {i + 1}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-500 font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stop Guessing CTA */}
      <section className="bg-white py-32 px-6 border-t border-slate-100 text-center">
        <div className="max-w-3xl mx-auto">
          <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3">Stop Wasting Budget</h4>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Stop Guessing.<br/>Start Launching Winning Ads.</h2>
          <p className="text-lg text-slate-500 font-medium mb-10">Every day you run ads without proper analysis, you're wasting money. Fix your ads before you spend another dollar.</p>
          <Link href="/dashboard" className="inline-flex px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-sm items-center gap-2 hover:bg-slate-800 transition-colors shadow-xl">
            Start Analyzing <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Why Ads Fail Content */}
      <section className="bg-slate-50 py-24 px-6 border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3">Why Ads Fail</h4>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8">Why Are Your Ads Getting Rejected or Not Converting?</h2>
          <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
            <p>Many ads fail due to Meta Ads policy violations, weak ad copy, or poor creative structure. An ad copy analyzer and Meta ads checker can help identify these issues but most tools don't combine compliance and performance analysis.</p>
            <p>hitd.ai uses AI to analyze your ads and show exactly what to fix to improve conversion rates and avoid rejection. No guesswork. No wasted spend.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white py-24 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3">Pricing</h4>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Simple Pricing. No Surprises.</h2>
          </div>
          <LandingPricing />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-24 px-6 border-t border-slate-200">
         <div className="max-w-3xl mx-auto">
          <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3 text-center">FAQ</h4>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-12 text-center">Common questions</h2>
          
          <div className="space-y-4">
             {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                   <button 
                     onClick={() => toggleFaq(index)}
                     className="w-full text-left p-6 font-bold text-slate-900 flex justify-between items-center hover:bg-slate-50 transition-colors"
                   >
                      {faq.question}
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                   </button>
                   <AnimatePresence>
                      {openFaq === index && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           transition={{ duration: 0.3 }}
                           className="overflow-hidden"
                         >
                            <div className="p-6 pt-0 text-sm text-slate-600 font-medium">
                               {faq.answer}
                            </div>
                         </motion.div>
                      )}
                   </AnimatePresence>
                </div>
             ))}
          </div>
         </div>
      </section>

      {/* Final Footer CTA */}
      <section className="bg-white py-24 px-6 text-center border-t border-slate-100 pb-32">
        <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3">Ready?</h4>
        <h2 className="text-4xl font-black text-slate-900 mb-6">Your Ads Can Perform Better.<br/>Fix Them Today.</h2>
        <p className="text-slate-500 mb-10 font-medium">Stop wasting ad spend on creatives that don't convert.</p>
        <Link href="/dashboard" className="inline-flex px-8 py-3.5 bg-slate-900 text-white rounded-full font-bold text-sm items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg">
          Start Analyzing <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
      
    </div>
  );
}
