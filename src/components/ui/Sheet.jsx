import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useScrollLock } from '../../hooks/useScrollLock';

export const Sheet = ({
  open,
  onClose,
  side = 'right', // 'right' | 'bottom' | 'left'
  title,
  description,
  children,
  footer,
  className,
  showClose = true,
}) => {
  useScrollLock(open);

  const sideClasses = {
    right: 'inset-y-0 right-0 w-full max-w-md animate-in slide-in-from-right duration-300 border-l border-espresso/20',
    left: 'inset-y-0 left-0 w-full max-w-xs animate-in slide-in-from-left duration-300 border-r border-espresso/20',
    bottom: 'inset-x-0 bottom-0 max-h-[90vh] animate-in slide-in-from-bottom duration-300 border-t border-espresso/20 rounded-t-[12px]',
  };

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-espresso/40 backdrop-blur-sm transition-opacity duration-300" />
        <Dialog.Content
          className={cn(
            "fixed z-50 bg-ivory shadow-2xl flex flex-col focus:outline-none overflow-hidden",
            sideClasses[side],
            className
          )}
        >
          {side === 'bottom' && (
            <div className="w-full flex items-center justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 bg-espresso/20 rounded-full" />
            </div>
          )}

          {(title || showClose) && (
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-espresso/10 bg-sand/30 flex-shrink-0">
              <div>
                {title && (
                  <Dialog.Title className="font-serif text-lg font-medium text-espresso">
                    {title}
                  </Dialog.Title>
                )}
                {description && (
                  <Dialog.Description className="text-xs text-espresso/70 mt-0.5">
                    {description}
                  </Dialog.Description>
                )}
              </div>
              {showClose && (
                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label="Close sheet"
                    className="p-1.5 text-espresso/60 hover:text-espresso rounded hover:bg-sand/40 transition-colors focus:ring-2 focus:ring-champagne"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </Dialog.Close>
              )}
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {children}
          </div>

          {footer && (
            <div className="p-4 sm:p-5 border-t border-espresso/10 bg-sand/20 flex-shrink-0">
              {footer}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
