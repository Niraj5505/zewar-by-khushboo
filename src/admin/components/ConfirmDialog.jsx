import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AlertTriangle, X } from 'lucide-react';

export const ConfirmDialog = ({
  open,
  onOpenChange,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = true,
  requireMatchText = "",
  onConfirm,
  isLoading = false,
}) => {
  const [inputText, setInputText] = useState("");

  const handleConfirm = () => {
    if (requireMatchText && inputText.trim() !== requireMatchText) {
      return;
    }
    onConfirm();
    setInputText("");
  };

  const isConfirmDisabled = requireMatchText ? inputText.trim() !== requireMatchText : false;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-espresso/60 backdrop-blur-[2px] z-50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white border border-sand-border p-6 rounded-[4px] shadow-2xl z-50 focus:outline-none">
          <div className="flex items-start gap-4">
            <div
              className={`p-2.5 rounded-full flex-shrink-0 ${
                isDestructive ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-2">
              <Dialog.Title className="font-serif text-lg font-medium text-espresso">
                {title}
              </Dialog.Title>
              <Dialog.Description className="font-sans text-xs text-espresso/70 leading-relaxed">
                {description}
              </Dialog.Description>

              {requireMatchText && (
                <div className="pt-2">
                  <p className="text-[11px] text-espresso/60 mb-1">
                    To confirm, please type <strong className="text-espresso font-semibold">{requireMatchText}</strong> below:
                  </p>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={requireMatchText}
                    className="w-full px-3 py-1.5 text-xs border border-sand-border rounded-[2px] focus:outline-none focus:ring-2 focus:ring-champagne bg-ivory/50 text-espresso"
                  />
                </div>
              )}
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="text-espresso/40 hover:text-espresso p-1 rounded transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-sand-border/50">
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                setInputText("");
              }}
              className="px-4 py-2 border border-sand-border hover:bg-sand/30 text-espresso text-xs uppercase tracking-wider font-semibold rounded-[2px] transition-colors"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              disabled={isConfirmDisabled || isLoading}
              onClick={handleConfirm}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-[2px] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                isDestructive
                  ? 'bg-rose-700 hover:bg-rose-800 text-white'
                  : 'bg-champagne hover:bg-champagne-hover text-espresso'
              }`}
            >
              {isLoading ? "Processing..." : confirmLabel}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
