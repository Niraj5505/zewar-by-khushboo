import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useScrollLock } from '../../hooks/useScrollLock';

export const Modal = ({
  open,
  onClose,
  title,
  description,
  size = 'md', // 'sm' (480) | 'md' (640) | 'lg' (900) | 'full'
  variant = 'modal', // 'modal' | 'sheet'
  closeOnBackdrop = true,
  showClose = true,
  children,
  footer,
  className,
}) => {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const isSheet = variant === 'sheet' || (variant === 'modal' && isMobile);

  useScrollLock(open);

  const sizeClasses = {
    sm: 'sm:max-w-[480px]',
    md: 'sm:max-w-[640px]',
    lg: 'sm:max-w-[900px]',
    full: 'sm:max-w-[95vw] sm:max-h-[92vh]',
  };

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
      <Dialog.Portal>
        {/* Backdrop Overlay */}
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-espresso/40 backdrop-blur-sm transition-opacity duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />

        {/* Content Container */}
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto pointer-events-none">
          <Dialog.Content
            onPointerDownOutside={(e) => {
              if (!closeOnBackdrop) {
                e.preventDefault();
              }
            }}
            className={cn(
              "pointer-events-auto relative w-full bg-ivory border border-espresso/20 shadow-2xl focus:outline-none transition-all duration-300 overflow-hidden",
              isSheet
                ? "rounded-t-[12px] max-h-[90vh] animate-in slide-in-from-bottom duration-300 flex flex-col"
                : cn("rounded-[3px] my-auto animate-in zoom-in-95 fade-in duration-200", sizeClasses[size]),
              className
            )}
          >
            {/* Sheet Top Drag Indicator for Mobile */}
            {isSheet && (
              <div className="w-full flex items-center justify-center pt-3 pb-1 flex-shrink-0">
                <div className="w-10 h-1 bg-espresso/20 rounded-full" />
              </div>
            )}

            {/* Header */}
            {(title || showClose) && (
              <div className="flex items-start justify-between px-5 pt-4 pb-2 sm:px-6 sm:pt-5 border-b border-espresso/10">
                <div className="pr-6">
                  {title && (
                    <Dialog.Title className="font-serif text-lg sm:text-xl font-medium text-espresso leading-snug">
                      {title}
                    </Dialog.Title>
                  )}
                  {description && (
                    <Dialog.Description className="text-xs sm:text-sm text-espresso/70 font-sans mt-0.5">
                      {description}
                    </Dialog.Description>
                  )}
                </div>

                {showClose && (
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close dialog"
                      className="p-1.5 text-espresso/60 hover:text-espresso rounded hover:bg-sand/40 transition-colors focus:ring-2 focus:ring-champagne focus:outline-none"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Close>
                )}
              </div>
            )}

            {/* Body */}
            <div className="px-5 py-4 sm:px-6 sm:py-5 overflow-y-auto flex-1">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-5 py-3.5 sm:px-6 sm:py-4 border-t border-espresso/10 bg-sand/20 flex items-center justify-end gap-3 flex-shrink-0">
                {footer}
              </div>
            )}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
