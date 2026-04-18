// src/components/ui/Button.tsx
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    const baseClass = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow-md focus:ring-primary-500",
      secondary: "bg-primary-50 text-primary-900 hover:bg-primary-100 focus:ring-primary-500",
      outline: "border border-border bg-white hover:bg-surface text-foreground focus:ring-slate-500",
      danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
      ghost: "bg-transparent text-muted hover:text-foreground hover:bg-surface focus:ring-slate-500"
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3 text-base"
    };

    const classes = `${baseClass} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
