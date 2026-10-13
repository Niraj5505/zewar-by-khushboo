import React from 'react';
import { Sparkles } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Sparkles,
  title = "No records found",
  description = "Get started by creating your first entry or adjust your search filter.",
  actionText,
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white border border-sand-border/80 rounded-[4px] shadow-subtle ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-sand/50 flex items-center justify-center text-champagne mb-4 border border-sand-border">
        <Icon className="w-6 h-6 text-champagne-dark" />
      </div>
      <h3 className="font-serif text-lg font-medium text-espresso mb-1.5">{title}</h3>
      <p className="font-sans text-xs sm:text-sm text-espresso/60 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-champagne hover:bg-champagne-hover text-espresso font-medium text-xs tracking-wider uppercase rounded-[2px] transition-colors shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
