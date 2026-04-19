import { ShieldAlert, ShieldCheck, Zap, AlertTriangle, FileText, CheckCircle2, Sparkles } from "lucide-react";

export default function ResultsPanel({ result }: { result: any }) {
  if (!result) return null;

  const isHighRisk = result.risk_level === "high";
  const isMediumRisk = result.risk_level === "medium";
  const hasViolations = result.violations && result.violations.length > 0;

  const alternatives = result.alternatives || {};

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-10 mt-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">

      {/* Dynamic Status Glow */}
      <div className={`absolute top-0 right-0 w-[800px] h-32 blur-[100px] pointer-events-none opacity-40 transition-colors duration-1000 ${isHighRisk ? 'bg-red-400' : isMediumRisk ? 'bg-amber-400' : 'bg-green-400'}`} />

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between mb-12 pb-10 border-b border-slate-200/60 relative z-10">
        <div className="mb-8 md:mb-0">
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Reporte de Análisis</h2>
          <div className="flex items-center gap-3">
            <span className={`px-5 py-2 rounded-xl text-sm font-black tracking-widest uppercase shadow-sm flex items-center gap-2 ${isHighRisk ? 'bg-red-50 text-red-600 border border-red-200' : isMediumRisk ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${isHighRisk ? 'bg-red-600' : isMediumRisk ? 'bg-amber-600' : 'bg-green-600'}`}></div>
              RIESGO {result.risk_level?.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-7xl font-black bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-700 to-slate-400 tracking-tighter">
            {result.score}<span className="text-4xl text-slate-300">/100</span>
          </div>
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Puntuación de Conversión</span>
        </div>
      </div>

      {/* Violations & Warnings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {/* Violations */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)] group hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-2xl ${hasViolations ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
              {hasViolations ? <ShieldAlert className="w-7 h-7" /> : <ShieldCheck className="w-7 h-7" />}
            </div>
            <h3 className="font-bold text-slate-900 text-xl tracking-tight">Violaciones de Política</h3>
          </div>
          {hasViolations ? (
            <ul className="space-y-4">
              {result.violations.map((v: string, i: number) => (
                <li key={i} className="text-slate-600 font-medium flex items-start gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">!</span>
                  <span className="leading-relaxed">{v}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold text-green-700 flex items-center gap-2 bg-green-50 border border-green-100 px-5 py-3 rounded-xl w-full">
                <CheckCircle2 className="w-5 h-5" /> Sin violaciones detectadas
              </p>
              {result.compliance_explanation && (
                <p className="text-sm text-slate-500 leading-relaxed px-1">{result.compliance_explanation}</p>
              )}
            </div>
          )}
        </div>

        {/* Warnings */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)] group hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-2xl ${isMediumRisk || result.warnings?.length > 0 ? 'bg-amber-50 text-amber-500' : 'bg-slate-50 text-slate-400'}`}>
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-900 text-xl tracking-tight">Advertencias de Vulnerabilidad</h3>
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
            <p className="text-sm font-bold text-slate-500 bg-slate-50 border border-slate-100 px-5 py-3 rounded-xl w-full">El creativo sigue las mejores prácticas.</p>
          )}
        </div>
      </div>

      {/* Improvements */}
      {result.improvements && result.improvements.length > 0 && (
        <div className="mt-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)] relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-900 text-xl tracking-tight">Mejoras de Performance</h3>
          </div>
          <ul className="space-y-3">
            {result.improvements.map((imp: string, i: number) => (
              <li key={i} className="text-slate-600 font-medium flex items-start gap-4 p-3 bg-blue-50/30 rounded-xl border border-blue-50">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"><Zap className="w-3 h-3" /></span>
                <span className="leading-relaxed">{imp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 3 Meta-Compliant Alternatives */}
      {(alternatives.soft || alternatives.medium || alternatives.aggressive) && (
        <div className="mt-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-xl tracking-tight text-slate-900">3 Alternativas Meta-Compliant</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Generadas automáticamente por hitd.ai</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Soft */}
            {alternatives.soft && (
              <div className="bg-emerald-950 rounded-3xl p-7 relative overflow-hidden flex flex-col">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className="text-xs font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">Soft</span>
                  <button onClick={() => navigator.clipboard.writeText(alternatives.soft)} className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-all active:scale-95 flex items-center gap-1">
                    COPY <FileText className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-emerald-100/80 text-sm leading-relaxed flex-1 whitespace-pre-wrap relative z-10">{alternatives.soft}</p>
              </div>
            )}

            {/* Medium */}
            {alternatives.medium && (
              <div className="bg-blue-950 rounded-3xl p-7 relative overflow-hidden flex flex-col">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className="text-xs font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-lg">Medium</span>
                  <button onClick={() => navigator.clipboard.writeText(alternatives.medium)} className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-all active:scale-95 flex items-center gap-1">
                    COPY <FileText className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-blue-100/80 text-sm leading-relaxed flex-1 whitespace-pre-wrap relative z-10">{alternatives.medium}</p>
              </div>
            )}

            {/* Aggressive */}
            {alternatives.aggressive && (
              <div className="bg-slate-900 rounded-3xl p-7 relative overflow-hidden flex flex-col border border-indigo-500/20">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className="text-xs font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-lg">🔥 Agresivo</span>
                  <button onClick={() => navigator.clipboard.writeText(alternatives.aggressive)} className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-all active:scale-95 flex items-center gap-1">
                    COPY <FileText className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed flex-1 whitespace-pre-wrap relative z-10">{alternatives.aggressive}</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
