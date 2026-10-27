import React, { useState } from 'react';
import { Copy, Check, Sparkles, Tag } from 'lucide-react';
import { DiyaIcon } from '../DiyaIcon';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

export const DiwaliCouponCard = ({
  code = "DIWALI10",
  description = "Complimentary 10% on heirloom collections above ₹1,999",
  onApply,
  isApplied = false,
  className = "",
}) => {
  const { isActive } = useFestiveMode();
  const [copied, setCopied] = useState(false);

  if (!isActive) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`relative p-3.5 bg-gradient-to-r from-sand/30 via-white to-sand/30 border border-champagne/80 rounded-[4px] shadow-sm select-none overflow-hidden ${className}`}
    >
      {/* Decorative Gold Corner Accent */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-20">
        <svg viewBox="0 0 32 32" fill="none">
          <path d="M0 0 L32 0 L32 32 Z" fill="#C6A15B" />
        </svg>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <DiyaIcon className="w-3.5 h-3.5 text-champagne-dark" />
            <span className="font-serif font-bold text-sm tracking-widest text-espresso uppercase">
              {code}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="p-1 text-espresso/40 hover:text-espresso transition-colors rounded"
              title="Copy coupon code"
              aria-label="Copy coupon code"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
          <p className="text-[11px] text-espresso/70 leading-relaxed max-w-xs">
            {description}
          </p>
        </div>

        {onApply && (
          <button
            type="button"
            disabled={isApplied}
            onClick={() => onApply(code)}
            className={`px-3 py-1.5 rounded-[2px] text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 ${
              isApplied
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                : 'bg-champagne hover:bg-champagne-hover text-espresso shadow-sm'
            }`}
          >
            {isApplied ? (
              <>
                <Check className="w-3 h-3" />
                <span>Applied</span>
              </>
            ) : (
              <span>Apply</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
