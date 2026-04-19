"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { BarChart3, FileImage, FileVideo, FileText, ShieldCheck, TrendingUp, Sparkles, Award } from "lucide-react";

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {[1,2,3,4,5,6].map(i => <div key={i} className="h-32 bg-slate-100 rounded-3xl animate-pulse" />)}
      </div>
    );
  }

  const total = analyses.length;
  const videos = analyses.filter(a => a.type === "video").length;
  const images = analyses.filter(a => a.type === "image").length;
  const texts = analyses.filter(a => a.type === "text").length;
  const avgScore = total > 0 ? Math.round(analyses.reduce((s, a) => s + a.score, 0) / total) : 0;
  const lowRisk = analyses.filter(a => a.riskLevel === "low").length;
  const medRisk = analyses.filter(a => a.riskLevel === "medium").length;
  const highRisk = analyses.filter(a => a.riskLevel === "high").length;
  const safeRate = total > 0 ? Math.round((lowRisk / total) * 100) : 0;
  const totalCredits = analyses.reduce((s, a) => s + (a.cost || 0), 0);

  // Overall performance score: blend of avg content score + safe rate
  const performanceScore = Math.round((avgScore * 0.6) + (safeRate * 0.4));

  const pct = (n: number) => total > 0 ? Math.round((n / total) * 100) : 0;

  const scoreColor = (s: number) => s >= 75 ? "text-green-500" : s >= 50 ? "text-amber-500" : "text-red-500";
  const scoreBg = (s: number) => s >= 75 ? "bg-green-500" : s >= 50 ? "bg-amber-500" : "bg-red-500";

  const performanceLabel = performanceScore >= 80 ? "Excelente 🏆" : performanceScore >= 65 ? "Muy Bueno 🎯" : performanceScore >= 50 ? "En Progreso 📈" : "Necesita Mejora ⚠️";

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto pb-20">
      <header className="mb-10 mt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
          <BarChart3 className="w-3.5 h-3.5" /> Analytics
        </div>
        <h1 className="text-4xl font-black mb-2 tracking-tight text-slate-900">Tu Performance</h1>
        <p className="text-slate-500 font-medium">Métricas de tus análisis, score general y breakdown de contenido.</p>
      </header>

      {total === 0 ? (
        <Card className="p-16 flex flex-col items-center justify-center text-center border-slate-200">
          <BarChart3 className="w-12 h-12 text-slate-200 mb-4" />
          <p className="text-slate-400 font-medium">Hacé tu primer análisis para ver tus métricas.</p>
        </Card>
      ) : (
        <>
          {/* Overall Performance Score Hero */}
          <Card className="p-8 md:p-10 mb-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-none shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-indigo-400" />
                  <span className="text-indigo-400 text-sm font-bold uppercase tracking-widest">Score General</span>
                </div>
                <h2 className="text-6xl font-black text-white mb-2">{performanceScore}<span className="text-3xl text-slate-500">/100</span></h2>
                <p className="text-xl font-bold text-slate-300">{performanceLabel}</p>
                <p className="text-slate-500 text-sm mt-2">Basado en {total} análisis · {safeRate}% sin riesgo</p>
              </div>
              {/* Radial gauge visual */}
              <div className="relative w-44 h-44 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="10" />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke={performanceScore >= 75 ? "#22c55e" : performanceScore >= 50 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 40 * performanceScore / 100} ${2 * Math.PI * 40}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Sparkles className="w-6 h-6 text-indigo-400 mb-1" />
                  <span className="text-white font-black text-2xl">{performanceScore}%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Análisis", value: total, icon: <BarChart3 className="w-5 h-5 text-slate-500" />, color: "bg-slate-50" },
              { label: "Score Promedio", value: `${avgScore}/100`, icon: <TrendingUp className="w-5 h-5 text-indigo-500" />, color: "bg-indigo-50" },
              { label: "Créditos Usados", value: totalCredits, icon: <Sparkles className="w-5 h-5 text-amber-500" />, color: "bg-amber-50" },
              { label: "Tasa Sin Riesgo", value: `${safeRate}%`, icon: <ShieldCheck className="w-5 h-5 text-green-500" />, color: "bg-green-50" },
            ].map((stat) => (
              <Card key={stat.label} className={`p-6 border-slate-100 ${stat.color} shadow-none`}>
                <div className="mb-3">{stat.icon}</div>
                <p className="text-2xl font-black text-slate-900 mb-1">{stat.value}</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Content Type */}
            <Card className="p-8 border-slate-100 bg-white shadow-sm">
              <h3 className="font-bold text-slate-900 text-lg mb-6">Tipo de Contenido</h3>
              <div className="space-y-5">
                {[
                  { label: "Videos", count: videos, pct: pct(videos), icon: <FileVideo className="w-4 h-4 text-indigo-500" />, color: "bg-indigo-500" },
                  { label: "Imágenes", count: images, pct: pct(images), icon: <FileImage className="w-4 h-4 text-blue-500" />, color: "bg-blue-500" },
                  { label: "Copy / Texto", count: texts, pct: pct(texts), icon: <FileText className="w-4 h-4 text-slate-400" />, color: "bg-slate-400" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="text-sm font-bold text-slate-700">{item.label}</span>
                      </div>
                      <span className="text-sm font-black text-slate-900">{item.count} <span className="text-slate-400 font-normal">({item.pct}%)</span></span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Risk Distribution */}
            <Card className="p-8 border-slate-100 bg-white shadow-sm">
              <h3 className="font-bold text-slate-900 text-lg mb-6">Distribución de Riesgo</h3>
              <div className="space-y-5">
                {[
                  { label: "Riesgo Bajo ✅", count: lowRisk, pct: pct(lowRisk), color: "bg-green-500" },
                  { label: "Riesgo Medio ⚠️", count: medRisk, pct: pct(medRisk), color: "bg-amber-500" },
                  { label: "Riesgo Alto 🚨", count: highRisk, pct: pct(highRisk), color: "bg-red-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-slate-700">{item.label}</span>
                      <span className="text-sm font-black text-slate-900">{item.count} <span className="text-slate-400 font-normal">({item.pct}%)</span></span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Last 10 scores timeline */}
          <Card className="p-8 border-slate-100 bg-white shadow-sm">
            <h3 className="font-bold text-slate-900 text-lg mb-6">Últimos Scores</h3>
            <div className="flex items-end gap-2 h-28">
              {analyses.slice(0, 20).reverse().map((a, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-xs text-slate-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">{a.score}</span>
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${scoreBg(a.score)}`}
                    style={{ height: `${(a.score / 100) * 88}px` }}
                    title={`Score: ${a.score}`}
                  />
                  <span className={`text-xs font-black ${scoreColor(a.score)}`}>{a.score}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 text-center mt-4 font-medium">Evolución de scores — más reciente a la derecha</p>
          </Card>
        </>
      )}
    </div>
  );
}
