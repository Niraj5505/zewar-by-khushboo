import React from 'react';
import { cn } from '../../lib/cn';

export const Badge = ({
  children,
  className,
  variant = 'default', // 'default' | 'gold' | 'sale' | 'outline' | 'bestseller'
}) => {
  const variants = {
    default: "bg-sand text-espresso",
    gold: "bg-champagne/20 text-espresso font-semibold border border-champagne/40",
    sale: "bg-[#8C2D19] text-ivory font-medium",
    bestseller: "bg-espresso text-ivory font-medium",
    outline: "border border-sand-border text-espresso/80 bg-brandWhite/80",
    feature: "bg-[#FAF7F0] border border-sand-border text-espresso text-[11px] px-2.5 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[10px] tracking-wider uppercase rounded-[2px]",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
