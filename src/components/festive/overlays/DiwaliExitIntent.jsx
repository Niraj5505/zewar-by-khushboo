import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, Gift, Sparkles, X } from 'lucide-react';
import { Modal } from '../../ui/Modal';
import { DiyaIcon } from '../DiyaIcon';
import { useFestiveMode } from '../../../hooks/useFestiveMode';
import { useExitIntent } from '../../../hooks/useExitIntent';
import { usePopupStore } from '../../../store/popupStore';

export const DiwaliExitIntent = () => {
  const location = useLocation();
  const { isActive, canShowAnimations } = useFestiveMode();
  const [isOpen, setIsOpen] = useState(false);
  const activePopup = usePopupStore((s) => s.activePopup);
  const openPopup = usePopupStore((s) => s.openPopup);
  const closePopup = usePopupStore((s) => s.closePopup);

  const isCheckoutOrCart = ['/checkout', '/cart'].includes(location.pathname);

  useExitIntent(() => {
    if (!isActive || isCheckoutOrCart) return;

    // Check if exit popup was already shown this session
    const shown = sessionStorage.getItem('zewar.diwali.exit.shown');
    if (shown || usePopupStore.getState().activePopup) return;

    setIsOpen(true);
    openPopup('diwaliExit');
    sessionStorage.setItem('zewar.diwali.exit.shown', 'true');
  }, isActive && !isCheckoutOrCart);

  const handleClose = () => {
    setIsOpen(false);
    if (activePopup === 'diwaliExit') {
      closePopup();
    }
  };

  if (!isOpen && activePopup !== 'diwaliExit') return null;

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      size="sm"
      variant="modal"
      showClose={true}
      className="p-0 overflow-hidden bg-ivory border border-sand-border shadow-2xl rounded-[4px] max-w-md mx-auto text-center"
    >
      <div className="h-1 bg-gradient-to-r from-champagne via-[#E8A33D] to-champagne" />

      <div className="p-6 sm:p-8 space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-sand/60 border border-sand-border flex items-center justify-center">
          <DiyaIcon className="w-6 h-6 text-champagne-dark" />
        </div>

        <div className="space-y-1.5">
          <span className="eyebrow text-champagne-dark text-[10px] tracking-widest block">
            Before You Leave Our Boutique
          </span>
          <h3 className="font-serif text-2xl font-medium text-espresso tracking-tight">
            A Diwali Gesture For You
          </h3>
          <p className="font-sans text-xs sm:text-sm text-espresso/75 leading-relaxed max-w-xs mx-auto">
            Take home complimentary luxury velvet gift packaging and insured Pan-India shipping on all heirloom purchases today.
          </p>
        </div>

        {/* Promotion pill */}
        <div className="p-3 bg-white border border-champagne/60 rounded-[3px] text-xs text-espresso space-y-1">
          <p className="font-semibold text-espresso flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-champagne-dark" />
            <span>Use Code: DIWALI10 for 10% Off</span>
          </p>
          <p className="text-[11px] text-espresso/60">
            Valid on all handcrafted earrings, necklaces, and bangles.
          </p>
        </div>

        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-2.5 bg-espresso hover:bg-espresso-light text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] transition-all"
          >
            Claim & Keep Browsing
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="text-[11px] text-espresso/50 hover:text-espresso"
          >
            No thank you, dismiss
          </button>
        </div>
      </div>
    </Modal>
  );
};
