import React from 'react';
import { DiyaIcon } from '../DiyaIcon';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

export const DiwaliDivider = ({ className = "" }) => {
  const { isActive } = useFestiveMode();

  if (!isActive) return null;

  return (
    <div
      aria-hidden="true"
      className={`relative py-8 flex items-center justify-center max-w-5xl mx-auto px-4 select-none ${className}`}
    >
      <div className="flex-1 border-t border-espresso/20" />
      <div className="px-5 flex items-center gap-2.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]/60" />
        <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
        <DiyaIcon
          className="w-5 h-5 text-champagne-dark"
          fillLamp="#C6A15B"
          fillFlame="#E8A33D"
          stroke="#30251F"
        />
        <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]/60" />
      </div>
      <div className="flex-1 border-t border-espresso/20" />
    </div>
  );
};
