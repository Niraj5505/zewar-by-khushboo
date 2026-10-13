import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { BRAND } from '../../lib/brand';
import { useCmsStore } from '../../admin/lib/cmsStore';

export const AnnouncementBar = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const announcement = useCmsStore((s) => s.announcement);

  const active = announcement?.active !== false;
  const isVisible = active && !isDismissed;

  if (!isVisible) return null;

  const message = announcement?.message || BRAND.announcement;
  const bgColor = announcement?.backgroundColor || '#FAF7F0';
  const textColor = announcement?.textColor || '#30251F';
  const dismissible = announcement?.dismissible !== false;

  return (
    <div
      style={{ backgroundColor: bgColor, color: textColor }}
      className="border-b border-sand-border/60 text-[11px] sm:text-xs py-2 px-4 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-6" /> {/* Spacer */}
        <div className="flex items-center gap-2 justify-center tracking-wider text-center font-medium font-sans">
          <Sparkles className="w-3 h-3 text-champagne hidden sm:inline" />
          <span>{message}</span>
          {announcement?.link && announcement?.linkText && (
            <a
              href={announcement.link}
              className="underline font-semibold ml-1 hover:opacity-80 transition-opacity"
            >
              {announcement.linkText}
            </a>
          )}
          <Sparkles className="w-3 h-3 text-champagne hidden sm:inline" />
        </div>
        {dismissible ? (
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="text-current opacity-60 hover:opacity-100 p-0.5 rounded transition-opacity"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="w-6" />
        )}
      </div>
    </div>
  );
};

