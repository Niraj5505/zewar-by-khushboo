import React from 'react';

const VARIANTS = {
  // Order & Payment
  paid: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
  delivered: 'bg-espresso text-ivory border-espresso',
  shipped: 'bg-champagne/15 text-champagne-dark border-champagne/40',
  processing: 'bg-amber-50 text-amber-800 border-amber-200/80',
  unfulfilled: 'bg-sand/70 text-espresso/70 border-sand-border',
  pending: 'bg-amber-50 text-amber-800 border-amber-200/80',
  failed: 'bg-rose-50 text-rose-800 border-rose-200/80',
  cancelled: 'bg-zinc-100 text-zinc-600 border-zinc-200',
  refunded: 'bg-purple-50 text-purple-800 border-purple-200/80',

  // Product & Content status
  published: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
  draft: 'bg-sand/60 text-espresso/60 border-sand-border',
  active: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
  inactive: 'bg-zinc-100 text-zinc-600 border-zinc-200',
  approved: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
  rejected: 'bg-rose-50 text-rose-800 border-rose-200/80',
  requested: 'bg-amber-50 text-amber-800 border-amber-200/80',

  // Inventory
  in_stock: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
  low_stock: 'bg-amber-50 text-amber-800 border-amber-200/80',
  out_of_stock: 'bg-rose-50 text-rose-800 border-rose-200/80',
};

export const StatusBadge = ({ status, label, className = '' }) => {
  const normalizedKey = String(status || '').toLowerCase().replace(/[\s-]/g, '_');
  const style = VARIANTS[normalizedKey] || 'bg-sand/60 text-espresso/70 border-sand-border';
  const displayLabel = label || status || 'Unknown';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase border font-sans ${style} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {displayLabel}
    </span>
  );
};
