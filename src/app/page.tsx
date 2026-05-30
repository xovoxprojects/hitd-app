// Generated Landing Page
"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { useSession } from "next-auth/react";
import { Check, X, Menu, Globe } from "lucide-react";
import { motion } from "framer-motion";

const MetaLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
    <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"/>
  </svg>
);

const TikTokLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2859 3333" width="22" height="22">
    <path d="M2081 0c55 473 319 755 778 785v532c-266 26-499-61-770-225v995c0 1264-1378 1659-1932 753C-237 2154 296 1146 1176 1307v540c-438-66-881 306-613 779 261 462 979 292 979-281V0h539z" fill="#000000"/>
    <path d="M2081 43c55 473 319 755 778 785v532c-266 26-499-61-770-225v995c0 1264-1378 1659-1932 753C-237 2197 296 1189 1176 1350v540c-438-66-881 306-613 779 261 462 979 292 979-281V43h539z" fill="#00f2fe" style={{ mixBlendMode: 'screen' }}/>
    <path d="M2081-43c55 473 319 755 778 785v532c-266 26-499-61-770-225v995c0 1264-1378 1659-1932 753C-237 2111 296 1103 1176 1264v540c-438-66-881 306-613 779 261 462 979 292 979-281V-43h539z" fill="#fe0050" style={{ mixBlendMode: 'multiply' }}/>
  </svg>
);

const GlobalLandingCSS = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap');

    .landing-page { font-family: 'Inter', sans-serif; background: #ffffff; color: #0f172a; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
    .landing-page h1, .landing-page h2, .landing-page h3, .landing-page h4 { font-family: 'Space Grotesk', sans-serif; }
    .bg-noise { position: fixed; inset: 0; z-index: 0; pointer-events: none; background-image: linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px); background-size: 64px 64px; }
    .bg-orb { position: fixed; border-radius: 50%; filter: blur(100px); pointer-events: none; z-index: 0; will-change: transform; }
    .orb-1 { width: 800px; height: 800px; background: radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 65%); top: -300px; left: -200px; }
    .orb-2 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 65%); top: 35%; right: -200px; }
    .orb-3 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 65%); bottom: 5%; left: 10%; }
    .g-text { background: linear-gradient(135deg, #2563eb, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .g-text-amber { background: linear-gradient(135deg, #d97706, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .navbar-new { position: fixed; top: 14px; left: 14px; right: 14px; z-index: 200; background: rgba(255,255,255,0.88); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(0,0,0,0.07); border-radius: 18px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .chip-new { display: inline-flex; align-items: center; gap: 6px; background: #f8fafc; border: 1px solid #e2e8f0; color: #64748b; font-family: 'Space Grotesk', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.02em; padding: 5px 14px; border-radius: 999px; }
    .chip-dot { width: 5px; height: 5px; border-radius: 50%; background: #2563eb; flex-shrink: 0; }
    .btn-primary-new { display: inline-flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #2563eb, #4f46e5); color: white; font-family: 'Space Grotesk', sans-serif; font-weight: 700; border: none; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
    .btn-primary-new:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(37,99,235,0.32); }
    .btn-ghost-new { display: inline-flex; align-items: center; justify-content: center; background: transparent; color: #475569; font-family: 'Space Grotesk', sans-serif; font-weight: 600; border: 1px solid rgba(0,0,0,0.10); cursor: pointer; transition: all 0.2s; }
    .btn-ghost-new:hover { background: #f8fafc; color: #0f172a; }
    .hero-main-card { background: #ffffff; border: 1px solid rgba(0,0,0,0.09); border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06); will-change: transform; transform-style: preserve-3d; }
    .hero-mini-card { background: #ffffff; border: 1px solid rgba(0,0,0,0.08); border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04); will-change: transform; }
    @keyframes float-a { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
    @keyframes float-b { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-7px); } }
    .float-a { animation: float-a 5s ease-in-out infinite; }
    .float-b { animation: float-b 4.5s ease-in-out infinite; animation-delay: 0.8s; }
    .stat-strip { display: flex; gap: 0; background: #ffffff; border: 1px solid rgba(0,0,0,0.07); border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04); }
    @media (max-width: 768px) { .stat-strip { flex-direction: column; } .stat-item { border-right: none; border-bottom: 1px solid rgba(0,0,0,0.07); } }
    .stat-item { flex: 1; padding: 28px 24px; text-align: center; border-right: 1px solid rgba(0,0,0,0.07); }
    .stat-item:last-child { border-right: none; border-bottom: none; }
    .card-new { background: #ffffff; border: 1px solid rgba(0,0,0,0.07); border-radius: 20px; box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04); transition: transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.3s; }
    .card-new:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06); border-color: rgba(37,99,235,0.2); }
    .feature-card-new { background: #ffffff; border: 1px solid rgba(0,0,0,0.07); border-radius: 20px; padding: 28px; box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04); transition: box-shadow 0.2s, border-color 0.2s; transform-style: preserve-3d; will-change: transform; }
    .feature-card-new:hover { box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06); border-color: rgba(37,99,235,0.18); }
    .audience-card-new {  background: #ffffff; border: 1px solid rgba(0,0,0,0.07); border-radius: 16px; padding: 20px; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04); transition: transform 0.25s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.25s, border-color 0.25s; ; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; min-height: 140px; }
    .audience-card-new:hover { transform: translateY(-5px); box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06); border-color: rgba(37,99,235,0.18); }
    .section-dark { background: #0f172a; position: relative; overflow: hidden; }
    .dark-card-new { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); border-radius: 16px; padding: 24px; transition: background 0.3s, border-color 0.3s, transform 0.3s; }
    .dark-card-new:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.16); transform: translateY(-4px); }
    .step-num { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #2563eb, #4f46e5); display: flex; align-items: center; justify-content: center; font-family: 'Space Grotesk', sans-serif; font-weight: 800; font-size: 18px; color: white; flex-shrink: 0; box-shadow: 0 8px 24px rgba(37,99,235,0.30); }
  ` }} />
);

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay }} className={className}>{children}</motion.div>
);

const FeatureCard = ({ children, className }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(700px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-6px)`);
  };
  const handleMouseLeave = () => setTransform('');
  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`feature-card-new ${className || ''}`} style={{ transform: transform !== '' ? transform : undefined, transition: transform !== '' ? 'transform 0.08s ease, box-shadow 0.08s ease, border-color 0.08s' : 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.3s, border-color 0.3s' }}>
      {children}
    </div>
  );
};

function Hero3DMockup() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
  const [boxShadow, setBoxShadow] = useState('0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotY = dx * 14;
    const rotX = -dy * 10;
    const shadowX = -dx * 20;
    const shadowY = dy * 12 + 20;
    setTransform(`perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(12px)`);
    setBoxShadow(`${shadowX}px ${shadowY}px 60px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
    setBoxShadow('0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)');
  };

  return (
    <div className="relative h-[480px] flex items-center justify-center w-full max-w-[500px] mx-auto lg:mr-0 lg:ml-auto" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div ref={cardRef} className="hero-main-card absolute left-0 md:left-8 top-[40px] w-[340px] p-[24px] bg-white z-10" style={{ transform, boxShadow, transition: 'transform 0.08s ease, box-shadow 0.08s ease' }}>
        <div className="flex items-center justify-between mb-5">
          <div className="font-['Space_Grotesk'] font-bold text-[14px] text-[#0f172a]">Estado de tus cuentas</div>
          <span className="bg-[#f0fdf4] text-[#16a34a] text-[11px] font-bold px-2.5 py-1 rounded-full border border-green-500/20">PROTEGIDO</span>
        </div>
        <div className="bg-[#f0f9ff] border border-blue-600/10 rounded-[14px] p-4 mb-3 flex items-center gap-3.5">
          <div className="relative w-[60px] h-[60px] shrink-0">
            <svg viewBox="0 0 60 60" className="-rotate-90 w-[60px] h-[60px]">
              <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="5"/>
              <circle cx="30" cy="30" r="24" fill="none" stroke="url(#sg)" strokeWidth="5" strokeDasharray="150.8" strokeDashoffset="15" strokeLinecap="round"/>
              <defs><linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#2563eb"/><stop offset="100%" stopColor="#10b981"/></linearGradient></defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-['Space_Grotesk'] font-[800] text-[15px] text-[#2563eb]">94</div>
          </div>
          <div>
            <div className="font-bold text-[13px] mb-0.5 text-[#0f172a]">Salud de cuenta</div>
            <div className="text-[#16a34a] text-[12px] font-semibold">Excelente — Sin riesgos</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between p-2.5 bg-[#f0fdf4] border border-green-500/10 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-[22px] h-[22px] bg-[#dcfce7] rounded-md flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <span className="text-[13px] text-[#374151]">Meta Business</span>
            </div>
            <span className="text-[10px] text-[#16a34a] font-bold tracking-wide">ACTIVO</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-[#f0fdf4] border border-green-500/10 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-[22px] h-[22px] bg-[#dcfce7] rounded-md flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/></svg>
              </div>
              <span className="text-[13px] text-[#374151]">Instagram</span>
            </div>
            <span className="text-[10px] text-[#16a34a] font-bold tracking-wide">ACTIVO</span>
          </div>
          <div className="flex items-center justify-between p-2.5 bg-[#fffbeb] border border-amber-500/20 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-[22px] h-[22px] bg-[#fef3c7] rounded-md flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              </div>
              <span className="text-[13px] text-[#374151]">Cuenta de Anuncios</span>
            </div>
            <span className="text-[10px] text-[#d97706] font-bold tracking-wide">1 ALERTA</span>
          </div>
        </div>
      </div>
      <div className="hero-mini-card float-a absolute right-0 md:right-0 lg:-right-8 top-[30px] w-[210px] p-3.5 z-20">
        <div className="flex items-center gap-[7px] mb-2">
          <div className="w-[7px] h-[7px] rounded-full bg-[#f59e0b]"></div>
          <span className="text-[10px] text-[#94a3b8] font-semibold uppercase tracking-wider">Alerta</span>
        </div>
        <p className="text-[12px] text-[#92400e] font-semibold leading-relaxed mb-1.5">Tu anuncio puede violar la política de contenido.</p>
        <p className="text-[11px] text-[#94a3b8] leading-relaxed">Detectado antes de la suspensión.</p>
      </div>
      <div className="hero-mini-card float-b absolute right-[10px] md:right-[20px] bottom-[30px] w-[180px] p-[13px] z-20">
        <div className="text-[10px] text-[#94a3b8] mb-2 font-semibold uppercase tracking-wider">Última revisión</div>
        <div className="flex items-center gap-2">
          <div className="w-[30px] h-[30px] bg-[#f0fdf4] border border-green-500/20 rounded-lg flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div>
            <div className="text-[13px] font-bold text-[#16a34a]">Hace 2 min</div>
            <div className="text-[10px] text-[#94a3b8]">Sin riesgos</div>
          </div>
        </div>
      </div>
    </div>
  );
}


const resources = {
  en: {
    translation: {
      nav_pricing: "Pricing",
      nav_login: "Log in",
      nav_get_started: "Get Started",
      hero_badge: "v2.0 Compliance Engine",
      hero_h1_1: "AI Ad Analyzer for",
      hero_h1_2: "Meta & Instagram Ads",
      hero_sub: "No more rejections. No more guesswork. Analyze your creatives, fix policy issues, and scale winning ads faster.",
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
      foot_sub: "Stop wasting ad spend on creatives that don't convert.",
      plan_growth_name: "Starter",
      plan_growth_sub: "For creators, influencers and business owners who want to protect their accounts and publish with confidence.",
      plan_growth_f1: "20 credits per month",
      plan_growth_f2: "Full support (Image, Text)",
      plan_growth_f3: "Video & Screenshot analysis",
      plan_growth_f4: "AI copy rewrite",
      plan_growth_cta: "Start with Starter",
      plan_pro_name: "Pro",
      plan_pro_sub: "The complete suite for brands, agencies and media buyers ready to scale without risks.",
      plan_pro_f1: "50 credits per month",
      plan_pro_f2: "Priority processing",
      plan_pro_f3: "Advanced analysis depth",
      plan_pro_f4: "Detailed Actionable Insights",
      plan_pro_f5: "Courses & tools to fix Instagram ad issues",
      plan_pro_cta: "Start with Pro",
      plan_pro_popular: "★ Most Popular",
      plan_elite_name: "Elite",
      plan_elite_sub: "For power users managing multiple accounts, communities and high-volume campaigns.",
      plan_elite_f1: "150 credits per month",
      plan_elite_f2: "Weekly calls with Meta-Compliant Content Experts",
      plan_elite_f3: "24/7 Support",
      plan_elite_f4: "WhatsApp/Discord Community Access",
      plan_elite_f5: "Access to Courses and recorded calls",
      plan_elite_cta: "Start with Elite",
      plan_fair_use: "*Subject to fair use policy",
      plan_off: "off"
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
      foot_sub: "Deja de quemar inversión en contenido que no aporta resultados.",
      plan_growth_name: "Starter",
      plan_growth_sub: "Para creadores, influencers y dueños de negocio que quieren proteger sus cuentas y publicar con confianza.",
      plan_growth_f1: "20 créditos por mes",
      plan_growth_f2: "Soporte completo (Imagen, Texto)",
      plan_growth_f3: "Análisis de Video y Capturas",
      plan_growth_f4: "Reescritura de copy con IA",
      plan_growth_cta: "Comenzar con Starter",
      plan_pro_name: "Pro",
      plan_pro_sub: "La suite completa para marcas, agencias y media buyers que quieren escalar sin riesgos.",
      plan_pro_f1: "50 créditos por mes",
      plan_pro_f2: "Procesamiento prioritario",
      plan_pro_f3: "Análisis avanzado en profundidad",
      plan_pro_f4: "Insights detallados y accionables",
      plan_pro_f5: "Cursos y herramientas para arreglar problemas en Instagram",
      plan_pro_cta: "Comenzar con Pro",
      plan_pro_popular: "★ Más Popular",
      plan_elite_name: "Elite",
      plan_elite_sub: "Para quienes manejan múltiples cuentas, comunidades y campañas de alto volumen.",
      plan_elite_f1: "150 créditos por mes",
      plan_elite_f2: "Llamadas semanales con expertos en contenido Meta-Complaint",
      plan_elite_f3: "Soporte 24/7",
      plan_elite_f4: "Acceso a Comunidad WhatsApp/Discord",
      plan_elite_f5: "Acceso a Cursos y llamadas grabadas",
      plan_elite_cta: "Comenzar con Elite",
      plan_fair_use: "*Sujeto a política de uso justo",
      plan_off: "dto"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});

const LandingPricing = () => {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (planId: string) => {
    if (!session?.user) {
      window.location.href = "/login?callbackUrl=/#pricing";
      return;
    }
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName: planId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans: { nameKey: string; subKey: string; price: string; originalPrice: string; discount: string; featureKeys: string[]; ctaKey: string; planId: string; dark: boolean; featured: boolean; fairUse?: boolean }[] = [
    {
      nameKey: "plan_growth_name",
      subKey: "plan_growth_sub",
      price: "$9.99",
      originalPrice: "$29.99",
      discount: "-67%",
      featureKeys: ["plan_growth_f1", "plan_growth_f2", "plan_growth_f3", "plan_growth_f4"],
      ctaKey: "plan_growth_cta",
      planId: "starter",
      dark: false,
      featured: false,
    },
    {
      nameKey: "plan_elite_name",
      subKey: "plan_elite_sub",
      price: "$49.99",
      originalPrice: "$129.99",
      discount: "-62%",
      featureKeys: ["plan_elite_f1", "plan_elite_f2", "plan_elite_f3", "plan_elite_f4", "plan_elite_f5"],
      ctaKey: "plan_elite_cta",
      planId: "elite",
      dark: true,
      featured: true,
    },
    {
      nameKey: "plan_pro_name",
      subKey: "plan_pro_sub",
      price: "$19.99",
      originalPrice: "$49.99",
      discount: "-60%",
      featureKeys: ["plan_pro_f1", "plan_pro_f2", "plan_pro_f3", "plan_pro_f4", "plan_pro_f5"],
      ctaKey: "plan_pro_cta",
      planId: "pro",
      dark: false,
      featured: false,
    },
  ];

  return (
    <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-8">
      {plans.map((plan) => (
        <div
          key={plan.nameKey}
          className={`relative rounded-3xl flex flex-col h-full transition-all duration-300 ${
            plan.dark
              ? "bg-[#0f172a] text-white shadow-2xl shadow-blue-900/30 md:-translate-y-4 ring-2 ring-blue-500/30"
              : "bg-white border border-slate-200 text-slate-900 shadow-md hover:-translate-y-1 md:mt-4"
          }`}
        >
          {plan.featured && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg whitespace-nowrap">
              {t('plan_pro_popular')}
            </div>
          )}
          <div className="p-8 md:p-10 flex flex-col flex-1">
            <div className="mb-5">
              <h3 className={`text-xl font-bold mb-1 ${plan.dark ? "text-white" : "text-slate-900"}`}>{t(plan.nameKey)}</h3>
              <p className={`text-sm font-medium leading-snug ${plan.dark ? "text-slate-400" : "text-slate-500"}`}>{t(plan.subKey)}</p>
            </div>
            <div className={`pb-6 mb-6 border-b ${plan.dark ? "border-slate-800" : "border-slate-100"}`}>
              <div className="flex items-end gap-2 flex-wrap">
                <span className={`text-4xl font-black tracking-tighter leading-none ${plan.dark ? "text-white" : "text-slate-900"}`}>
                  {plan.price}
                </span>
                <div className="flex flex-col pb-0.5 gap-0.5">
                  <span className={`text-sm font-bold line-through leading-none ${plan.dark ? "text-slate-600" : "text-slate-400"}`}>
                    {plan.originalPrice}
                  </span>
                  <span className="text-[10px] font-black text-emerald-500 tracking-wider uppercase leading-none">{plan.discount} {t('plan_off')}</span>
                </div>
                <span className={`text-sm font-medium pb-0.5 ${plan.dark ? "text-slate-500" : "text-slate-400"}`}>/mo</span>
              </div>
            </div>
            <ul className="space-y-3 mb-8 flex-grow">
              {plan.featureKeys.map((fk, i) => (
                <li key={i} className={`flex items-center gap-3 text-sm font-medium ${plan.dark ? "text-slate-200" : "text-slate-700"}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.dark ? "bg-blue-500/20" : "bg-blue-50"}`}>
                    <Check className={`w-3 h-3 ${plan.dark ? "text-blue-400" : "text-blue-600"}`} />
                  </div>
                  {t(fk)}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout(plan.planId)}
              disabled={loadingPlan !== null}
              className={`w-full block text-center py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 disabled:opacity-60 ${
                plan.dark
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-[0_0_20px_rgba(79,70,229,0.35)]"
                  : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              }`}
            >
              {loadingPlan === plan.planId ? "..." : t(plan.ctaKey)}
            </button>
            {plan.fairUse && (
              <p className="text-[10px] text-slate-400 text-center mt-3 font-medium">{t('plan_fair_use')}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};



export default function Home() {
  const { t, i18n } = useTranslation();
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const orb1 = document.getElementById('orb1');
      const orb2 = document.getElementById('orb2');
      if (orb1) orb1.style.transform = `translateY(${y * 0.18}px)`;
      if (orb2) orb2.style.transform = `translateY(${-y * 0.12}px)`;
    };
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      const orb1 = document.getElementById('orb1');
      const orb2 = document.getElementById('orb2');
      if (orb1) orb1.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
      if (orb2) orb2.style.transform = `translate(${-x * 0.35}px, ${-y * 0.35}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="landing-page relative min-h-screen">
      <GlobalLandingCSS />
      <div className="bg-noise"></div>
      <div className="bg-orb orb-1" id="orb1"></div>
      <div className="bg-orb orb-2" id="orb2"></div>
      <div className="bg-orb orb-3"></div>

      {/* NAVBAR */}
      <nav className="navbar-new px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="hitd.ai Logo" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
          <span className="font-['Space_Grotesk'] font-[800] text-[20px] text-slate-900 tracking-tight">hitd.ai</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[14px] font-[500] text-[#64748b]">
          <Link href="#problem" className="hover:text-[#2563eb] transition-colors">Protección</Link>
          <Link href="#features" className="hover:text-[#2563eb] transition-colors">Herramientas</Link>
          <Link href="#pricing" className="hover:text-[#2563eb] transition-colors">Precios</Link>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en')} className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest cursor-pointer">
            <Globe className="w-4 h-4" /> {i18n.language}
          </button>
          {isLoggedIn ? (
            <Link href="/dashboard" className="btn-primary-new px-5 py-2.5 rounded-xl text-sm">Dashboard</Link>
          ) : status === 'loading' ? (
            <div className="w-24 h-9 rounded-xl bg-slate-200 animate-pulse" />
          ) : (
            <>
              <Link href="/login" className="hidden md:flex text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">{t('nav_login')}</Link>
              <Link href="/login" className="btn-primary-new px-5 py-2.5 rounded-xl text-sm">Proteger mis cuentas →</Link>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center pt-[130px] pb-[60px] px-6 relative z-10">
        <div className="max-w-[1180px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-20">
            <div>
              <Reveal><div className="chip-new mb-6"><span className="chip-dot"></span>Protección de cuentas digitales</div></Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-[clamp(30px,3.2vw,48px)] font-[700] leading-[1.12] mb-[22px] tracking-[-0.5px] text-[#0f172a]">
                  ¿Qué pasa si mañana<br/><span className="g-text">pierdes tu cuenta?</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-[#64748b] text-[18px] leading-[1.75] mb-[36px] max-w-[460px]">
                  Tu Instagram, tu Business Manager, tu cuenta de anuncios — son activos reales.
                  <strong className="text-[#0f172a] font-[600]"> hitd.ai los protege</strong> antes de que sea tarde.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex gap-3 flex-wrap">
                  <Link href="#pricing" className="btn-primary-new px-8 py-4 rounded-2xl text-[16px]">Proteger mis cuentas →</Link>
                </div>
              </Reveal>
            </div>
            <Hero3DMockup />
          </div>

          <Reveal>
            <div className="stat-strip">
              <div className="stat-item">
                <div className="font-['Space_Grotesk'] text-[38px] font-[800] bg-gradient-to-br from-[#2563eb] to-[#4f46e5] text-transparent bg-clip-text mb-1">+12K</div>
                <div className="text-[#94a3b8] text-[13px]">Cuentas protegidas</div>
              </div>
              <div className="stat-item">
                <div className="font-['Space_Grotesk'] text-[38px] font-[800] bg-gradient-to-br from-[#2563eb] to-[#4f46e5] text-transparent bg-clip-text mb-1">94%</div>
                <div className="text-[#94a3b8] text-[13px]">Problemas detectados antes</div>
              </div>
              <div className="stat-item">
                <div className="font-['Space_Grotesk'] text-[38px] font-[800] bg-gradient-to-br from-[#2563eb] to-[#4f46e5] text-transparent bg-clip-text mb-1">3×</div>
                <div className="text-[#94a3b8] text-[13px]">Más rápida la recuperación</div>
              </div>
              <div className="stat-item">
                <div className="font-['Space_Grotesk'] text-[38px] font-[800] bg-gradient-to-br from-[#2563eb] to-[#4f46e5] text-transparent bg-clip-text mb-1">+8K</div>
                <div className="text-[#94a3b8] text-[13px]">Casos analizados</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROBLEM (DARK) */}
      <section id="problem" className="section-dark py-[120px] px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse,rgba(37,99,235,0.08)_0%,transparent_65%)] pointer-events-none"></div>
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="text-center mb-[72px]">
            <Reveal><div className="chip-new bg-white/5 border-white/10 text-[#94a3b8] mb-5">La realidad que nadie quiere pensar</div></Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-[clamp(32px,4vw,52px)] font-[800] mb-5 leading-[1.1] text-[#f8fafc]">
                Perder tu cuenta no es un inconveniente.<br/><span className="g-text-amber">Es perder tu negocio.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[#94a3b8] text-[18px] max-w-[540px] mx-auto leading-[1.7]">
                Las plataformas suspenden cuentas sin aviso. Sin apelación clara. Sin plazos. Y mientras tanto, tu negocio sangra.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Reveal><div className="dark-card-new h-full"><div className="w-[42px] h-[42px] bg-white/5 rounded-xl flex items-center justify-center mb-4"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/></svg></div><h3 className="text-[16px] font-[700] mb-2 text-[#f1f5f9]">Perdés tu audiencia</h3><p className="text-[#94a3b8] text-[14px] leading-[1.7]">Años de construcción. Miles de seguidores. Todo desaparece en segundos sin posibilidad de recuperación automática.</p></div></Reveal>
            <Reveal delay={0.1}><div className="dark-card-new h-full"><div className="w-[42px] h-[42px] bg-white/5 rounded-xl flex items-center justify-center mb-4"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div><h3 className="text-[16px] font-[700] mb-2 text-[#f1f5f9]">Tu ingreso se corta</h3><p className="text-[#94a3b8] text-[14px] leading-[1.7]">Brand deals, ventas, afiliados, monetización. Todo depende de que tu cuenta esté activa. Sin cuenta, sin ingresos.</p></div></Reveal>
            <Reveal delay={0.2}><div className="dark-card-new h-full"><div className="w-[42px] h-[42px] bg-white/5 rounded-xl flex items-center justify-center mb-4"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div><h3 className="text-[16px] font-[700] mb-2 text-[#f1f5f9]">Tus campañas se pausan</h3><p className="text-[#94a3b8] text-[14px] leading-[1.7]">Una restricción en tu ad account puede pausar todas tus campañas activas. Cada día sin publicar es dinero que no vuelve.</p></div></Reveal>
            <Reveal delay={0.3}><div className="dark-card-new h-full"><div className="w-[42px] h-[42px] bg-white/5 rounded-xl flex items-center justify-center mb-4"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div><h3 className="text-[16px] font-[700] mb-2 text-[#f1f5f9]">La recuperación tarda semanas</h3><p className="text-[#94a3b8] text-[14px] leading-[1.7]">El soporte de Meta tarda. Las apelaciones se pierden. Nadie te explica qué salió mal ni qué hacer exactamente.</p></div></Reveal>
          </div>
          <Reveal delay={0.4}>
            <div className="mt-[60px] text-center p-10 bg-white/5 border border-white/10 rounded-[20px]">
              <p className="font-['Space_Grotesk'] text-[20px] font-[700] text-[#f1f5f9] mb-2">El problema no es <em>si</em> va a pasar.</p>
              <p className="text-[#94a3b8] text-[16px] max-w-[480px] mx-auto leading-[1.7]">Es que cuando pasa, ya es tarde. La protección tiene que estar <strong className="text-[#e2e8f0]">antes</strong> del problema.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-[100px] px-6 bg-white">
        <div className="max-w-[980px] mx-auto">
          <div className="text-center mb-[48px]">
            <Reveal><h2 className="text-[clamp(26px,3vw,40px)] font-[800] mb-2.5 text-[#0f172a]">Hecho para quienes viven<br/><span className="g-text">de sus cuentas digitales.</span></h2></Reveal>
            <Reveal delay={0.1}><p className="text-[#64748b] text-[17px]">Si tu negocio depende de Meta, Instagram, TikTok o YouTube — esto es para vos.</p></Reveal>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <Reveal><div className="audience-card-new"><div className="w-[44px] h-[44px] bg-[#eff6ff] border border-blue-600/15 rounded-xl flex items-center justify-center mx-auto mb-2.5"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></div><div className="text-[14px] font-[700] text-[#374151]">Influencers</div></div></Reveal>
            <Reveal delay={0.1}><div className="audience-card-new"><div className="w-[44px] h-[44px] bg-[#eef2ff] border border-indigo-600/15 rounded-xl flex items-center justify-center mx-auto mb-2.5"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2"><path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.9L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg></div><div className="text-[14px] font-[700] text-[#374151]">Creadores</div></div></Reveal>
            <Reveal delay={0.2}><div className="audience-card-new"><div className="w-[44px] h-[44px] bg-[#fdf4ff] border border-purple-600/15 rounded-xl flex items-center justify-center mx-auto mb-2.5"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg></div><div className="text-[14px] font-[700] text-[#374151]">Marcas</div></div></Reveal>
            <Reveal delay={0.3}><div className="audience-card-new"><div className="w-[44px] h-[44px] bg-[#fffbeb] border border-amber-600/15 rounded-xl flex items-center justify-center mx-auto mb-2.5"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg></div><div className="text-[14px] font-[700] text-[#374151]">Ecommerce</div></div></Reveal>
            <Reveal delay={0.4}><div className="audience-card-new"><div className="w-[44px] h-[44px] bg-[#f0fdf4] border border-green-600/15 rounded-xl flex items-center justify-center mx-auto mb-2.5"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div><div className="text-[14px] font-[700] text-[#374151]">Agencias</div></div></Reveal>
            <Reveal delay={0.5}><div className="audience-card-new"><div className="w-[44px] h-[44px] bg-[#fdf2f8] border border-pink-600/15 rounded-xl flex items-center justify-center mx-auto mb-2.5"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#db2777" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div><div className="text-[14px] font-[700] text-[#374151]">Figuras públicas</div></div></Reveal>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-[100px] px-6 bg-[#f8fafc]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-[64px]">
            <Reveal><div className="chip-new mb-5">Lo que analizamos</div></Reveal>
            <Reveal delay={0.1}><h2 className="text-[clamp(30px,3.5vw,46px)] font-[800] mb-3.5 text-[#0f172a]">Todo lo que necesitás para<br/><span className="g-text">publicar con confianza.</span></h2></Reveal>
            <Reveal delay={0.2}><p className="text-[#94a3b8] text-[17px] max-w-[480px] mx-auto leading-[1.7]">Subís tu anuncio, bio o copy — en segundos sabés exactamente qué cambiar.</p></Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Reveal>
              <FeatureCard className="h-full flex flex-col">
                <div className="w-[48px] h-[48px] bg-[#eff6ff] border border-blue-600/15 rounded-[13px] flex items-center justify-center mb-4 text-[#2563eb]"><MetaLogo /></div>
                <h3 className="text-[17px] font-[700] mb-2 text-[#0f172a]">Analizador Meta</h3>
                <p className="text-[#94a3b8] text-[14px] leading-[1.7] flex-1">Detectamos violaciones de política antes de publicar. Evitá rechazos, restricciones y pérdida de presupuesto.</p>
                <div className="mt-4 pt-4 border-t border-black/5 text-[#2563eb] text-[13px] font-[600]">Compliance + performance score →</div>
              </FeatureCard>
            </Reveal>
            <Reveal delay={0.1}>
              <FeatureCard className="h-full flex flex-col">
                <div className="w-[48px] h-[48px] bg-[#eef2ff] border border-indigo-600/15 rounded-[13px] flex items-center justify-center mb-4 text-[#4f46e5]"><TikTokLogo /></div>
                <h3 className="text-[17px] font-[700] mb-2 text-[#0f172a]">Analizador TikTok</h3>
                <p className="text-[#94a3b8] text-[14px] leading-[1.7] flex-1">Revisamos tus creativos para TikTok contra sus políticas específicas. Hook, copy, visual y compliance en una sola revisión.</p>
                <div className="mt-4 pt-4 border-t border-black/5 text-[#4f46e5] text-[13px] font-[600]">Optimizado para TikTok →</div>
              </FeatureCard>
            </Reveal>
            <Reveal delay={0.2}>
              <FeatureCard className="h-full flex flex-col">
                <div className="w-[48px] h-[48px] bg-[#fffbeb] border border-amber-600/15 rounded-[13px] flex items-center justify-center mb-4 text-[#d97706]"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
                <h3 className="text-[17px] font-[700] mb-2 text-[#0f172a]">Analizador de Bios</h3>
                <p className="text-[#94a3b8] text-[14px] leading-[1.7] flex-1">Tu bio es tu primera impresión. Analizamos si cumple las políticas y si está optimizada para convertir.</p>
                <div className="mt-4 pt-4 border-t border-black/5 text-[#d97706] text-[13px] font-[600]">Instagram, TikTok, YouTube →</div>
              </FeatureCard>
            </Reveal>
            <Reveal delay={0.0}>
              <FeatureCard className="h-full flex flex-col">
                <div className="w-[48px] h-[48px] bg-[#fdf2f8] border border-pink-600/15 rounded-[13px] flex items-center justify-center mb-4 text-[#db2777]"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
                <h3 className="text-[17px] font-[700] mb-2 text-[#0f172a]">Copy Analyzer</h3>
                <p className="text-[#94a3b8] text-[14px] leading-[1.7] flex-1">Hook, CTA, lenguaje persuasivo y estructura. Reescritura automática con IA incluida en todos los planes.</p>
                <div className="mt-4 pt-4 border-t border-black/5 text-[#db2777] text-[13px] font-[600]">Reescritura automática con IA →</div>
              </FeatureCard>
            </Reveal>
            <Reveal delay={0.1}>
              <FeatureCard className="h-full flex flex-col">
                <div className="w-[48px] h-[48px] bg-[#f0fdf4] border border-green-600/15 rounded-[13px] flex items-center justify-center mb-4 text-[#16a34a]"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
                <h3 className="text-[17px] font-[700] mb-2 text-[#0f172a]">Analytics</h3>
                <p className="text-[#94a3b8] text-[14px] leading-[1.7] flex-1">Dashboard con datos claros de tu historial. Tendencias, patrones de rechazo y métricas para mejores decisiones.</p>
                <div className="mt-4 pt-4 border-t border-black/5 text-[#16a34a] text-[13px] font-[600]">Visión completa de tu historial →</div>
              </FeatureCard>
            </Reveal>
            <Reveal delay={0.2}>
              <FeatureCard className="h-full flex flex-col">
                <div className="w-[48px] h-[48px] bg-[#fdf4ff] border border-purple-600/15 rounded-[13px] flex items-center justify-center mb-4 text-[#9333ea]"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>
                <h3 className="text-[17px] font-[700] mb-2 text-[#0f172a]">Chat personalizado</h3>
                <p className="text-[#94a3b8] text-[14px] leading-[1.7] flex-1">Historial completo de tus análisis en formato chat. Consultá y revisá cualquier análisis anterior en segundos.</p>
                <div className="mt-4 pt-4 border-t border-black/5 text-[#9333ea] text-[13px] font-[600]">Historial siempre disponible →</div>
              </FeatureCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-[100px] px-6 bg-white">
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-[64px]">
            <Reveal><div className="chip-new mb-5">Así funciona</div></Reveal>
            <Reveal delay={0.1}><h2 className="text-[clamp(28px,3.5vw,44px)] font-[800] leading-[1.1] text-[#0f172a]">Protección en<br/><span className="g-text">3 pasos simples.</span></h2></Reveal>
          </div>
          <div className="flex flex-col gap-0">
            <Reveal>
              <div className="flex gap-6 items-start pb-6">
                <div className="flex flex-col items-center"><div className="step-num">1</div><div className="w-[2px] flex-1 min-h-[44px] mt-2 bg-gradient-to-b from-blue-600/30 to-indigo-600/10"></div></div>
                <div className="card-new flex-1 p-6 mb-2">
                  <h3 className="text-[17px] font-[700] mb-1.5 text-[#0f172a]">Subís tu anuncio</h3>
                  <p className="text-[#94a3b8] text-[14px] leading-[1.7]">Imagen, video, copy o screenshot de tu creativo de Meta o TikTok. Cualquier formato, en segundos.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex gap-6 items-start pb-6">
                <div className="flex flex-col items-center"><div className="step-num">2</div><div className="w-[2px] flex-1 min-h-[44px] mt-2 bg-gradient-to-b from-indigo-600/30 to-blue-600/10"></div></div>
                <div className="card-new flex-1 p-6 mb-2">
                  <h3 className="text-[17px] font-[700] mb-1.5 text-[#0f172a]">Lo analizamos al instante</h3>
                  <p className="text-[#94a3b8] text-[14px] leading-[1.7]">Revisamos compliance con las políticas, calidad del copy, visual y estructura. Todo en segundos, antes de publicar.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="flex gap-6 items-start">
                <div className="flex flex-col items-center"><div className="step-num">3</div></div>
                <div className="flex-1 p-6 rounded-[20px] border border-blue-600/15 bg-gradient-to-br from-[#eff6ff] to-[#eef2ff]">
                  <h3 className="text-[17px] font-[700] mb-1.5 text-[#0f172a]">Recibís el reporte y corregís</h3>
                  <p className="text-[#94a3b8] text-[14px] leading-[1.7]">Score 0–100, violaciones detectadas, sugerencias concretas y versiones mejoradas del copy generadas con IA. Publicás con confianza.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-[100px] px-6 bg-[#f8fafc]">
        <div className="max-w-[960px] mx-auto">
          <div className="text-center mb-[52px]">
            <Reveal><div className="chip-new bg-[#f0fdf4] border-green-500/20 text-[#16a34a] mb-5">Por qué confiar en hitd.ai</div></Reveal>
            <Reveal delay={0.1}><h2 className="text-[clamp(28px,3.5vw,44px)] font-[800] mb-3.5 text-[#0f172a]">Construido a partir de<br/><span className="g-text">miles de casos reales.</span></h2></Reveal>
            <Reveal delay={0.2}><p className="text-[#94a3b8] text-[17px] max-w-[500px] mx-auto leading-[1.7]">Cada función fue construida analizando miles de casos reales: suspensiones, restricciones, rechazos y recuperaciones.</p></Reveal>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-11">
            <Reveal><div className="card-new p-6.5 text-center py-6"><div className="font-['Space_Grotesk'] text-[40px] font-[800] bg-gradient-to-br from-[#2563eb] to-[#4f46e5] text-transparent bg-clip-text mb-1.5">+8.000</div><div className="text-[#64748b] text-[13px] leading-[1.5]">Casos analizados</div></div></Reveal>
            <Reveal delay={0.1}><div className="card-new p-6.5 text-center py-6"><div className="font-['Space_Grotesk'] text-[40px] font-[800] bg-gradient-to-br from-[#2563eb] to-[#4f46e5] text-transparent bg-clip-text mb-1.5">+3.200</div><div className="text-[#64748b] text-[13px] leading-[1.5]">Políticas cubiertas</div></div></Reveal>
            <Reveal delay={0.2}><div className="card-new p-6.5 text-center py-6"><div className="font-['Space_Grotesk'] text-[40px] font-[800] bg-gradient-to-br from-[#2563eb] to-[#4f46e5] text-transparent bg-clip-text mb-1.5">+12K</div><div className="text-[#64748b] text-[13px] leading-[1.5]">Anuncios protegidos</div></div></Reveal>
            <Reveal delay={0.3}><div className="card-new p-6.5 text-center py-6"><div className="font-['Space_Grotesk'] text-[40px] font-[800] bg-gradient-to-br from-[#2563eb] to-[#4f46e5] text-transparent bg-clip-text mb-1.5">3×</div><div className="text-[#64748b] text-[13px] leading-[1.5]">Más velocidad</div></div></Reveal>
          </div>
          <Reveal>
            <div className="bg-gradient-to-br from-[#eff6ff] to-[#eef2ff] border border-blue-600/10 rounded-[20px] p-9 flex gap-5 items-start flex-col sm:flex-row">
              <div className="w-[48px] h-[48px] bg-[#dbeafe] border border-blue-600/20 rounded-xl flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div className="flex-1">
                <h3 className="text-[17px] font-[700] mb-2 text-[#0f172a]">Sin promesas irreales. Solo protección honesta.</h3>
                <p className="text-[#64748b] text-[14px] leading-[1.75]">No te prometemos que tus anuncios van a ser aprobados al 100% ni que nunca tendrás un ban. Las plataformas son impredecibles. Lo que sí te prometemos es que tendrás la herramienta más avanzada para <strong>minimizar drásticamente ese riesgo</strong>, detectar problemas ocultos y proteger tu activo más importante.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-[120px] px-6 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-[64px]">
            <Reveal><div className="chip-new mb-5">Planes y Precios</div></Reveal>
            <Reveal delay={0.1}><h2 className="text-[clamp(30px,4vw,48px)] font-[800] mb-3.5 text-[#0f172a] leading-tight">Protección al alcance<br/><span className="g-text">de tu negocio.</span></h2></Reveal>
            <Reveal delay={0.2}><p className="text-[#94a3b8] text-[17px] max-w-[480px] mx-auto leading-[1.7]">Elegí el plan que mejor se adapte a tu volumen de análisis.</p></Reveal>
          </div>
          <Reveal delay={0.3}><LandingPricing /></Reveal>
          
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-dark py-[120px] px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(37,99,235,0.12)_0%,transparent_65%)] pointer-events-none"></div>
        <div className="max-w-[680px] mx-auto text-center relative z-10">
          <Reveal><div className="chip-new bg-white/5 border-white/10 text-[#94a3b8] mb-6">Empezá hoy</div></Reveal>
          <Reveal delay={0.1}><h2 className="text-[clamp(30px,4.5vw,52px)] font-[800] mb-4 leading-[1.1] text-[#f8fafc]">Tus cuentas son tu negocio.<br/><span className="g-text">No esperes a perderlas.</span></h2></Reveal>
          <Reveal delay={0.2}><p className="text-[#94a3b8] text-[17px] mb-10 max-w-[440px] mx-auto leading-[1.7]">Más de 12.000 creadores, marcas y agencias ya protegen sus cuentas con hitd.ai.</p></Reveal>
          <Reveal delay={0.3}><Link href="#pricing" className="btn-primary-new px-12 py-5 rounded-2xl text-[17px]">Proteger mis cuentas →</Link></Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-9 px-6 border-t border-black/5 bg-white relative z-10">
        <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="hitd.ai Logo" className="w-8 h-8 object-contain opacity-80 grayscale" onError={(e) => e.currentTarget.style.display = 'none'} />
            <span className="font-['Space_Grotesk'] font-[800] text-[20px] text-slate-900 tracking-tight">hitd.ai</span>
          </div>
          <div className="text-[#94a3b8] text-[13px]">Protección para cuentas digitales</div>
          <div className="flex gap-6">
            <Link href="#" className="text-[#94a3b8] text-[14px] hover:text-[#2563eb] transition-colors">Términos</Link>
            <Link href="#" className="text-[#94a3b8] text-[14px] hover:text-[#2563eb] transition-colors">Privacidad</Link>
            <Link href="#" className="text-[#94a3b8] text-[14px] hover:text-[#2563eb] transition-colors">Contacto</Link>
          </div>
          <div className="text-[#e2e8f0] text-[13px]">© 2026 hitd.ai.</div>
        </div>
      </footer>
    </div>
  );
}
