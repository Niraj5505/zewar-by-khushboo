import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Sparkles, Sliders } from 'lucide-react';
import { DiyaIcon } from './DiyaIcon';
import { useFestiveMode } from '../../hooks/useFestiveMode';

export const FestiveToggle = () => {
  const location = useLocation();
  const { isActive, userOptOut, setUserOptOut } = useFestiveMode();
  const [isOpen, setIsOpen] = useState(false);

  // Hidden on checkout, cart, or admin pages
  const isHiddenRoute =
    location.pathname.startsWith('/checkout') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/cart');

  if (isHiddenRoute) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden sm:block select-none">
      {/* Popover Card */}
      {isOpen && (
        <div className="absolute bottom-12 left-0 mb-2 w-64 bg-white border border-sand-border rounded-[4px] shadow-2xl p-4 text-xs animate-in zoom-in-95 fade-in duration-200">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-sand-border/70">
            <div className="flex items-center gap-1.5 font-serif font-medium text-espresso text-sm">
              <DiyaIcon className="w-4 h-4 text-champagne-dark" />
              <span>Festive Dressing</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-espresso/40 hover:text-espresso p-0.5 rounded"
              aria-label="Close settings"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-[11px] text-espresso/70 leading-relaxed">
              Seasonal gold ambient sparkles, diya motifs, and celebratory touches across the boutique.
            </p>

            <div className="flex items-center justify-between pt-1">
              <span className="font-semibold text-espresso text-xs">Festive Effects</span>
              <button
                type="button"
                role="switch"
                aria-checked={!userOptOut}
                onClick={() => setUserOptOut(!userOptOut)}
                className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
                  !userOptOut ? 'bg-champagne' : 'bg-sand'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    !userOptOut ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <p className="text-[10px] text-espresso/40 italic">
              Your preference is remembered for future boutique visits.
            </p>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle festive effects"
        aria-pressed={isActive}
        title="Boutique Seasonal Dressing"
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-hover border ${
          isActive
            ? 'bg-espresso text-champagne border-champagne/40 hover:scale-105'
            : 'bg-white text-espresso/60 border-sand-border hover:text-espresso hover:border-espresso'
        }`}
      >
        <DiyaIcon
          className="w-4 h-4"
          fillLamp={isActive ? '#C6A15B' : '#6E5C51'}
          fillFlame={isActive ? '#E8A33D' : '#C6A15B'}
          stroke={isActive ? '#FAF7F0' : '#6E5C51'}
        />
      </button>
    </div>
  );
};
