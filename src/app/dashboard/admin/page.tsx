"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, DollarSign, TrendingUp, ShieldAlert, Briefcase, UserCheck, UserX, Loader2 } from "lucide-react";

const ADMIN_EMAIL = "hello@hitd.ai";

interface UserRow {
  id: string;
  name: string | null;
  email: string | null;
  plan: string;
  role: string;
  brokerCode: string | null;
  referredById: string | null;
  credits: number;
}

const planPrices: Record<string, number> = { growth: 9.99, pro: 49.99, elite: 499 };
const planLabels: Record<string, string> = { none: "Gratuito", growth: "Growth", pro: "Pro", elite: "Elite" };
const planColors: Record<string, string> = {
  none: "bg-slate-100 text-slate-500",
  growth: "bg-blue-100 text-blue-700",
  pro: "bg-indigo-100 text-indigo-700",
  elite: "bg-purple-100 text-purple-700",
};

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [brokerCodeInput, setBrokerCodeInput] = useState<Record<string, string>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [grantState, setGrantState] = useState<Record<string, { planName: string; credits: number }>>({});
  const [showGrantForm, setShowGrantForm] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email !== ADMIN_EMAIL) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user?.email !== ADMIN_EMAIL) return;
    fetch("/api/admin/users?adminKey=1")
      .then(r => r.json())
      .then(data => { setUsers(data.users ?? []); setLoading(false); });
  }, [session?.user?.email]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const promoteToBroker = async (userId: string) => {
    const code = brokerCodeInput[userId];
    if (!code) { showToast("Ingresa un código para el broker"); return; }
    setActionLoading(userId);
    const res = await fetch("/api/admin/brokers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, brokerCode: code }),
    });
    const data = await res.json();
    if (res.ok) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: "broker", brokerCode: data.user.brokerCode } : u));
      showToast(`✅ ${data.user.email} es ahora un Broker con código ${data.user.brokerCode}`);
    } else {
      showToast(`❌ ${data.error}`);
    }
    setActionLoading(null);
  };

  const removeBroker = async (userId: string) => {
    setActionLoading(userId);
    const res = await fetch("/api/admin/brokers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    if (res.ok) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: "user", brokerCode: null } : u));
      showToast("Broker degradado a usuario normal");
    }
    setActionLoading(null);
  };

  const grantPlan = async (userId: string) => {
    const state = grantState[userId];
    if (!state || !state.planName || state.credits === undefined) {
      showToast("Selecciona plan y créditos");
      return;
    }
    setActionLoading(userId + "-grant");
    const res = await fetch("/api/admin/grant-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, planName: state.planName, credits: Number(state.credits) }),
    });
    const data = await res.json();
    if (res.ok) {
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, plan: data.user.plan, credits: data.user.credits } : u));
      showToast(`✅ Plan ${data.user.plan} con ${data.user.credits} créditos asignado`);
      setShowGrantForm(null);
    } else {
      showToast(`❌ ${data.error}`);
    }
    setActionLoading(null);
  };

  if (status === "loading" || loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
  }

  const totalUsers = users.length;
  const payingUsers = users.filter(u => planPrices[u.plan] > 0).length;
  let mrr = 0;
  let growthCount = 0, proCount = 0, eliteCount = 0;
  users.forEach(u => {
    if (u.plan === "growth") { mrr += 9.99; growthCount++; }
    else if (u.plan === "pro") { mrr += 49.99; proCount++; }
    else if (u.plan === "elite") { mrr += 499; eliteCount++; }
  });
  const brokerMrr = users.reduce((acc, u) => u.role === "broker" ? acc + (planPrices[u.plan] ?? 0) * 0.15 : acc, 0);
  const axelShare = (mrr - brokerMrr) * 0.20;
  const xovoxShare = mrr - brokerMrr - axelShare;

  return (
    <div className="max-w-6xl mx-auto py-8 relative">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in">
          {toastMsg}
        </div>
      )}

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Panel de Administración</h1>
          <p className="text-sm font-medium text-slate-500">Métricas y gestión de usuarios.</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3"><div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Users className="w-5 h-5" /></div><span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Usuarios Totales</span></div>
          <p className="text-4xl font-black text-slate-900">{totalUsers}</p>
          <p className="text-xs text-slate-400 mt-1">{payingUsers} con plan activo</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3"><div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><TrendingUp className="w-5 h-5" /></div><span className="text-xs font-bold text-slate-500 uppercase tracking-wider">MRR Total</span></div>
          <p className="text-4xl font-black text-emerald-600">${mrr.toFixed(2)}</p>
          <p className="text-xs text-slate-400 mt-1">Suscripciones activas</p>
        </div>
        <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3"><div className="p-2 bg-slate-800 text-slate-300 rounded-lg"><Briefcase className="w-5 h-5" /></div><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Xovox (65%)</span></div>
          <p className="text-4xl font-black text-white">${xovoxShare.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl p-6 shadow-lg shadow-indigo-500/20">
          <div className="flex items-center gap-3 mb-3"><div className="p-2 bg-white/20 text-white rounded-lg"><DollarSign className="w-5 h-5" /></div><span className="text-xs font-bold text-indigo-100 uppercase tracking-wider">Tu Parte (20%)</span></div>
          <p className="text-4xl font-black text-white">${axelShare.toFixed(2)}</p>
        </div>
      </div>

      {/* Plan Breakdown */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-8">
        <h3 className="font-bold text-slate-900 mb-4">Desglose de Planes</h3>
        <div className="grid grid-cols-3 gap-4">
          {[{label: "Growth ($9.99)", count: growthCount, color: "blue"}, {label: "Pro ($49.99)", count: proCount, color: "indigo"}, {label: "Elite ($499)", count: eliteCount, color: "purple"}].map(p => (
            <div key={p.label} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-700 text-sm">{p.label}</span>
              <span className="font-black text-slate-900">{p.count} <span className="text-slate-400 text-xs font-medium">usuarios</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">Gestión de Usuarios y Brokers</h3>
          <p className="text-xs text-slate-400 mt-0.5">Asigna un código a un usuario para convertirlo en Broker.</p>
        </div>
        <div className="divide-y divide-slate-100">
          {users.map((user) => (
            <div key={user.id} className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-2 h-2 rounded-full shrink-0 ${user.role === "broker" ? "bg-emerald-500" : "bg-slate-300"}`} />
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{user.name ?? "Sin nombre"}</p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${planColors[user.plan ?? "none"]}`}>{planLabels[user.plan ?? "none"] ?? user.plan} ({user.credits} cr)</span>
                  
                  <button
                    onClick={() => setShowGrantForm(showGrantForm === user.id ? null : user.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    Regalar Plan
                  </button>

                  {user.role === "broker" ? (
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">Broker: {user.brokerCode}</span>
                      <button
                        onClick={() => removeBroker(user.id)}
                        disabled={actionLoading === user.id}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        {actionLoading === user.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <UserX className="w-3 h-3" />} Quitar
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Código (ej: ROBERTO15)"
                        value={brokerCodeInput[user.id] ?? ""}
                        onChange={e => setBrokerCodeInput(prev => ({ ...prev, [user.id]: e.target.value }))}
                        className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg w-36 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => promoteToBroker(user.id)}
                        disabled={actionLoading === user.id}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors disabled:opacity-50"
                      >
                        {actionLoading === user.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <UserCheck className="w-3 h-3" />} Hacer Broker
                      </button>
                    </div>
                  )}
                </div>

                {showGrantForm === user.id && (
                  <div className="flex items-center gap-2 mt-2 bg-slate-50 p-2 rounded-xl border border-slate-200 w-full justify-end animate-fade-in">
                    <select
                      className="px-2 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      value={grantState[user.id]?.planName ?? "none"}
                      onChange={e => {
                        const planName = e.target.value;
                        let defaultCredits = 0;
                        if (planName === "growth") defaultCredits = 120; // 6 months of 20
                        if (planName === "pro") defaultCredits = 300; // 6 months of 50
                        if (planName === "elite") defaultCredits = 9999;
                        setGrantState(prev => ({ ...prev, [user.id]: { planName, credits: defaultCredits } }));
                      }}
                    >
                      <option value="none">Ninguno</option>
                      <option value="growth">Growth (120 cr)</option>
                      <option value="pro">Pro (300 cr)</option>
                      <option value="elite">Elite (9999 cr)</option>
                    </select>
                    
                    <input
                      type="number"
                      placeholder="Créditos"
                      className="px-2 py-1.5 text-xs border border-slate-200 rounded-lg w-20 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      value={grantState[user.id]?.credits ?? 0}
                      onChange={e => setGrantState(prev => ({ ...prev, [user.id]: { ...prev[user.id], credits: parseInt(e.target.value) || 0 } }))}
                    />
                    
                    <button
                      onClick={() => grantPlan(user.id)}
                      disabled={actionLoading === user.id + "-grant"}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {actionLoading === user.id + "-grant" ? <Loader2 className="w-3 h-3 animate-spin" /> : "Guardar"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
