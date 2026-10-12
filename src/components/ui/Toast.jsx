import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { cn } from '../../lib/cn';

export const Toast = () => {
  const { toast, hideToast } = useUIStore();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />,
    info: <Info className="w-4 h-4 text-champagne flex-shrink-0" />,
  };

  return (
    <aside
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-espresso text-ivory rounded-[3px] shadow-2xl border border-champagne/30 text-xs sm:text-sm animate-in slide-in-from-bottom-5 duration-300 max-w-md"
    >
      {icons[toast.type] || icons.info}
      <span className="font-sans font-medium">{toast.message}</span>
      <button
        type="button"
        onClick={hideToast}
        className="ml-2 text-ivory/60 hover:text-ivory"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
