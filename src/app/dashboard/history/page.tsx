"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import {
  History, FileImage, FileVideo, FileText,
  ShieldCheck, ShieldAlert, AlertTriangle,
  ChevronDown, ChevronUp, X, ChevronLeft, ChevronRight,
  Loader2,
} from "lucide-react";
import ChatPanel from "@/components/ChatPanel";

const PAGE_SIZE = 10;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Analysis = Record<string, any>;

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  const fetchPage = useCallback((p: number) => {
    if (status !== "authenticated") return;
    setLoading(true);
    fetch(`/api/analyses?page=${p}&limit=${PAGE_SIZE}`)
      .then((r) => r.json())
      .then((d) => {
        setAnalyses(d.analyses || []);
        setTotalPages(d.totalPages || 1);
        setTotal(d.total || 0);
        setPage(p);
        setExpanded(null);
      })
      .finally(() => setLoading(false));
  }, [status]);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm("¿Eliminás este análisis? Esta acción no se puede deshacer.")) return;
    setDeleting(id);
    try {
      const res = await fetch("/api/analyses", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Error al eliminar");
      // Remove from local state and adjust pagination
      setAnalyses(prev => prev.filter(a => a.id !== id));
      setTotal(prev => prev - 1);
      if (expanded === id) setExpanded(null);
      // If page is now empty and not first page, go back
      if (analyses.length === 1 && page > 1) {
        fetchPage(page - 1);
      }
    } catch {
      alert("No se pudo eliminar el análisis. Intentá de nuevo.");
    } finally {
      setDeleting(null);
    }
  };

  const typeIcon = (type: string) => {
    if (type === "video") return <FileVideo className="w-5 h-5 text-indigo-500" />;
    if (type === "image") return <FileImage className="w-5 h-5 text-blue-500" />;
    return <FileText className="w-5 h-5 text-slate-400" />;
  };

  const riskBadge = (level: string) => {
    if (level === "high") return <span className="px-3 py-1 rounded-full text-xs font-black bg-red-50 text-red-600 border border-red-200 flex items-center gap-1"><ShieldAlert className="w-3 h-3" />HIGH</span>;
    if (level === "medium") return <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-600 border border-amber-200 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />MEDIUM</span>;
    return <span className="px-3 py-1 rounded-full text-xs font-black bg-green-50 text-green-600 border border-green-200 flex items-center gap-1"><ShieldCheck className="w-3 h-3" />LOW</span>;
  };

  if (loading && analyses.length === 0) {
    return (
      <div className="flex flex-col space-y-4 mt-10">
        {[1, 2, 3].map(i => <div key={i} className="h-20 bg-slate-100 rounded-2xl animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto pb-20">
      <header className="mb-10 mt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider mb-4">
          <History className="w-3.5 h-3.5" /> Historial de Análisis
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black mb-2 tracking-tight text-slate-900">Tu Historial</h1>
            <p className="text-slate-500 font-medium">
              Todos tus análisis anteriores, con resultados completos.
              {total > 0 && <span className="ml-2 text-slate-400 text-sm">({total} en total)</span>}
            </p>
          </div>
        </div>
      </header>

      {analyses.length === 0 && !loading ? (
        <Card className="p-16 flex flex-col items-center justify-center text-center border-slate-200">
          <History className="w-12 h-12 text-slate-200 mb-4" />
          <p className="text-slate-400 font-medium">Todavía no realizaste ningún análisis.</p>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {analyses.map((a) => (
              <Card key={a.id} className="border-slate-200 bg-white shadow-sm overflow-hidden">
                {/* Row header */}
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
                      {new Date(a.createdAt).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      {" · "}{a.cost} crédito{a.cost !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <span className="text-3xl font-black text-slate-900">{a.score}</span>
                      <span className="text-sm text-slate-300">/100</span>
                    </div>
                    {riskBadge(a.riskLevel)}
                    {expanded === a.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    {/* Delete button */}
                    <button
                      onClick={(e) => handleDelete(e, a.id)}
                      disabled={deleting === a.id}
                      className="p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50 flex-shrink-0"
                      title="Eliminar análisis"
                    >
                      {deleting === a.id
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : <X className="w-4 h-4" />
                      }
                    </button>
                  </div>
                </div>

                {/* Expanded panel */}
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
                          {["soft", "medium", "aggressive"].map((key) => a.alternatives[key] && (
                            <div key={key} className={`rounded-2xl p-4 text-sm leading-relaxed ${key === "soft" ? "bg-emerald-950 text-emerald-100/80" : key === "medium" ? "bg-blue-950 text-blue-100/80" : "bg-slate-900 text-slate-300 border border-indigo-500/20"}`}>
                              <p className={`text-xs font-black uppercase tracking-wider mb-2 ${key === "soft" ? "text-emerald-400" : key === "medium" ? "text-blue-400" : "text-indigo-400"}`}>
                                {key === "aggressive" ? "🔥 Agresivo" : key.charAt(0).toUpperCase() + key.slice(1)}
                              </p>
                              {a.alternatives[key]}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Embedded chat */}
                    <div className="pt-2">
                      <ChatPanel
                        analysisId={a.id}
                        initialMessages={Array.isArray(a.messages) ? a.messages : []}
                      />
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                onClick={() => fetchPage(page - 1)}
                disabled={page <= 1 || loading}
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const isNear = Math.abs(p - page) <= 2 || p === 1 || p === totalPages;
                  const isPrev = p === page - 3 || p === page + 3;
                  if (!isNear && !isPrev) return null;
                  if (isPrev) return <span key={p} className="px-1 text-slate-300">…</span>;
                  return (
                    <button
                      key={p}
                      onClick={() => fetchPage(p)}
                      disabled={loading}
                      className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${
                        p === page
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                          : "text-slate-500 hover:bg-slate-100"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => fetchPage(page + 1)}
                disabled={page >= totalPages || loading}
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
