"use client";
import { Lock, Sparkles, Shield, Rocket } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="animate-in fade-in duration-700 pb-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Academia Hitd.ai</h1>
        <p className="text-lg text-slate-500 font-medium">Entrenamientos avanzados de compliance y contingencia.</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-[2.5rem] p-12 mt-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col items-center text-center">
        {/* Dynamic Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-24 h-24 bg-slate-50 border border-slate-100 shadow-sm rounded-full flex items-center justify-center mb-8 relative z-10 group">
          <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-10 scale-50 group-hover:scale-150 transition-all duration-700" />
          <Lock className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6 relative z-10">
          <Sparkles className="w-4 h-4" /> Próximamente
        </div>

        <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight relative z-10 max-w-2xl">
          Estamos construyendo la academia definitiva
        </h2>
        
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-12 relative z-10 font-medium">
          El equipo de hitd.ai está preparando entrenamientos de alto nivel sobre políticas de Meta, 
          estrategias de contingencia blindadas y tácticas de escalado seguro para ofertas de alto riesgo.
        </p>

        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl relative z-10 text-left">
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 hover:-translate-y-1 transition-transform duration-300">
            <Shield className="w-8 h-8 text-indigo-500 mb-4" />
            <h3 className="font-bold text-slate-900 mb-2">Masterclass de Políticas</h3>
            <p className="text-sm text-slate-500 font-medium">Desglosaremos las reglas no escritas de Meta y cómo sortearlas legalmente.</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 hover:-translate-y-1 transition-transform duration-300">
            <Rocket className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-bold text-slate-900 mb-2">Escalado Agresivo</h3>
            <p className="text-sm text-slate-500 font-medium">Estrategias de contingencia y estructuras de cuentas para escalar sin interrupciones.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-16 p-10 bg-slate-900 rounded-[2rem] text-center text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-3 tracking-tight">Proteje tus redes de suspensiones e inhabilitaciones permanentes.</h3>
          <p className="text-slate-400 mb-8 font-medium">¿Dudas?</p>
          <a href="https://wa.me/15558561197" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-white/10">
            <svg className="w-6 h-6 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Escríbenos a +1 (555) 856-1197
          </a>
        </div>
      </div>
    </div>
  );
}
