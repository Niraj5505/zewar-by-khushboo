import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DiyaIcon } from './DiyaIcon';
import { useFestiveMode } from '../../hooks/useFestiveMode';

export const DiwaliBanner = () => {
  const {
    isActive,
    bannerDismissed,
    dismissBanner,
    bannerMessage,
    bannerLinkText,
    bannerLinkUrl,
  } = useFestiveMode();

  if (!isActive || bannerDismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative z-40 bg-gradient-to-r from-[#2B1E19] via-[#3C1C17] to-[#2B1E19] text-[#FAF7F0] border-b border-[#B33A2B]/40 text-xs py-2 px-4 shadow-sm transition-all duration-300 animate-in fade-in slide-in-from-top-2"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between min-h-[22px]">
        {/* Balanced left spacer for center alignment */}
        <div className="w-6 hidden sm:block" aria-hidden="true" />

        {/* Center announcement text with Diya icon */}
        <div className="flex items-center gap-2 justify-center tracking-wide text-center mx-auto">
          <DiyaIcon className="w-4 h-4 text-champagne flex-shrink-0" />
          <span className="font-serif text-[12px] sm:text-[13px] font-normal tracking-wide text-[#FAF7F0]/95">
            {bannerMessage || 'Diwali Gifting — Complimentary Gift Wrapping on All Orders'}
          </span>
          {bannerLinkText && bannerLinkUrl && (
            <Link
              to={bannerLinkUrl}
              className="font-sans text-[11px] uppercase tracking-wider text-champagne font-semibold underline underline-offset-2 ml-1 hover:text-champagne-light transition-colors"
            >
              {bannerLinkText} →
            </Link>
          )}
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={dismissBanner}
          className="text-[#FAF7F0]/60 hover:text-[#FAF7F0] p-1 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-champagne"
          aria-label="Dismiss festive announcement"
          title="Dismiss banner for this season"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
