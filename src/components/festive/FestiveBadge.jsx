import React from 'react';
import { Sparkles } from 'lucide-react';
import { useFestiveMode } from '../../hooks/useFestiveMode';

export const FestiveBadge = ({ product, className = "" }) => {
  const { isActive } = useFestiveMode();

  if (!isActive) return null;

  // Show if product is explicitly tagged festive, or has festive in slug/title
  const isFestiveProduct =
    Boolean(product?.festive) ||
    Boolean(product?.tags?.includes('festive')) ||
    Boolean(product?.slug?.includes('festive'));

  if (!isFestiveProduct) return null;

  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center gap-1 bg-champagne text-espresso text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-[2px] shadow-sm ${className}`}
    >
      <Sparkles className="w-2.5 h-2.5 text-espresso" />
      <span>Diwali</span>
    </span>
  );
};
