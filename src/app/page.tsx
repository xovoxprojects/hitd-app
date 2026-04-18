import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, BarChart3, ChevronRight, Activity, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-purple-400/20 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4 w-full sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">hitd.ai</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/pricing" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Pricing</Link>
          <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Log in</Link>
          <Link href="/pricing" className="px-5 py-2 text-sm font-semibold text-white rounded-full bg-slate-900 hover:bg-slate-800 transition-colors shadow-md">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative flex flex-col items-center justify-center pt-28 pb-24 px-6 text-center z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 bg-white border border-slate-200 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">v2.0 Compliance Engine</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight max-w-4xl mx-auto text-slate-900 mb-6 leading-[1.15]">
          Stop Getting Your <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Ads Rejected.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
          The ultimate AI-powered analysis tool for your creatives and copy. Uncover zero-day Meta policy violations and scale with absolute confidence.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link 
            href="/dashboard" 
            className="px-8 py-4 bg-slate-900 text-white rounded-full font-semibold text-lg flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            Start Analyzing <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Clean Abstract UI Preview */}
        <div className="mt-24 relative w-full max-w-5xl mx-auto">
          {/* Mac window wrapper */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden">
            {/* Window header */}
            <div className="h-12 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="w-64 h-6 ml-4 bg-white border border-slate-200 rounded-md flex items-center justify-center">
                <span className="text-[10px] text-slate-400 font-mono">hitd.ai/dashboard/analysis</span>
              </div>
            </div>
            {/* Window body */}
            <div className="p-8 bg-slate-50 flex gap-6">
              
              {/* Score panel */}
              <div className="w-1/3 bg-white rounded-xl border border-slate-100 shadow-sm p-8 flex flex-col items-center justify-center text-center">
                <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                  {/* Fake animated circle */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" className="stroke-slate-100" strokeWidth="8" />
                    <circle cx="50" cy="50" r="45" fill="none" className="stroke-blue-600" strokeWidth="8" strokeLinecap="round" strokeDasharray="283" strokeDashoffset="22.6" />
                  </svg>
                  <span className="text-4xl font-black text-slate-800">92</span>
                </div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Performance Score</h4>
              </div>

              {/* Insights panel */}
              <div className="w-2/3 flex flex-col gap-4">
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex flex-col items-center md:flex-row md:items-start gap-4">
                  <div className="p-3 bg-red-50 text-red-500 rounded-xl"><ShieldCheck className="w-6 h-6" /></div>
                  <div className="text-center md:text-left">
                    <h4 className="font-bold text-slate-800 mb-1">0 Violations Detected</h4>
                    <p className="text-sm text-slate-500">Your creative perfectly aligns with Meta Personal Attributes policy.</p>
                  </div>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl border border-blue-100 shadow-sm p-6 flex flex-col items-center md:flex-row md:items-start gap-4">
                  <div className="p-3 bg-white text-blue-600 rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.05)] border border-blue-50"><Activity className="w-6 h-6" /></div>
                  <div className="text-center md:text-left">
                    <h4 className="font-bold text-blue-900 mb-1">Actionable Insight</h4>
                    <p className="text-sm text-blue-700">Consider increasing the contrast of your CTA button by 15% to boost CTR.</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </main>

      {/* Feature Grid */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto z-10 border-t border-slate-200">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4">
             Everything you need to scale profitably.
           </h2>
           <p className="text-slate-500 text-lg">No more guesswork. Automated compliance checks for absolute peace of mind.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
              <ShieldCheck className="text-blue-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">Policy Compliance</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Instantly scan images, videos, and text for subtle Meta policy violations before the algorithm catches them. Avoid costly account bans.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-6">
              <Zap className="text-purple-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">Rewrite to Convert</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Our AI doesn't just flag issues—it dynamically rewrites your copy structure for higher engagement and conversion rates.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-6">
              <TrendingUp className="text-green-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900">Predictive Scoring</h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Get an instant empirical score (0-100) determining the predicted success of your creative. Stop guessing and start launching winners.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
