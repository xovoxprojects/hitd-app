// src/components/ui/PricingCard.tsx
import React from 'react';
import { Button } from './Button';
import { Badge } from './Badge';

type PricingCardProps = {
  title: string;
  price: string;
  period?: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  onCtaClick?: () => void;
};

export const PricingCard: React.FC<PricingCardProps> = ({ 
  title, price, period, features, isPopular, ctaText, onCtaClick 
}) => {
  return (
    <div className={`relative bg-white rounded-3xl border ${isPopular ? 'border-primary shadow-xl shadow-primary-100/50 scale-105 z-10' : 'border-border shadow-md'} p-8 flex flex-col h-full`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Badge variant="primary" className="px-3 py-1 text-sm bg-primary text-white border-none shadow-sm">
            Preferred Pricing
          </Badge>
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold tracking-tight text-foreground">{price}</span>
          {period && <span className="text-muted font-medium">/{period}</span>}
        </div>
      </div>

      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-muted">
            <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button 
        variant={isPopular ? 'primary' : 'outline'} 
        fullWidth 
        size="lg"
        onClick={onCtaClick}
        className={isPopular ? '' : 'border-2'}
      >
        {ctaText}
      </Button>
    </div>
  );
};
