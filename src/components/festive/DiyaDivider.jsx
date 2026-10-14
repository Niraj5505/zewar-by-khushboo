import React from 'react';
import { DiyaIcon } from './DiyaIcon';
import { useFestiveMode } from '../../hooks/useFestiveMode';

export const DiyaDivider = ({ className = "" }) => {
  const { isActive } = useFestiveMode();

  if (!isActive) return null;

  return (
    <div
      aria-hidden="true"
      className={`relative py-6 flex items-center justify-center max-w-5xl mx-auto px-4 ${className}`}
    >
      {/* Left stroke */}
      <div className="flex-1 border-t border-espresso/20" />

      {/* Centered ornamental Diya */}
      <div className="px-4 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-champagne/60" />
        <DiyaIcon
          className="w-5 h-5 text-champagne-dark"
          fillLamp="#C6A15B"
          fillFlame="#E8A33D"
          stroke="#30251F"
        />
        <span className="w-1.5 h-1.5 rounded-full bg-champagne/60" />
      </div>

      {/* Right stroke */}
      <div className="flex-1 border-t border-espresso/20" />
    </div>
  );
};
