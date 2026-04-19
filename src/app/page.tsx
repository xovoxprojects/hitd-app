"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Activity, TrendingUp, Check, X, ChevronDown, Video, FileText, BarChart, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

// i18n Configuration
const resources = {
  en: {
    translation: {
      nav_pricing: "Pricing",
      nav_login: "Log in",
      nav_get_started: "Get Started",
      hero_badge: "v2.0 Compliance Engine",
      hero_h1_1: "AI Ad Analyzer for",
      hero_h1_2: "Meta Ads & Conversions",
      hero_sub: "Analyze your ad creatives, detect Meta policy violations, and improve your conversion rate with AI in seconds.",
      btn_start: "Start Analyzing",
      hero_sub2: "No trial. No guesswork. Just better ads.",
      score_perf: "Performance Score",
      score_0_viol: "0 Violations Detected",
      score_0_viol_sub: "Your creative perfectly aligns with Meta Personal Attributes policy.",
      score_insight: "Actionable Insight",
      score_insight_sub: "Increase CTA contrast by 15% to boost CTR.",
      prob_badge: "The Problem",
      prob_h2: "Most Ads Fail Before They Even Start",
      prob_err1: "Weak hooks that don't stop scrolling",
      prob_err2: "Hidden Meta policy violations you can't see",
      prob_err3: "Generic copy that doesn't convert",
      prob_err4: "Poor structure that kills engagement",
      prob_alg_sees: "META ALGORITHM SEES THIS",
      prob_alg1: "Policy violation: restricted language detected",
      prob_alg2: "Low engagement predicted: weak hook",
      prob_alg3: "Ad rejected: misleading claim",
      prob_alg4: "Poor CTR expected: unclear CTA",
      prob_alg_foot: "You don't see these, but the algorithm does.",
      sol_badge: "The Solution",
      sol_h2: "See Exactly What's Wrong and Fix It Instantly",
      sol_sub: "hitd.ai analyzes your ads like a performance marketer and a compliance reviewer at the same time.",
      sol_1_t: "Performance Score",
      sol_1_d: "Instant 0-100 score based on real performance signals.",
      sol_2_t: "Policy Detection",
      sol_2_d: "Catch Meta violations before they flag your account.",
      sol_3_t: "Conversion Tips",
      sol_3_d: "Actionable suggestions to improve hooks, clarity, and CTR.",
      sol_4_t: "AI Copy Rewrite",
      sol_4_d: "Get a rewritten version of your copy optimized to convert.",
      feat_badge: "Features",
      feat_h2: "Everything you need to scale profitably.",
      feat_sub: "No more guesswork. Automated compliance and performance checks for absolute peace of mind.",
      feat_1_t: "Meta Ads Policy Checker",
      feat_1_s: "Avoid Rejections and Account Risks",
      feat_1_d: "Instantly detect hidden Meta Ads policy violations before they get your ads rejected or your account flagged.",
      feat_2_t: "Ad Copy Analyzer",
      feat_2_s: "Fix What's Killing Your Conversions",
      feat_2_d: "Get AI-powered suggestions and rewrites to improve your messaging hooks and clarity.",
      feat_3_t: "Ad Performance Score",
      feat_3_s: "Know If Your Ad Will Convert Before Spending",
      feat_3_d: "Get a predictive score (0-100) based on real performance signals before you spend a dollar.",
      feat_4_t: "Creative Analysis",
      feat_4_s: "Understand What Works and What Doesn't",
      feat_4_d: "Analyze images, videos, and copy to identify weak points and missed opportunities in your creatives.",
      hw_badge: "How it works",
      hw_h2: "From Upload to Better Ads in Seconds",
      hw_1_t: "Upload your ad",
      hw_1_d: "Image, video, or copy - any format works.",
      hw_2_t: "Get instant analysis",
      hw_2_d: "AI reviews compliance, copy, and performance.",
      hw_3_t: "Fix the issues",
      hw_3_d: "Apply suggestions or use the AI rewrite directly.",
      hw_4_t: "Launch with confidence",
      hw_4_d: "Run ads knowing they're built to convert.",
      cta_badge: "Stop Wasting Budget",
      cta_h2: "Stop Guessing.\nStart Launching Winning Ads.",
      cta_sub: "Every day you run ads without proper analysis, you're wasting money. Fix your ads before you spend another dollar.",
      why_badge: "Why Ads Fail",
      why_h2: "Why Are Your Ads Getting Rejected or Not Converting?",
      why_p1: "Many ads fail due to Meta Ads policy violations, weak ad copy, or poor creative structure. An ad copy analyzer and Meta ads checker can help identify these issues but most tools don't combine compliance and performance analysis.",
      why_p2: "hitd.ai uses AI to analyze your ads and show exactly what to fix to improve conversion rates and avoid rejection. No guesswork. No wasted spend.",
      price_badge: "Pricing",
      price_h2: "Simple Pricing. No Surprises.",
      faq_badge: "FAQ",
      faq_h2: "Common questions",
      faq_1_q: "What is an AI ad analyzer?",
      faq_1_a: "An AI ad analyzer reviews your ad creatives, copy, and structure to identify issues affecting performance and compliance, giving you actionable fixes instead of guesswork.",
      faq_2_q: "Why are my Facebook ads getting rejected?",
      faq_2_a: "Ads are often rejected due to Meta Ads policy violations, misleading claims, or restricted content. Our tool detects these issues instantly before you publish.",
      faq_3_q: "How can I improve my ad conversion rate?",
      faq_3_a: "Improving your ad copy, creative clarity, and targeting message can significantly increase conversions. hitd.ai helps optimize all of these in one place.",
      faq_4_q: "Can this analyze video ads?",
      faq_4_a: "Yes. You can upload images, videos, screenshots, or text copy – any format your ads come in.",
      faq_5_q: "Do I need experience in marketing?",
      faq_5_a: "No. The tool explains everything in simple terms and gives actionable recommendations anyone can follow.",
      foot_badge: "Ready?",
      foot_h2: "Your Ads Can Perform Better.\nFix Them Today.",
      foot_sub: "Stop wasting ad spend on creatives that don't convert."
    }
  },
  es: {
    translation: {
      nav_pricing: "Precios",
      nav_login: "Iniciar sesión",
      nav_get_started: "Comenzar",
      hero_badge: "Motor de Cumplimiento v2.0",
      hero_h1_1: "Analizador de Anuncios con IA para",
      hero_h1_2: "Meta Ads & Conversiones",
      hero_sub: "Analiza tus creativos, detecta infracciones de políticas de Meta y mejora tu tasa de conversión con IA en segundos.",
      btn_start: "Empezar Análisis",
      hero_sub2: "Sin pruebas. Sin adivinanzas. Mejores anuncios.",
      score_perf: "Puntaje de Rendimiento",
      score_0_viol: "0 Infracciones Detectadas",
      score_0_viol_sub: "Tu creativo cumple con la política de Atributos Personales.",
      score_insight: "Insight Práctico",
      score_insight_sub: "Aumenta el contraste del CTA un 15% para potenciar el CTR.",
      prob_badge: "El Problema",
      prob_h2: "La Mayoría de los Anuncios Fallan Antes de Empezar",
      prob_err1: "Ganchos débiles que no detienen el scroll",
      prob_err2: "Infracciones ocultas de Meta que no ves",
      prob_err3: "Copy genérico que no convierte",
      prob_err4: "Estructura pobre que destruye el engagement",
      prob_alg_sees: "EL ALGORITMO DE META VE ESTO",
      prob_alg1: "Infracción: lenguaje restringido detectado",
      prob_alg2: "Bajo engagement previsto: gancho débil",
      prob_alg3: "Anuncio rechazado: afirmación engañosa",
      prob_alg4: "Bajo CTR esperado: CTA poco claro",
      prob_alg_foot: "Tú no lo notas, pero el algoritmo sí.",
      sol_badge: "La Solución",
      sol_h2: "Mira Exactamente Qué Falla y Arréglalo al Instante",
      sol_sub: "hitd.ai analiza tus anuncios como un experto en performance y un revisor a la vez.",
      sol_1_t: "Puntaje de Rendimiento",
      sol_1_d: "Puntaje instantáneo basado en señales reales.",
      sol_2_t: "Detección de Políticas",
      sol_2_d: "Atrapa infracciones de Meta antes de los baneos.",
      sol_3_t: "Tips de Conversión",
      sol_3_d: "Sugerencias prácticas para mejorar ganchos y CTR.",
      sol_4_t: "Reescritura IA",
      sol_4_d: "Obtén una versión de tu copy optimizada para convertir.",
      feat_badge: "Características",
      feat_h2: "Todo lo que necesitas para escalar con ganancias.",
      feat_sub: "Sin más adivinanzas. Procesos automatizados para tu tranquilidad.",
      feat_1_t: "Escáner de Políticas Meta",
      feat_1_s: "Evita Rechazos y Riesgos",
      feat_1_d: "Detecta instantáneamente infracciones ocultas antes de que rechacen tu campaña.",
      feat_2_t: "Analizador de Copy",
      feat_2_s: "Arregla lo que Destruye tus Conversiones",
      feat_2_d: "Sugerencias y reescrituras para mejorar tus ganchos.",
      feat_3_t: "Puntaje de Rendimiento",
      feat_3_s: "Sabe si tu anuncio convertirá antes de invertir",
      feat_3_d: "Obtén un puntaje predictivo basado en señales de rendimiento.",
      feat_4_t: "Análisis Creativo",
      feat_4_s: "Entiende qué funciona y qué no",
      feat_4_d: "Analiza imágenes o texto para identificar puntos débiles.",
      hw_badge: "Cómo funciona",
      hw_h2: "Mejora tus Anuncios en Segundos",
      hw_1_t: "Sube tu anuncio",
      hw_1_d: "Cualquier formato funciona.",
      hw_2_t: "Análisis instantáneo",
      hw_2_d: "IA revisa el cumplimiento y copy.",
      hw_3_t: "Corrige problemas",
      hw_3_d: "Aplica las sugerencias directo.",
      hw_4_t: "Lanza sin miedo",
      hw_4_d: "Sabiendo que están hechos para convertir.",
      cta_badge: "Deja de Perder Dinero",
      cta_h2: "Deja de Adivinar.\nEmpieza a Lanzar Anuncios Ganadores.",
      cta_sub: "Cada día que corres anuncios sin análisis, estás perdiendo plata.",
      why_badge: "Por Qué Fallan",
      why_h2: "¿Por Qué Rechazan tus Anuncios?",
      why_p1: "Muchos fallan por infracciones a Meta, textos débiles o mala estructura visual. Una herramienta puede combinarlos.",
      why_p2: "hitd.ai utiliza IA para encontrar problemas y evitar desperdicios de presupuesto mensual.",
      price_badge: "Precios",
      price_h2: "Precios Simples. Sin Sorpresas.",
      faq_badge: "FAQ",
      faq_h2: "Preguntas Frecuentes",
      faq_1_q: "¿Qué es un analizador de anuncios con IA?",
      faq_1_a: "Revisa creativos y diseño estructural.",
      faq_2_q: "¿Por qué rechazan mis anuncios en Facebook?",
      faq_2_a: "Infracciones de normas que se deben seguir en las plataformas.",
      faq_3_q: "¿Cómo puedo mejorar la tasa de conversión?",
      faq_3_a: "Optimizando la claridad y copy, algo que esta herramienta automatiza.",
      faq_4_q: "¿Puede analizar videos?",
      faq_4_a: "Cualquier formato funcionará siempre que se suba la imagen base o copy general.",
      faq_5_q: "¿Necesito experiencia en marketing?",
      faq_5_a: "Con los consejos prácticos ya generados no se requiere técnica previa.",
      foot_badge: "¿Listo?",
      foot_h2: "Tus Anuncios Pueden Rendir Mejor.\nArréglalos Hoy.",
      foot_sub: "Deja de quemar inversión en contenido que no aporta resultados."
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

const LandingPricing = () => {
  return (
    <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-12">
      <div className="bg-white border border-slate-200 rounded-3xl p-10 flex flex-col hover:-translate-y-2 transition-transform duration-300 shadow-sm">
        <h3 className="text-xl font-bold mb-1 text-slate-900">Starter</h3>
        <p className="text-slate-500 text-sm mb-6 font-medium">Free testing</p>
        <ul className="space-y-4 mb-10 flex-grow border-t border-slate-100 pt-6">
          <li className="flex items-center gap-3 text-slate-700 font-medium text-sm">
            <Check className="w-5 h-5 text-blue-500 shrink-0" /> 5 analyses
          </li>
          <li className="flex items-center gap-3 text-slate-700 font-medium text-sm">
            <Check className="w-5 h-5 text-blue-500 shrink-0" /> Basic feedback
          </li>
          <li className="flex items-center gap-3 text-slate-700 font-medium text-sm">
            <Check className="w-5 h-5 text-blue-500 shrink-0" /> Policy check
          </li>
        </ul>
        <Link href="/pricing" className="w-full block text-center py-3 rounded-xl border border-slate-200 text-slate-900 font-bold transition-colors shadow-sm">
          Get Started
        </Link>
      </div>

      <div className="relative bg-white border-2 border-blue-600 rounded-3xl p-10 flex flex-col shadow-xl z-10 scale-[1.02]">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
          Recommended
        </div>
        <h3 className="text-xl font-bold mb-1 text-slate-900">Growth</h3>
        <p className="text-slate-500 text-sm mb-6 font-medium">For marketers</p>
        <ul className="space-y-4 mb-10 flex-grow border-t border-slate-100 pt-6">
          <li className="flex items-center gap-3 text-slate-900 font-medium text-sm">
            <Check className="w-5 h-5 text-blue-600 shrink-0" /> 20 analyses
          </li>
          <li className="flex items-center gap-3 text-slate-900 font-medium text-sm">
            <Check className="w-5 h-5 text-blue-600 shrink-0" /> Full analysis - copy & compliance
          </li>
          <li className="flex items-center gap-3 text-slate-900 font-medium text-sm">
            <Check className="w-5 h-5 text-blue-600 shrink-0" /> AI copy rewrite
          </li>
          <li className="flex items-center gap-3 text-slate-900 font-medium text-sm">
            <Check className="w-5 h-5 text-blue-600 shrink-0" /> Advanced suggestions
          </li>
        </ul>
        <Link href="/pricing" className="w-full block text-center py-3 rounded-xl bg-slate-900 text-white font-bold transition-colors shadow-md hover:bg-slate-800">
          Get Started
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-10 flex flex-col hover:-translate-y-2 transition-transform duration-300 shadow-sm">
        <h3 className="text-xl font-bold mb-1 text-slate-900">Pro</h3>
        <p className="text-slate-500 text-sm mb-6 font-medium">For teams</p>
        <ul className="space-y-4 mb-10 flex-grow border-t border-slate-100 pt-6">
          <li className="flex items-center gap-3 text-slate-700 font-medium text-sm">
            <Check className="w-5 h-5 text-blue-500 shrink-0" /> High-volume usage
          </li>
          <li className="flex items-center gap-3 text-slate-700 font-medium text-sm">
            <Check className="w-5 h-5 text-blue-500 shrink-0" /> Priority processing
          </li>
          <li className="flex items-center gap-3 text-slate-700 font-medium text-sm">
            <Check className="w-5 h-5 text-blue-500 shrink-0" /> Deep analysis
          </li>
          <li className="flex items-center gap-3 text-slate-700 font-medium text-sm">
            <Check className="w-5 h-5 text-blue-500 shrink-0" /> Team access
          </li>
        </ul>
        <Link href="/pricing" className="w-full block text-center py-3 rounded-xl border border-slate-200 text-slate-900 font-bold transition-colors shadow-sm">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: t('faq_1_q'), a: t('faq_1_a') },
    { q: t('faq_2_q'), a: t('faq_2_a') },
    { q: t('faq_3_q'), a: t('faq_3_a') },
    { q: t('faq_4_q'), a: t('faq_4_a') },
    { q: t('faq_5_q'), a: t('faq_5_a') }
  ];

  return (
    <div className="bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 min-h-screen">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-4 w-full sticky top-0 z-50 bg-slate-50/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="hitd.ai Logo" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
          <span className="text-xl font-black tracking-tight text-slate-900 ml-1">hitd.ai</span>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={toggleLang} className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest cursor-pointer">
            <Globe className="w-4 h-4" /> {i18n.language}
          </button>
          <Link href="/pricing" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors hidden md:block">{t('nav_pricing')}</Link>
          <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">{t('nav_login')}</Link>
          <Link href="/dashboard" className="px-6 py-2.5 text-sm font-bold text-white rounded-full bg-[#1b1f2e] hover:bg-slate-900 transition-colors shadow-sm">
            {t('nav_get_started')}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 bg-white border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">{t('hero_badge')}</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-[2.75rem] md:text-6xl font-[800] tracking-tight text-slate-900 mb-6 leading-[1.1]"
        >
          {t('hero_h1_1')}<br />
          <span className="text-[#3b82f6]">{t('hero_h1_2')}</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto mb-10 font-medium"
        >
          {t('hero_sub')}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Link href="/dashboard" className="inline-flex px-8 py-3.5 bg-[#1b1f2e] text-white rounded-full font-bold text-sm items-center gap-2 shadow-sm transition-transform hover:scale-105">
             {t('btn_start')} <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
          <p className="text-[11px] text-slate-400 mt-4 font-semibold">{t('hero_sub2')}</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-16 w-full max-w-3xl"
        >
          <div className="bg-white rounded-[20px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] py-8 px-10 relative border border-slate-100 flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="absolute top-4 left-4 flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
            </div>
            <div className="absolute top-3 w-full flex justify-center pointer-events-none">
               <div className="px-4 py-1 border border-slate-100 rounded-md text-[9px] text-slate-300 font-mono tracking-wider">
                  hitd.ai/dashboard/analyze
               </div>
            </div>
            
            <div className="mt-8 flex flex-col md:flex-row gap-6 w-full hidden md:flex">
              <div className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-2xl w-1/3 shadow-sm">
                <div className="relative w-24 h-24 flex items-center justify-center mb-2">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" className="stroke-slate-100" strokeWidth="8" />
                    <circle cx="50" cy="50" r="45" fill="none" className="stroke-[#3b82f6]" strokeWidth="8" strokeLinecap="round" strokeDasharray="283" strokeDashoffset="22.6" />
                  </svg>
                  <span className="text-3xl font-[800] text-blue-700">92</span>
                </div>
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center mt-2">{t('score_perf')}</div>
              </div>
              <div className="flex flex-col gap-3 flex-1 w-full relative h-[180px]">
                <div className="flex items-start gap-4 p-4 bg-white border border-emerald-100 shadow-sm rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="text-[13px] font-[800] text-slate-800">{t('score_0_viol')}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{t('score_0_viol_sub')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 shadow-sm rounded-xl">
                  <Activity className="w-5 h-5 text-blue-500 shrink-0" />
                  <div>
                    <h4 className="text-[13px] font-[800] text-slate-800">{t('score_insight')}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{t('score_insight_sub')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="bg-white py-24 px-6 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3">{t('prob_badge')}</h4>
            <h2 className="text-[2rem] md:text-4xl font-[800] text-[#0f172a] tracking-tight">{t('prob_h2')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div className="space-y-4">
              {[t('prob_err1'), t('prob_err2'), t('prob_err3'), t('prob_err4')].map((text, i) => (
                <div key={i} className="flex items-center gap-4 py-3.5 px-6 bg-[#fffbfb] border border-[#ffebeb] rounded-lg">
                  <X className="w-4 h-4 text-[#ef4444] shrink-0" />
                  <span className="text-[13px] font-medium text-slate-700">{text}</span>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
               <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{t('prob_alg_sees')}</h5>
               <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-[#fffbfb] border border-[#ffebeb] rounded-lg">
                    <ShieldCheck className="w-4 h-4 text-[#ef4444] shrink-0" />
                    <span className="text-xs font-semibold text-[#b91c1c]">{t('prob_alg1')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#fffbf0] border border-[#ffebb8] rounded-lg">
                    <Activity className="w-4 h-4 text-[#eab308] shrink-0" />
                    <span className="text-xs font-semibold text-[#a16207]">{t('prob_alg2')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#fffbf0] border border-[#ffebb8] rounded-lg">
                    <Activity className="w-4 h-4 text-[#eab308] shrink-0" />
                    <span className="text-xs font-semibold text-[#a16207]">{t('prob_alg3')}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#fffbf0] border border-[#ffebb8] rounded-lg">
                    <Activity className="w-4 h-4 text-[#eab308] shrink-0" />
                    <span className="text-xs font-semibold text-[#a16207]">{t('prob_alg4')}</span>
                  </div>
               </div>
               <p className="text-[10px] text-slate-400 mt-6 italic">{t('prob_alg_foot')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-slate-50 py-24 px-6 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3">{t('sol_badge')}</h4>
            <h2 className="text-[2rem] md:text-4xl font-[800] text-slate-900 mb-4 tracking-tight">{t('sol_h2')}</h2>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl font-medium leading-relaxed">{t('sol_sub')}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: "01", title: t('sol_1_t'), desc: t('sol_1_d') },
              { num: "02", title: t('sol_2_t'), desc: t('sol_2_d') },
              { num: "03", title: t('sol_3_t'), desc: t('sol_3_d') },
              { num: "04", title: t('sol_4_t'), desc: t('sol_4_d') }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
              >
                <div className="text-[2rem] font-[800] text-[#dbeafe] mb-4 tracking-tighter leading-none">{item.num}</div>
                <h3 className="text-[14px] font-[800] text-slate-900 mb-2">{item.title}</h3>
                <p className="text-[12px] text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Detail */}
      <section className="bg-white py-24 px-6 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3">{t('feat_badge')}</h4>
            <h2 className="text-[2rem] md:text-4xl font-[800] text-slate-900 mb-4 tracking-tight leading-tight max-w-xl mx-auto">{t('feat_h2')}</h2>
            <p className="text-slate-500 font-medium text-sm max-w-md mx-auto">{t('feat_sub')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-8 border border-slate-100 shadow-sm bg-white rounded-3xl">
               <ShieldCheck className="w-8 h-8 text-[#3b82f6] mb-4" />
               <h3 className="text-[1.15rem] font-[800] text-slate-900 mb-1">{t('feat_1_t')}</h3>
               <p className="text-[12px] font-bold text-slate-400 mb-4 tracking-tight">{t('feat_1_s')}</p>
               <p className="text-slate-500 text-[13px] font-medium leading-relaxed">{t('feat_1_d')}</p>
            </div>
            <div className="p-8 border border-slate-100 shadow-sm bg-white rounded-3xl">
               <FileText className="w-8 h-8 text-[#f59e0b] mb-4" />
               <h3 className="text-[1.15rem] font-[800] text-slate-900 mb-1">{t('feat_2_t')}</h3>
               <p className="text-[12px] font-bold text-slate-400 mb-4 tracking-tight">{t('feat_2_s')}</p>
               <p className="text-slate-500 text-[13px] font-medium leading-relaxed">{t('feat_2_d')}</p>
            </div>
            <div className="p-8 border border-slate-100 shadow-sm bg-white rounded-3xl">
               <BarChart className="w-8 h-8 text-[#8b5cf6] mb-4" />
               <h3 className="text-[1.15rem] font-[800] text-slate-900 mb-1">{t('feat_3_t')}</h3>
               <p className="text-[12px] font-bold text-slate-400 mb-4 tracking-tight">{t('feat_3_s')}</p>
               <p className="text-slate-500 text-[13px] font-medium leading-relaxed">{t('feat_3_d')}</p>
            </div>
            <div className="p-8 border border-slate-100 shadow-sm bg-white rounded-3xl">
               <Video className="w-8 h-8 text-[#f43f5e] mb-4" />
               <h3 className="text-[1.15rem] font-[800] text-slate-900 mb-1">{t('feat_4_t')}</h3>
               <p className="text-[12px] font-bold text-slate-400 mb-4 tracking-tight">{t('feat_4_s')}</p>
               <p className="text-slate-500 text-[13px] font-medium leading-relaxed">{t('feat_4_d')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="bg-slate-50 py-24 px-6 border-t border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3">{t('hw_badge')}</h4>
          <h2 className="text-[2rem] md:text-4xl font-[800] text-slate-900 mb-20 tracking-tight">{t('hw_h2')}</h2>
          
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-4 px-4">
            <div className="hidden md:block absolute top-[18px] left-[10%] w-[80%] h-[1px] bg-slate-200 z-0"></div>
            
            {[
              { title: t('hw_1_t'), desc: t('hw_1_d') },
              { title: t('hw_2_t'), desc: t('hw_2_d') },
              { title: t('hw_3_t'), desc: t('hw_3_d') },
              { title: t('hw_4_t'), desc: t('hw_4_d') }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative z-10 flex flex-col items-center flex-1 mx-auto max-w-[200px]"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-[800] flex items-center justify-center text-sm mb-5 shadow-sm">
                  {i + 1}
                </div>
                <h3 className="text-[13px] font-[800] text-slate-900 mb-1">{step.title}</h3>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stop Guessing CTA */}
      <section className="bg-white py-32 px-6 border-t border-slate-100 text-center">
        <div className="max-w-2xl mx-auto">
          <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3">{t('cta_badge')}</h4>
          <h2 className="text-[2rem] md:text-5xl font-[800] text-slate-900 mb-6 tracking-tight leading-tight whitespace-pre-line">{t('cta_h2')}</h2>
          <p className="text-[14px] text-slate-500 font-medium mb-10 leading-relaxed px-4">{t('cta_sub')}</p>
          <Link href="/dashboard" className="inline-flex px-8 py-3.5 bg-[#1b1f2e] text-white rounded-full font-bold text-sm items-center gap-2 hover:bg-slate-900 transition-colors shadow-md">
            {t('btn_start')} <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>
      </section>

      {/* Why Ads Fail Content */}
      <section className="bg-slate-50 py-24 px-6 border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center md:text-left">
          <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3">{t('why_badge')}</h4>
          <h2 className="text-[2rem] md:text-4xl font-[800] text-slate-900 mb-8 tracking-tight">{t('why_h2')}</h2>
          <div className="space-y-4 text-slate-500 text-[14px] font-medium leading-relaxed max-w-2xl">
            <p>{t('why_p1')}</p>
            <p>{t('why_p2')}</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white py-24 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3">{t('price_badge')}</h4>
            <h2 className="text-[2rem] md:text-4xl font-[800] text-slate-900 tracking-tight">{t('price_h2')}</h2>
          </div>
          <LandingPricing />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-24 px-6 border-t border-slate-100">
         <div className="max-w-3xl mx-auto">
          <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3 text-center">{t('faq_badge')}</h4>
          <h2 className="text-[2rem] md:text-4xl font-[800] text-slate-900 mb-12 text-center tracking-tight">{t('faq_h2')}</h2>
          
          <div className="space-y-3">
             {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                   <button 
                     onClick={() => toggleFaq(index)}
                     className="w-full text-left px-6 py-5 font-[800] text-[14px] text-slate-900 flex justify-between items-center hover:bg-slate-50 transition-colors"
                   >
                      {faq.q}
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                   </button>
                   <AnimatePresence>
                      {openFaq === index && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           transition={{ duration: 0.2 }}
                           className="overflow-hidden bg-white"
                         >
                            <div className="px-6 pb-5 pt-0 text-[13px] text-slate-500 font-medium leading-relaxed">
                               {faq.a}
                            </div>
                         </motion.div>
                      )}
                   </AnimatePresence>
                </div>
             ))}
          </div>
         </div>
      </section>

      {/* Final Footer CTA */}
      <section className="bg-white py-24 px-6 text-center pb-32">
        <h4 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4">{t('foot_badge')}</h4>
        <h2 className="text-[2.25rem] md:text-5xl font-[800] text-slate-900 mb-6 tracking-tight leading-tight whitespace-pre-line">{t('foot_h2')}</h2>
        <p className="text-[14px] text-slate-500 mb-10 font-medium">{t('foot_sub')}</p>
        <Link href="/dashboard" className="inline-flex px-8 py-3.5 bg-[#1b1f2e] text-white rounded-full font-bold text-sm items-center gap-2 hover:bg-slate-900 transition-colors shadow-md">
          {t('btn_start')} <ArrowRight className="w-4 h-4 text-slate-400" />
        </Link>
      </section>
      
    </div>
  );
}
