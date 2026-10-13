import React from 'react';

export const PageHeader = ({
  title,
  description,
  badge,
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-sand-border/80 ${className}`}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-espresso tracking-tight">
            {title}
          </h1>
          {badge && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-sand text-espresso border border-sand-border">
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p className="font-sans text-xs sm:text-sm text-espresso/60 max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {children && (
        <div className="flex flex-wrap items-center gap-2.5 sm:self-center">
          {children}
        </div>
      )}
    </div>
  );
};
