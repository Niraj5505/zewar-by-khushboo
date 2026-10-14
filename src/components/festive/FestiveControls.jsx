import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Sliders, RotateCcw, ShieldAlert, Sparkles, Music, Flame, Layers } from 'lucide-react';
import { DiyaIcon } from './DiyaIcon';
import { useFestiveMode } from '../../hooks/useFestiveMode';

export const FestiveControls = ({ inline = false }) => {
  const location = useLocation();
  const {
    isActive,
    userOptOut,
    setUserOptOut,
    prefs,
    setPref,
    resetPrefs,
    reduceAllMotion,
  } = useFestiveMode();

  const [isOpen, setIsOpen] = useState(false);

  const isHiddenRoute =
    location.pathname.startsWith('/checkout') ||
    location.pathname.startsWith('/admin');

  if (isHiddenRoute && !inline) return null;

  const toggleItems = [
    { key: 'ambient', label: 'Ambient Garlands & Rangoli', desc: 'Corner torans, floral garland' },
    { key: 'particles', label: 'Gold Sparkles & Lamps', desc: 'Slow upward drifting sparks' },
    { key: 'heroScene', label: 'Hero Lighting & 3D Diya', desc: 'Illuminated focal scene' },
    { key: 'animations', label: 'Shimmer & Glow Borders', desc: 'Slow gold foil sweeps' },
    { key: 'confetti', label: 'Add-to-Bag Confetti', desc: 'Single celebration burst' },
    { key: 'ambience', label: 'Soft Acoustic Ambience', desc: 'Subtle tanpura acoustic drone' },
  ];

  // Inline mode for mobile menu
  if (inline) {
    return (
      <div className="p-4 bg-sand/30 border border-sand-border rounded-[4px] space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DiyaIcon className="w-4 h-4 text-champagne-dark" />
            <span className="font-serif font-medium text-espresso text-sm">Festive Dressing</span>
          </div>
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
              className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                !userOptOut ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        <p className="text-[11px] text-espresso/60">
          Seasonal gold ambiance, diya motifs, and celebratory accents across the boutique.
        </p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden sm:block select-none">
      {/* Expanded Control Panel */}
      {isOpen && (
        <div className="absolute bottom-12 left-0 mb-2 w-72 bg-white border border-sand-border rounded-[4px] shadow-2xl p-4 text-xs animate-in zoom-in-95 fade-in duration-200 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-sand-border">
            <div className="flex items-center gap-1.5 font-serif font-medium text-espresso text-sm">
              <DiyaIcon className="w-4 h-4 text-champagne-dark" />
              <span>Festive Dressing Controls</span>
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

          {/* Master Toggle */}
          <div className="flex items-center justify-between p-2.5 bg-sand/20 border border-sand-border/80 rounded-[3px]">
            <div>
              <span className="font-semibold text-espresso block">Master Festive Mode</span>
              <span className="text-[10px] text-espresso/60">Show seasonal boutique dressing</span>
            </div>
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
                className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                  !userOptOut ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Granular Sub-Toggles */}
          {!userOptOut && (
            <div className="space-y-2.5 pt-1">
              <span className="eyebrow text-espresso/50 text-[9px] tracking-wider block">
                Custom Visual Layers
              </span>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                {toggleItems.map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-1">
                    <div>
                      <span className="font-medium text-espresso block text-[11px]">{item.label}</span>
                      <span className="text-[10px] text-espresso/50 block">{item.desc}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={Boolean(prefs[item.key])}
                      onChange={(e) => setPref(item.key, e.target.checked)}
                      className="w-3.5 h-3.5 accent-champagne rounded cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Presets Footer */}
          <div className="pt-2 border-t border-sand-border flex items-center justify-between text-[11px]">
            <button
              type="button"
              onClick={reduceAllMotion}
              className="text-espresso/60 hover:text-espresso underline"
            >
              Reduce all motion
            </button>
            <button
              type="button"
              onClick={resetPrefs}
              className="text-champagne-dark hover:text-espresso font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Defaults</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Diya Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Festive effects settings"
        aria-expanded={isOpen}
        title="Boutique Festive Seasonal Dressing"
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-hover border cursor-pointer ${
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
