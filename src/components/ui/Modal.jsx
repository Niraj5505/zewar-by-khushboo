import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  maxWidth = 'max-w-2xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className={cn(
          "relative bg-brandWhite text-espresso w-full rounded-[4px] shadow-2xl z-10 border border-sand-border overflow-hidden animate-in fade-in zoom-in-95 duration-200",
          maxWidth,
          className
        )}
      >
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-sand-border/60">
          {title ? (
            <h3 className="font-serif text-lg sm:text-xl font-medium text-espresso">
              {title}
            </h3>
          ) : <div />}
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-espresso/60 hover:text-espresso rounded hover:bg-sand/40 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
