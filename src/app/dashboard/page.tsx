"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UploadArea from "@/components/UploadArea";
import ResultsPanel from "@/components/ResultsPanel";
import { Sparkles } from "lucide-react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex flex-col space-y-6 mt-10">
        <div className="h-10 bg-slate-200 rounded-lg w-1/3 animate-pulse"></div>
        <div className="h-64 bg-slate-100 rounded-3xl w-full flex items-center justify-center animate-pulse">
          <div className="w-8 h-8 rounded-full border-4 border-slate-300 border-t-slate-500 animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!session?.user) return null;

  const isLocked = (session.user.plan || "none") === "none" || (session.user.credits || 0) <= 0;

  return (
    <div className="animate-in fade-in duration-500 relative">
      <header className="mb-12 mt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
           <Sparkles className="w-3.5 h-3.5" /> AI Scanning Engine
        </div>
        <h1 className="text-4xl font-black mb-3 tracking-tight text-slate-900">AI Compliance Check</h1>
        <p className="text-lg text-slate-500 font-medium">Upload your creatives to automatically scan for Meta Ads policy violations based on machine-learning heuristics.</p>
      </header>

      {isLocked && (
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl mb-10 flex flex-col sm:flex-row justify-between items-center text-sm shadow-xl shadow-blue-500/20 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <span className="mb-4 sm:mb-0 text-base font-semibold relative z-10 w-full sm:w-2/3">Activa tu suscripción inicial para desbloquear el escáner de inteligencia artificial.</span>
          <button onClick={() => router.push('/pricing')} className="relative z-10 px-8 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-neutral-50 hover:scale-105 transition-all shadow-md w-full sm:w-auto text-center">
            View Plans &rarr;
          </button>
        </div>
      )}

      <div className={isLocked ? "pointer-events-none opacity-50 select-none grayscale-[0.5]" : ""}>
        <UploadArea onAnalysisComplete={(data) => setResult(data.analysis)} />
      </div>
      
      {result && !isLocked && (
        <div className="animate-in slide-in-from-bottom-8 duration-700">
           <ResultsPanel result={result} />
        </div>
      )}
    </div>
  );
}
