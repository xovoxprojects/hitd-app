// src/components/ui/Badge.tsx
import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'default';
  className?: string;
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const baseClass = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-colors";
  
  const variants = {
    primary: "bg-primary-100 text-primary-800",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    default: "bg-slate-100 text-slate-800"
  };

  return (
    <span className={`${baseClass} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
