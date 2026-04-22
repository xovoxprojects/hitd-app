import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Users, DollarSign, Briefcase, TrendingUp, ShieldAlert } from "lucide-react";

const ADMIN_EMAIL = "hello@hitd.ai";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.email !== ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  // Fetch all users
  const users = await prisma.user.findMany({
    select: {
      id: true,
      plan: true,
    }
  });

  const totalUsers = users.length;
  
  // Calculate active paying users
  const payingUsers = users.filter(u => u.plan === "growth" || u.plan === "pro" || u.plan === "elite").length;

  // Calculate MRR
  let mrr = 0;
  let growthCount = 0;
  let proCount = 0;
  let eliteCount = 0;

  users.forEach(user => {
    if (user.plan === "growth") {
      mrr += 9.99;
      growthCount++;
    } else if (user.plan === "pro") {
      mrr += 49.99;
      proCount++;
    } else if (user.plan === "elite") {
      mrr += 499;
      eliteCount++;
    }
  });

  const xovoxShare = mrr * 0.8;
  const axelShare = mrr * 0.2;

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Panel de Administración</h1>
          <p className="text-sm font-medium text-slate-500">Métricas exclusivas de ventas y distribución.</p>
        </div>
      </div>

      {/* Main KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Usuarios Totales</h3>
          </div>
          <p className="text-4xl font-black text-slate-900">{totalUsers}</p>
          <p className="text-sm font-medium text-slate-400 mt-1">{payingUsers} con plan activo</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Ingreso Mensual (MRR)</h3>
          </div>
          <p className="text-4xl font-black text-emerald-600">${mrr.toFixed(2)}</p>
          <p className="text-sm font-medium text-slate-400 mt-1">Suscripciones recurrentes activas</p>
        </div>
        
        {/* Split UI */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Briefcase className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-2 bg-slate-800 text-slate-300 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Xovox (80%)</h3>
          </div>
          <p className="text-4xl font-black text-white relative z-10">${xovoxShare.toFixed(2)}</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 border border-indigo-500 rounded-2xl p-6 shadow-lg shadow-indigo-500/20 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="p-2 bg-white/20 text-white rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-indigo-100 uppercase tracking-wider">Tu Parte (20%)</h3>
          </div>
          <p className="text-4xl font-black text-white relative z-10">${axelShare.toFixed(2)}</p>
          <p className="text-sm font-medium text-indigo-200 mt-1">Ganancia neta mensual</p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-2xl">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Desglose de Planes Activos</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-slate-400"></div>
              <span className="font-bold text-slate-700">Growth ($9.99)</span>
            </div>
            <span className="font-black text-slate-900">{growthCount} <span className="text-slate-400 text-sm font-medium">usuarios</span></span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="font-bold text-slate-700">Pro ($49.99)</span>
            </div>
            <span className="font-black text-slate-900">{proCount} <span className="text-slate-400 text-sm font-medium">usuarios</span></span>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
              <span className="font-bold text-slate-700">Elite ($499)</span>
            </div>
            <span className="font-black text-slate-900">{eliteCount} <span className="text-slate-400 text-sm font-medium">usuarios</span></span>
          </div>
        </div>
      </div>

    </div>
  );
}
