// src/components/ui/Card.tsx
import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const isInteractive = !!onClick;
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300 ${isInteractive ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1' : 'shadow-sm'} ${className}`}
    >
      {children}
    </div>
  );
};
