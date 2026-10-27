import React, { useState } from 'react';
import { Copy, Check, Sparkles, X } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { usePopupStore } from '../../store/popupStore';
import { useShowOnce } from '../../hooks/useShowOnce';
import { POPUP_CONFIG } from '../../lib/popupConfig';

export const WelcomeOfferPopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { markSeen } = useShowOnce('welcome', POPUP_CONFIG.welcome.version);

  const handleClaim = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitted(true);
    markSeen();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('ZEWAR10');
    setCopied(true);
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
      className="border-2 border-champagne/40 bg-ivory text-espresso p-0"
    >
      <div className="p-6 sm:p-8 text-center space-y-5">
        <div className="w-12 h-12 rounded-full bg-champagne/20 border border-champagne/50 flex items-center justify-center mx-auto text-champagne-dark">
          <Sparkles className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <span className="eyebrow text-champagne-dark">Exclusive Welcome Privilege</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-espresso leading-snug">
            Welcome to Zewar
          </h2>
          <p className="text-xs sm:text-sm text-espresso/75 leading-relaxed max-w-xs mx-auto">
            Enjoy <strong>10% off</strong> your maiden order of handcrafted Kundan and bridal heirlooms.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleClaim} className="space-y-3.5 pt-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full text-xs sm:text-sm px-4 py-3 bg-brandWhite text-espresso placeholder:text-espresso/40 border border-espresso/20 rounded-[2px] focus:outline-none focus:border-champagne focus:ring-1 focus:ring-champagne"
            />

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C6A15B] hover:bg-[#A8843F] text-[#30251F] text-xs uppercase tracking-widest font-bold rounded-[2px] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>Claim 10% Off</span>
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              className="text-[11px] text-espresso/50 hover:text-espresso underline transition-colors pt-1 block mx-auto"
            >
              No thanks, I'll pay full price
            </button>
          </form>
        ) : (
          <div className="p-4 bg-sand/30 border border-champagne/40 rounded-[2px] space-y-3 pt-3">
            <p className="text-xs text-emerald-800 font-semibold">
              Your welcome voucher code is ready!
            </p>
            <div className="flex items-center justify-between p-2.5 bg-brandWhite border border-sand-border rounded-[2px]">
              <span className="font-mono text-base font-bold text-espresso tracking-widest">
                ZEWAR10
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-3 py-1 bg-champagne text-espresso text-xs font-bold rounded-[2px] hover:bg-champagne-hover transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-espresso/60">
              Apply at checkout on any order. We've also dispatched a confirmation to your inbox.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] mt-2 hover:bg-espresso-light"
            >
              Start Exploring
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
