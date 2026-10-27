import React, { useState } from 'react';
import { Truck, Copy, Check, Sparkles } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useShowOnce } from '../../hooks/useShowOnce';
import { POPUP_CONFIG } from '../../lib/popupConfig';

export const ExitIntentPopup = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { markSeen } = useShowOnce('exitIntent', POPUP_CONFIG.exitIntent.version);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('ROYAL05');
    setCopied(true);
    markSeen();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDismiss = () => {
    markSeen();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleDismiss}
      size="sm"
      showClose={true}
      className="border border-sand-border"
    >
      <div className="p-6 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-sand/60 flex items-center justify-center mx-auto text-champagne-dark">
          <Truck className="w-6 h-6" />
        </div>

        <div className="space-y-1.5">
          <span className="eyebrow text-champagne-dark">Before You Go</span>
          <h2 className="font-serif text-2xl font-medium text-espresso">
            Don't Leave Your Pieces Behind
          </h2>
          <p className="text-xs text-espresso/70 leading-relaxed max-w-xs mx-auto">
            Take an extra <strong>5% discount</strong> and unlock <strong>Free Express Pan-India Shipping</strong> on your order today.
          </p>
        </div>

        <div className="p-3 bg-brandWhite border border-dashed border-champagne rounded-[2px] flex items-center justify-between max-w-xs mx-auto">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-espresso/50 block text-left">Coupon Code</span>
            <span className="font-mono text-base font-bold text-espresso tracking-widest">ROYAL05</span>
          </div>
          <button
            type="button"
            onClick={handleCopyCode}
            className="px-3.5 py-1.5 bg-[#C6A15B] hover:bg-[#A8843F] text-[#30251F] text-xs font-bold uppercase rounded-[2px] transition-colors flex items-center gap-1"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Applied' : 'Copy'}</span>
          </button>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              handleCopyCode();
              onClose();
            }}
            className="w-full py-3 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
          >
            Apply Code & Continue Shopping
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="text-[11px] text-espresso/50 hover:text-espresso underline"
          >
            Dismiss offer
          </button>
        </div>
      </div>
    </Modal>
  );
};
