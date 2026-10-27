import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  subtext = "vs last month",
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-sand-border/80 p-5 rounded-[4px] shadow-subtle transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-champagne hover:shadow-hover' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-espresso/60 font-sans">
          {title}
        </span>
        {Icon && (
          <div className="p-2 rounded-[2px] bg-sand/30 text-champagne-dark border border-sand-border/50">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-serif text-2xl sm:text-3xl font-medium text-espresso tracking-tight">
          {value}
        </span>
      </div>

      {change && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs font-sans">
          <span
            className={`inline-flex items-center gap-0.5 font-semibold text-[11px] ${
              isPositive ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            {change}
          </span>
          <span className="text-espresso/50 text-[11px]">{subtext}</span>
        </div>
      )}
    </div>
  );
};
