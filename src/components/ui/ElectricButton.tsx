// src/components/ui/ElectricButton.tsx
import React, { ButtonHTMLAttributes } from 'react';

type ElectricButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
};

export const ElectricButton: React.FC<ElectricButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const isPrimary = variant === 'primary';
  const mainColorClass = isPrimary ? 'text-primary-400' : 'text-slate-400';
  const bgColorClass = isPrimary ? 'bg-primary' : 'bg-slate-900';
  const textColorClass = isPrimary ? 'text-white' : 'text-white';
  
  return (
    <button 
      className={`relative inline-flex items-center justify-center px-8 py-4 font-bold text-lg rounded-xl overflow-hidden group transition-all duration-300 focus:outline-none hover:scale-105 active:scale-95 ${fullWidth ? 'w-full' : 'w-full sm:w-auto'} ${textColorClass} ${className}`}
      {...props}
    >
      {/* Base Background solid color */}
      <span className={`absolute inset-0 ${bgColorClass} rounded-xl opacity-90 transition-opacity group-hover:opacity-100`}></span>
      
      {/* Ambient Glow behind the button */}
      <div 
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl blur-lg ${isPrimary ? 'bg-primary' : 'bg-slate-600'}`} 
      ></div>

      {/* SVG moving border for electricity */}
      <span className="absolute inset-0 rounded-xl pointer-events-none rounded-[14px]">
        <svg width="100%" height="100%" className="absolute inset-0 opacity-80 mix-blend-screen overflow-visible">
          <rect 
            width="100%" 
            height="100%" 
            rx="12" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
            className={`animate-electricDash ${mainColorClass} group-hover:animate-flashTwitch drop-shadow-md`} 
            strokeDasharray="15 25 10 50 20 40 5 60"
            strokeLinecap="round"
          />
          <rect 
            width="100%" 
            height="100%" 
            rx="12" 
            fill="none" 
            stroke="white" 
            strokeWidth="1"
            className={`animate-electricDashRev opacity-50 group-hover:opacity-100`} 
            strokeDasharray="5 45 10 60 4 70"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {/* Button Text */}
      <span className="relative z-10 flex items-center gap-2 group-hover:animate-electricText">
        {children}
        <svg className="w-5 h-5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </span>
    </button>
  );
};
