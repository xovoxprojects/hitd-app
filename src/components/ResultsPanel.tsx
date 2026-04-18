import { ShieldAlert, ShieldCheck, Zap, AlertTriangle, FileText, CheckCircle2 } from "lucide-react";

export default function ResultsPanel({ result }: { result: any }) {
  if (!result) return null;

  const isHighRisk = result.risk_level === "high";
  const isMediumRisk = result.risk_level === "medium";
  
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-10 mt-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
      
      {/* Dynamic Status Glow */}
      <div className={`absolute top-0 right-0 w-[800px] h-32 blur-[100px] pointer-events-none opacity-40 transition-colors duration-1000 ${isHighRisk ? 'bg-red-400' : isMediumRisk ? 'bg-amber-400' : 'bg-green-400'}`} />

      <div className="flex flex-col md:flex-row items-start justify-between mb-12 pb-10 border-b border-slate-200/60 relative z-10">
        <div className="mb-8 md:mb-0">
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Analysis Report</h2>
          <div className="flex items-center gap-3 focus:outline-none">
            <span className={`px-5 py-2 rounded-xl text-sm font-black tracking-widest uppercase shadow-sm flex items-center gap-2 ${isHighRisk ? 'bg-red-50 text-red-600 border border-red-200' : isMediumRisk ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${isHighRisk ? 'bg-red-600' : isMediumRisk ? 'bg-amber-600' : 'bg-green-600'}`}></div>
              {result.risk_level} RISK DETECTED
            </span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-7xl font-black bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-700 to-slate-400 tracking-tighter">
            {result.score}<span className="text-4xl text-slate-300">/100</span>
          </div>
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Conversion Value Score</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Violations */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)] group hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-2xl ${isHighRisk ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
              {isHighRisk ? <ShieldAlert className="w-7 h-7" /> : <ShieldCheck className="w-7 h-7" />}
            </div>
            <h3 className="font-bold text-slate-900 text-xl tracking-tight">Policy Violations</h3>
          </div>
          {result.violations && result.violations.length > 0 ? (
            <ul className="space-y-4">
              {result.violations.map((v: string, i: number) => (
                <li key={i} className="text-slate-600 font-medium flex items-start gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">!</span> 
                  <span className="leading-relaxed">{v}</span>
                </li>
              ))}
            </ul>
          ) : (
             <div className="flex flex-col gap-2">
                 <p className="text-sm font-bold text-green-700 flex items-center gap-2 bg-green-50 border border-green-100 px-5 py-3 rounded-xl w-full">
                    <CheckCircle2 className="w-5 h-5"/> Zero violations detected
                 </p>
                 <p className="text-xs font-medium text-slate-400 px-1">Your creative is fully compliant with Meta Ads structural guidelines.</p>
             </div>
          )}
        </div>

        {/* Warnings */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)] group hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-2xl ${isMediumRisk || result.warnings?.length > 0 ? 'bg-amber-50 text-amber-500' : 'bg-slate-50 text-slate-400'}`}>
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-900 text-xl tracking-tight">Vulnerability Warnings</h3>
          </div>
          {result.warnings && result.warnings.length > 0 ? (
            <ul className="space-y-4">
              {result.warnings.map((w: string, i: number) => (
                <li key={i} className="text-slate-600 font-medium flex items-start gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">!</span>
                  <span className="leading-relaxed">{w}</span>
                </li>
              ))}
            </ul>
          ) : (
             <p className="text-sm font-bold text-slate-500 bg-slate-50 border border-slate-100 px-5 py-3 rounded-xl w-full">No gray-area concerns detected.</p>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 items-stretch">
        {/* Improvements */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)] group hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-900 text-xl tracking-tight">Performance Boosters</h3>
          </div>
          {result.improvements && result.improvements.length > 0 ? (
            <ul className="space-y-4">
              {result.improvements.map((imp: string, i: number) => (
                <li key={i} className="text-slate-600 font-medium flex items-start gap-4 p-3 bg-blue-50/30 rounded-xl border border-blue-50">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"><Zap className="w-3 h-3"/></span> 
                  <span className="leading-relaxed">{imp}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm font-bold text-slate-500 bg-slate-50 border border-slate-100 px-5 py-3 rounded-xl w-full">Creative aligns with best practices.</p>
          )}
        </div>

        {/* Rewritten Copy */}
        {result.rewritten_copy && (
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl shadow-indigo-900/10 relative group overflow-hidden h-full flex flex-col">
            <div className="absolute top-0 right-0 p-6 z-20">
              <button onClick={() => navigator.clipboard.writeText(result.rewritten_copy)} className="px-5 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-all shadow-sm active:scale-95 flex items-center gap-2">
                COPY <FileText className="w-3 h-3" />
              </button>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="flex items-center gap-3 mb-6 text-white relative z-10">
              <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30">
                <FileText className="w-7 h-7 text-indigo-300" />
              </div>
              <div>
                 <h3 className="font-bold text-xl tracking-tight text-white">Optimized Copy</h3>
                 <p className="text-xs text-indigo-200/70 font-medium">Auto-generated by hitd.ai</p>
              </div>
            </div>
            <div className="flex-1 mt-2 p-6 bg-black/40 border border-slate-800 rounded-2xl text-slate-300 text-base leading-relaxed whitespace-pre-wrap font-serif shadow-inner relative z-10 overflow-auto">
              {result.rewritten_copy}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
