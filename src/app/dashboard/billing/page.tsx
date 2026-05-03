"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Sparkles, CreditCard, Zap, CheckCircle2 } from "lucide-react";

export default function BillingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loadingPack, setLoadingPack] = useState<string | null>(null);

  const handleCheckout = async (packId: string) => {
    setLoadingPack(packId);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName: packId }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Error al procesar el pago.");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error.");
    } finally {
      setLoadingPack(null);
    }
  };

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

  const userPlan = session.user.plan || "none";
  const userCredits = session.user.credits || 0;

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto pb-20">
      <header className="mb-12 mt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
           <CreditCard className="w-3.5 h-3.5" /> Facturación y Uso
        </div>
        <h1 className="text-4xl font-black mb-3 tracking-tight text-slate-900">Gestión de Suscripción</h1>
        <p className="text-lg text-slate-500 font-medium">Administrá tu membresía, límites de uso e historial de facturación.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Current Balance Card */}
        <Card className="p-8 border-slate-200 bg-white shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mb-1">Créditos Disponibles</p>
          <h3 className="text-5xl font-black text-slate-900 mb-6">{userCredits}</h3>
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-200"
            onClick={() => router.push('/#pricing')}
          >
            Recargar Créditos
          </Button>
        </Card>

        {/* Current Plan Card */}
        <Card className="md:col-span-2 p-8 border-slate-200 bg-white shadow-sm relative overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mb-1">Tu Membresía</p>
                <h3 className="text-3xl font-black text-slate-900 capitalize italic">{userPlan === 'none' ? 'Plan Gratuito' : userPlan}</h3>
              </div>
              <div className="px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Cuenta Activa
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Zap className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Estado</p>
                  <p className="text-sm font-black text-slate-700">Al día</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">Auto-Renovación</p>
                  <p className="text-sm font-black text-slate-700">Desactivada</p>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
              <Button 
                variant="outline" 
                className="w-full rounded-xl h-12 font-bold border-slate-200 hover:bg-slate-50"
                onClick={() => router.push('/#pricing')}
              >
                Cambiar Plan
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Packs de Créditos Adicionales */}
      <h2 className="text-2xl font-black text-slate-900 mb-6 mt-12 flex items-center gap-2">
        <Zap className="w-6 h-6 text-indigo-500" />
        Packs de Créditos Adicionales
      </h2>
      <Card className="border-slate-200 bg-white shadow-sm overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="py-4 px-6 font-bold text-slate-500 uppercase text-xs tracking-wider">Pack</th>
                <th className="py-4 px-6 font-bold text-slate-500 uppercase text-xs tracking-wider">Créditos</th>
                <th className="py-4 px-6 font-bold text-slate-500 uppercase text-xs tracking-wider">Precio</th>
                <th className="py-4 px-6 font-bold text-slate-500 uppercase text-xs tracking-wider text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: "pack_100", name: "Pack 100", credits: "100", price: "$59.99" },
                { id: "pack_300", name: "Pack 300", credits: "300", price: "$149.99" },
                { id: "pack_500", name: "Pack 500", credits: "500", price: "$229.99" },
              ].map((pack) => (
                <tr key={pack.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-6 font-black text-slate-900">{pack.name}</td>
                  <td className="py-5 px-6 font-medium text-slate-600">{pack.credits} créditos</td>
                  <td className="py-5 px-6 font-bold text-slate-900">{pack.price}</td>
                  <td className="py-5 px-6 text-right">
                    <Button 
                      variant="outline" 
                      className="font-bold border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                      disabled={userPlan === "none" || loadingPack === pack.id}
                      onClick={() => handleCheckout(pack.id)}
                    >
                      {loadingPack === pack.id ? "Procesando..." : "Comprar"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {userPlan === "none" && (
          <div className="bg-amber-50 border-t border-amber-100 p-4 text-center">
            <p className="text-amber-700 text-sm font-medium">
              ⚠️ Necesitás tener una membresía activa (Starter, Pro o Elite) para poder comprar packs de créditos.
            </p>
          </div>
        )}
      </Card>

      <h2 className="text-2xl font-black text-slate-900 mb-6">Uso Reciente</h2>
      <Card className="border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <CreditCard className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-400 font-medium">No hay actividad de facturación reciente en esta cuenta.</p>
        </div>
      </Card>
    </div>
  );
}
