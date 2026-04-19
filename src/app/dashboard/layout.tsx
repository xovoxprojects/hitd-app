"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CreditCard, Settings, LogOut, Zap, ChevronRight, History, BarChart3 } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans selection:bg-blue-200 selection:text-blue-900">
      
      {/* Sidebar background styling */}
      <aside className="w-[280px] border-r border-slate-200/60 flex flex-col fixed inset-y-0 bg-white/80 backdrop-blur-xl z-20">
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">hitd.ai</Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <Link 
            href="/dashboard" 
            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${pathname === '/dashboard' ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <div className="flex items-center gap-3 font-semibold">
              <LayoutDashboard className="w-5 h-5" /> Analysis Tool
            </div>
            {pathname !== '/dashboard' && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
          </Link>
          <Link 
            href="/dashboard/billing" 
            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${pathname === '/dashboard/billing' ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <div className="flex items-center gap-3 font-semibold">
              <CreditCard className="w-5 h-5" /> Billing & Usage
            </div>
            {pathname !== '/dashboard/billing' && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
          </Link>
          <Link 
            href="/dashboard/history" 
            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${pathname === '/dashboard/history' ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <div className="flex items-center gap-3 font-semibold">
              <History className="w-5 h-5" /> History
            </div>
            {pathname !== '/dashboard/history' && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
          </Link>
          <Link 
            href="/dashboard/analytics" 
            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${pathname === '/dashboard/analytics' ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <div className="flex items-center gap-3 font-semibold">
              <BarChart3 className="w-5 h-5" /> Analytics
            </div>
            {pathname !== '/dashboard/analytics' && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
          </Link>
          <Link 
            href="/dashboard/settings" 
            className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${pathname === '/dashboard/settings' ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <div className="flex items-center gap-3 font-semibold">
              <Settings className="w-5 h-5" /> Settings
            </div>
            {pathname !== '/dashboard/settings' && <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
          </Link>
        </nav>

        <div className="p-6 border-t border-slate-200/60">
          <div className="bg-gradient-to-b from-slate-50 to-white border border-slate-200/80 rounded-2xl p-5 mb-6 shadow-sm relative overflow-hidden">
            {/* Subtle decorative orb */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="text-xs text-slate-500 mb-1 font-bold uppercase tracking-wider">Available Credits</div>
            <div className="flex items-end justify-between relative z-10">
              <span className="text-3xl font-black text-slate-900 tracking-tight">{session?.user?.credits || 0}</span>
              <Link href="/#pricing" className="text-xs text-blue-600 hover:text-blue-800 font-bold transition-colors">Get more &rarr;</Link>
            </div>
            {session?.user?.plan === "none" && (
              <Link href="/#pricing" className="mt-4 w-full block text-center py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-md hover:shadow-lg">
                Upgrade Plan
              </Link>
            )}
          </div>
          
          <button onClick={() => signOut()} className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm font-semibold text-slate-500 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors group">
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main content Area */}
      <main className="flex-1 ml-[280px] p-10 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          {children}
        </div>
        {/* Dashboard Ambient Background */}
        <div className="fixed top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-200/20 rounded-full blur-[150px] pointer-events-none -z-10" />
      </main>
    </div>
  );
}
