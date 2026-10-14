import React from 'react';
import { Sparkles } from 'lucide-react';
import { formatPaise } from '../../../lib/formatINR';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

export const FestivePriceTag = ({
  pricePaise,
  compareAtPricePaise,
  className = "",
  size = "md", // 'sm' | 'md' | 'lg'
}) => {
  const { isActive, canShowAnimations } = useFestiveMode();
  const hasDiscount = compareAtPricePaise && compareAtPricePaise > pricePaise;

  const fontSizes = {
    sm: 'text-xs',
    md: 'text-sm font-semibold',
    lg: 'text-xl sm:text-2xl font-semibold',
  };

  if (!isActive || !hasDiscount) {
    return (
      <div className={`flex items-baseline gap-2 ${className}`}>
        <span className={`font-mono text-espresso ${fontSizes[size]}`}>
          {formatPaise(pricePaise)}
        </span>
        {hasDiscount && (
          <span className="font-mono text-[11px] text-espresso/40 line-through">
            {formatPaise(compareAtPricePaise)}
          </span>
        )}
      </div>
    );
  }

  // Gold foil treatment on genuine sale prices
  return (
    <div className={`flex items-baseline gap-2 select-none ${className}`}>
      <span
        className={`font-mono font-bold tracking-tight ${fontSizes[size]}`}
        style={{
          backgroundImage: canShowAnimations
            ? 'linear-gradient(135deg, #A8843F 0%, #C6A15B 50%, #E8A33D 100%)'
            : 'none',
          WebkitBackgroundClip: canShowAnimations ? 'text' : 'unset',
          WebkitTextFillColor: canShowAnimations ? 'transparent' : '#A8843F',
          color: '#A8843F',
        }}
      >
        {formatPaise(pricePaise)}
      </span>

      <span className="font-mono text-[11px] text-espresso/40 line-through">
        {formatPaise(compareAtPricePaise)}
      </span>

      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-[2px]">
        <Sparkles className="w-2.5 h-2.5 text-champagne-dark" />
        <span>Festive Value</span>
      </span>
    </div>
  );
};
