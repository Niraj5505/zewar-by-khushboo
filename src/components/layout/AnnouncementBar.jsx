import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { BRAND } from '../../lib/brand';

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#FAF7F0] border-b border-sand-border/60 text-espresso text-[11px] sm:text-xs py-2 px-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-6" /> {/* Spacer */}
        <div className="flex items-center gap-2 justify-center tracking-wider text-center font-medium font-sans">
          <Sparkles className="w-3 h-3 text-champagne hidden sm:inline" />
          <span>{BRAND.announcement}</span>
          <Sparkles className="w-3 h-3 text-champagne hidden sm:inline" />
        </div>
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="text-espresso/50 hover:text-espresso p-0.5 rounded transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
