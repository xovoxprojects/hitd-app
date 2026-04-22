"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { Users, DollarSign, TrendingUp, Copy, CheckCheck, ExternalLink } from "lucide-react";

interface BrokerStats {
  totalReferrals: number;
  payingClients: number;
  totalRevenue: number;
  brokerCommission: number;
  referrals: { id: string; name: string | null; email: string | null; plan: string }[];
}

const planLabels: Record<string, string> = {
  none: "Gratuito",
  growth: "Growth ($9.99)",
  pro: "Pro ($49.99)",
  elite: "Elite ($499)",
};

const planColors: Record<string, string> = {
  none: "bg-slate-100 text-slate-500",
  growth: "bg-blue-100 text-blue-700",
  pro: "bg-indigo-100 text-indigo-700",
  elite: "bg-purple-100 text-purple-700",
};

export default function BrokerDashboard() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<BrokerStats | null>(null);
  const [copied, setCopied] = useState(false);

  const isBroker = session?.user?.role === "broker" || session?.user?.role === "admin";

  useEffect(() => {
    if (status === "authenticated" && !isBroker) {
      redirect("/dashboard");
    }
  }, [status, isBroker]);

  useEffect(() => {
    if (!session?.user?.id || !isBroker) return;

    fetch(`/api/broker/stats?brokerId=${session.user.id}`)
      .then(r => r.json())
      .then(setStats);
  }, [session?.user?.id, isBroker]);

  const refLink = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://hitd.ai"}/?ref=${session?.user?.brokerCode ?? ""}`;

  const copyLink = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === "loading" || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Mi Panel de Broker</h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Monitorea tus clientes referidos y tus ganancias en tiempo real.
        </p>
      </div>

      {/* Referral Link */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 mb-8">
        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Tu Link de Referido</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
            <p className="text-white font-mono text-sm truncate">{refLink}</p>
          </div>
          <button
            onClick={copyLink}
            className="flex items-center gap-2 px-4 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors shrink-0"
          >
            {copied ? <CheckCheck className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? "¡Copiado!" : "Copiar"}
          </button>
          <a
            href={refLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <p className="text-slate-400 text-xs mt-3">
          Comparte este link. Cada cliente que se registre y pague quedará vinculado a ti para siempre.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Registros</span>
          </div>
          <p className="text-4xl font-black text-slate-900">{stats.totalReferrals}</p>
          <p className="text-xs text-slate-400 mt-1">{stats.payingClients} con plan activo</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Ingresos Generados</span>
          </div>
          <p className="text-4xl font-black text-slate-900">${stats.totalRevenue.toFixed(2)}</p>
          <p className="text-xs text-slate-400 mt-1">Ingresos de tus clientes activos</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl p-6 shadow-lg shadow-indigo-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-white/20 text-white rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-sm font-bold text-indigo-100 uppercase tracking-wider">Tu Comisión (15%)</span>
          </div>
          <p className="text-4xl font-black text-white">${stats.brokerCommission.toFixed(2)}</p>
          <p className="text-xs text-indigo-200 mt-1">Ganancia mensual recurrente</p>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">Tus Clientes Referidos</h3>
        </div>
        {stats.referrals.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">Todavía no tienes clientes referidos.</p>
            <p className="text-slate-400 text-sm">Comparte tu link de referido para empezar a ganar comisiones.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {stats.referrals.map((r) => (
              <div key={r.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-semibold text-slate-800">{r.name ?? "Sin nombre"}</p>
                  <p className="text-sm text-slate-400">{r.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${planColors[r.plan ?? "none"]}`}>
                  {planLabels[r.plan ?? "none"]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
