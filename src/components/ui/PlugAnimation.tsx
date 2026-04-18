// src/components/ui/PlugAnimation.tsx
import React from 'react';

export const PlugAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 select-none overflow-hidden z-0">
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 800 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-slate-300"
      >
        {/* The socket/outlet on the right */}
        <g className="opacity-50">
          <rect x="420" y="160" width="80" height="80" rx="16" stroke="currentColor" strokeWidth="4" strokeDasharray="8 8" />
          <circle cx="445" cy="200" r="6" fill="currentColor" />
          <circle cx="475" cy="200" r="6" fill="currentColor" />
        </g>
        
        {/* The glowing lines representing power from the socket, triggering on connect */}
        <path 
          className="animate-powerPulse opacity-0 stroke-primary"
          d="M510 200 L600 200 M505 180 L550 150 M505 220 L550 250" 
          strokeWidth="3" 
          strokeLinecap="round" 
        />

        {/* The moving plug mechanism */}
        <g className="animate-plugSlide">
          {/* Cable */}
          <path d="M-100 200 Q 100 250 200 200 L 280 200" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="animate-glow" />
          {/* Plug head base */}
          <rect x="280" y="170" width="70" height="60" rx="12" fill="currentColor" className="animate-glow" />
          <rect x="350" y="180" width="10" height="40" fill="currentColor" className="animate-glow" />
          {/* Prongs */}
          <path d="M360 190 L400 190" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="animate-glow" />
          <path d="M360 210 L400 210" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="animate-glow" />
        </g>
      </svg>
    </div>
  );
};
