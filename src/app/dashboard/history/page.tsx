"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { History, FileImage, FileVideo, FileText, ShieldCheck, ShieldAlert, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/analyses")
        .then((r) => r.json())
        .then((d) => { setAnalyses(d.analyses || []); setLoading(false); });
    }
  }, [status]);

  if (loading) {
    return (
      <div className="flex flex-col space-y-4 mt-10">
        {[1,2,3].map(i => <div key={i} className="h-20 bg-slate-100 rounded-2xl animate-pulse" />)}
      </div>
    );
  }

  const typeIcon = (type: string) => {
    if (type === "video") return <FileVideo className="w-5 h-5 text-indigo-500" />;
    if (type === "image") return <FileImage className="w-5 h-5 text-blue-500" />;
    return <FileText className="w-5 h-5 text-slate-400" />;
  };

  const riskBadge = (level: string) => {
    if (level === "high") return <span className="px-3 py-1 rounded-full text-xs font-black bg-red-50 text-red-600 border border-red-200 flex items-center gap-1"><ShieldAlert className="w-3 h-3"/>HIGH</span>;
    if (level === "medium") return <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-600 border border-amber-200 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/>MEDIUM</span>;
    return <span className="px-3 py-1 rounded-full text-xs font-black bg-green-50 text-green-600 border border-green-200 flex items-center gap-1"><ShieldCheck className="w-3 h-3"/>LOW</span>;
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto pb-20">
      <header className="mb-10 mt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mb-4">
          <History className="w-3.5 h-3.5" /> Analysis History
        </div>
        <h1 className="text-4xl font-black mb-2 tracking-tight text-slate-900">Tu Historial</h1>
        <p className="text-slate-500 font-medium">Todos tus análisis anteriores, con resultados completos.</p>
      </header>

      {analyses.length === 0 ? (
        <Card className="p-16 flex flex-col items-center justify-center text-center border-slate-200">
          <History className="w-12 h-12 text-slate-200 mb-4" />
          <p className="text-slate-400 font-medium">Todavía no realizaste ningún análisis.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {analyses.map((a) => (
            <Card key={a.id} className="border-slate-200 bg-white shadow-sm overflow-hidden">
              <div
                className="flex items-center gap-4 p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setExpanded(expanded === a.id ? null : a.id)}
              >
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  {typeIcon(a.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 capitalize truncate">
                    {a.type === "text" ? "Copy / Texto" : a.type === "image" ? "Imagen / Creativo" : "Video"}
                  </p>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {new Date(a.createdAt).toLocaleDateString("es-AR", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" })}
                    {" · "}{a.cost} crédito{a.cost !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <span className="text-3xl font-black text-slate-900">{a.score}</span>
                    <span className="text-sm text-slate-300">/100</span>
                  </div>
                  {riskBadge(a.riskLevel)}
                  {expanded === a.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </div>

              {expanded === a.id && (
                <div className="border-t border-slate-100 p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
                  {/* Violations */}
                  {a.violations?.length > 0 && (
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-red-500 mb-2">Violaciones</p>
                      <ul className="space-y-2">
                        {a.violations.map((v: string, i: number) => (
                          <li key={i} className="text-sm text-slate-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2">{v}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Warnings */}
                  {a.warnings?.length > 0 && (
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-amber-500 mb-2">Advertencias</p>
                      <ul className="space-y-2">
                        {a.warnings.map((w: string, i: number) => (
                          <li key={i} className="text-sm text-slate-600 bg-amber-50 border border-amber-100 rounded-xl px-4 py-2">{w}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Improvements */}
                  {a.improvements?.length > 0 && (
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-2">Mejoras</p>
                      <ul className="space-y-2">
                        {a.improvements.map((imp: string, i: number) => (
                          <li key={i} className="text-sm text-slate-600 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2">{imp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Compliance explanation */}
                  {a.complianceExplanation && (
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-green-600 mb-2">¿Por qué está bien?</p>
                      <p className="text-sm text-slate-600 bg-green-50 border border-green-100 rounded-xl px-4 py-3">{a.complianceExplanation}</p>
                    </div>
                  )}

                  {/* 3 Alternatives */}
                  {a.alternatives && (
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-3">Alternativas Meta-Compliant</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["soft","medium","aggressive"].map((key) => a.alternatives[key] && (
                          <div key={key} className={`rounded-2xl p-4 text-sm leading-relaxed ${key === "soft" ? "bg-emerald-950 text-emerald-100/80" : key === "medium" ? "bg-blue-950 text-blue-100/80" : "bg-slate-900 text-slate-300 border border-indigo-500/20"}`}>
                            <p className={`text-xs font-black uppercase tracking-wider mb-2 ${key === "soft" ? "text-emerald-400" : key === "medium" ? "text-blue-400" : "text-indigo-400"}`}>{key === "aggressive" ? "🔥 Agresivo" : key.charAt(0).toUpperCase() + key.slice(1)}</p>
                            {a.alternatives[key]}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
