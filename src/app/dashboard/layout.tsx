"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, CreditCard, Settings, LogOut, ChevronRight, History, BarChart3, GraduationCap, Briefcase, Lock, Menu, X } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  // Claim referral cookie silently after sign-in
  useEffect(() => {
    if (session?.user?.id) {
      fetch("/api/ref/claim", { method: "POST" }).catch(() => {});
    }
  }, [session?.user?.id]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col md:flex-row font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link href="/">
            <img src="/logo.png" alt="hitd.ai logo" className="w-8 h-8 object-contain rounded-xl" />
          </Link>
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">hitd.ai</Link>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2 text-slate-600 hover:text-slate-900">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        w-[280px] border-r border-slate-200/60 flex flex-col fixed inset-y-0 left-0 bg-white/95 backdrop-blur-xl z-50
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-8 flex items-center gap-3">
          <Link href="/">
            <img src="/logo.png" alt="hitd.ai logo" className="w-8 h-8 object-contain rounded-xl" />
          </Link>
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">hitd.ai</Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <Link 
            href="/dashboard" 
            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${pathname === '/dashboard' ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <div className="flex items-center gap-3 font-semibold">
              <LayoutDashboard className="w-5 h-5" /> Herramienta IA
            </div>
            {pathname !== '/dashboard' && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
          </Link>
          <Link 
            href="/dashboard/courses" 
            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${pathname === '/dashboard/courses' ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <div className="flex items-center gap-3 font-semibold">
              <GraduationCap className="w-5 h-5" /> Academia
              <span className="ml-auto flex items-center bg-slate-200/60 text-slate-500 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                <Lock className="w-3 h-3 mr-1" /> Bloqueado
              </span>
            </div>
            {pathname !== '/dashboard/courses' && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
          </Link>
          <Link 
            href="/dashboard/billing" 
            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${pathname === '/dashboard/billing' ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <div className="flex items-center gap-3 font-semibold">
              <CreditCard className="w-5 h-5" /> Facturación
            </div>
            {pathname !== '/dashboard/billing' && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
          </Link>
          <Link 
            href="/dashboard/history" 
            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${pathname === '/dashboard/history' ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <div className="flex items-center gap-3 font-semibold">
              <History className="w-5 h-5" /> Historial
            </div>
            {pathname !== '/dashboard/history' && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
          </Link>
          
          {(session?.user?.role === 'broker' || session?.user?.email === 'hello@hitd.ai') && (
            <Link 
              href="/dashboard/broker" 
              className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 border ${pathname === '/dashboard/broker' ? 'bg-emerald-700 text-white shadow-md border-emerald-800' : 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100'}`}
            >
              <div className="flex items-center gap-3 font-semibold">
                <Briefcase className="w-5 h-5" /> Mi Panel Broker
              </div>
              {pathname !== '/dashboard/broker' && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
            </Link>
          )}

          {session?.user?.email === 'hello@hitd.ai' && (
            <Link 
              href="/dashboard/admin" 
              className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 border ${pathname === '/dashboard/admin' ? 'bg-slate-900 text-white shadow-md border-slate-800' : 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100 hover:text-rose-700'}`}
            >
              <div className="flex items-center gap-3 font-semibold">
                Admin Panel
              </div>
              {pathname !== '/dashboard/admin' && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
            </Link>
          )}
          <Link 
            href="/dashboard/analytics" 
            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${pathname === '/dashboard/analytics' ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <div className="flex items-center gap-3 font-semibold">
              <BarChart3 className="w-5 h-5" /> Analíticas
            </div>
            {pathname !== '/dashboard/analytics' && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
          </Link>
          <Link 
            href="/dashboard/settings" 
            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${pathname === '/dashboard/settings' ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <div className="flex items-center gap-3 font-semibold">
              <Settings className="w-5 h-5" /> Configuración
            </div>
            {pathname !== '/dashboard/settings' && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
          </Link>
        </nav>

        <div className="p-6 border-t border-slate-200/60">
          <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 rounded-2xl p-5 mb-6 shadow-sm relative overflow-hidden">
            {/* Subtle decorative orb */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="text-xs text-slate-500 mb-1 font-bold uppercase tracking-wider">Créditos Disponibles</div>
            <div className="flex items-end justify-between relative z-10">
              <span className="text-3xl font-black text-slate-900 tracking-tight">{session?.user?.credits || 0}</span>
              <Link href="/#pricing" className="text-xs text-blue-600 hover:text-blue-800 font-bold transition-colors">Ver planes &rarr;</Link>
            </div>
            {session?.user?.plan === "none" && (
              <Link href="/#pricing" className="mt-4 w-full block text-center py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-md hover:shadow-lg">
                Mejorar Plan
              </Link>
            )}
          </div>
          
          <button onClick={() => signOut()} className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm font-semibold text-slate-500 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors group">
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content Area */}
      <main className="flex-1 md:ml-[280px] p-4 md:p-10 relative w-full overflow-x-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          {children}
        </div>
        {/* Dashboard Ambient Background */}
        <div className="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/20 rounded-full blur-[150px] pointer-events-none -z-10" />
      </main>
    </div>
  );
}
