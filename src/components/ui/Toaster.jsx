import React from 'react';
import { useToastStore } from '../../store/toastStore';
import { Toast } from './Toast';

export const Toaster = () => {
  const toasts = useToastStore((state) => state.toasts);

  if (!toasts.length) return null;

  return (
    <div
      aria-label="Notifications"
      className="fixed z-50 flex flex-col gap-2.5 pointer-events-none p-4 sm:p-6
        /* Top-right on desktop, bottom on mobile */
        bottom-0 inset-x-0 sm:bottom-auto sm:inset-x-auto sm:top-4 sm:right-4 items-center sm:items-end"
    >
      {toasts.map((toastItem) => (
        <div key={toastItem.id} className="pointer-events-auto w-full sm:w-auto">
          <Toast toast={toastItem} />
        </div>
      ))}
    </div>
  );
};
