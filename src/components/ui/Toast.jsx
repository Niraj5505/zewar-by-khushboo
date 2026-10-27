import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Info, X, ArrowRight } from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import { cn } from '../../lib/cn';

export const Toast = ({ toast }) => {
  const { dismissToast } = useToastStore();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => {
      dismissToast(toast.id);
    }, toast.duration || 4000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, isPaused, dismissToast]);

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-700 flex-shrink-0" />,
    info: <Info className="w-4 h-4 text-champagne-dark flex-shrink-0" />,
  };

  return (
    <div
      role="status"
      aria-live="polite"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={cn(
        "relative w-full max-w-sm sm:max-w-md bg-ivory text-espresso border-l-4 border-l-champagne border-y border-r border-espresso/15 shadow-xl rounded-r-[3px] p-3.5 sm:p-4 flex items-start gap-3 transition-all duration-300 animate-in slide-in-from-right-5 fade-in-0"
      )}
    >
      {/* Status icon */}
      <div className="pt-0.5">
        {icons[toast.type] || icons.info}
      </div>

      {/* Product image if attached */}
      {toast.product && toast.product.images?.[0] && (
        <div className="w-10 h-12 aspect-[4/5] bg-sand rounded-[2px] overflow-hidden flex-shrink-0 border border-espresso/10">
          <img
            src={toast.product.images[0]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content & Action */}
      <div className="flex-1 min-w-0 pr-2">
        <p className="text-xs sm:text-sm font-medium text-espresso leading-snug">
          {toast.message}
        </p>

        {toast.action && (
          <div className="mt-2">
            {toast.action.href ? (
              <Link
                to={toast.action.href}
                onClick={() => dismissToast(toast.id)}
                className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-bold text-champagne-dark hover:text-espresso transition-colors"
              >
                <span>{toast.action.label}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  toast.action.onClick?.();
                  dismissToast(toast.id);
                }}
                className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider font-bold text-champagne-dark hover:text-espresso transition-colors"
              >
                <span>{toast.action.label}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={() => dismissToast(toast.id)}
        aria-label="Dismiss notification"
        className="text-espresso/50 hover:text-espresso p-1 rounded transition-colors focus:ring-1 focus:ring-champagne"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
