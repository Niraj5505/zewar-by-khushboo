import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { DiyaIcon } from './DiyaIcon';
import { useFestiveMode } from '../../hooks/useFestiveMode';
import { usePopupStore } from '../../store/popupStore';

export const DiwaliPopup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isActive,
    isPreview,
    popupSeen,
    markPopupSeen,
    popupTitle,
    popupBody,
    popupCtaText,
    popupCtaUrl,
    popupImage,
  } = useFestiveMode();

  const [isOpen, setIsOpen] = useState(false);
  const activePopup = usePopupStore((s) => s.activePopup);
  const openPopup = usePopupStore((s) => s.openPopup);
  const closePopup = usePopupStore((s) => s.closePopup);

  const isCheckoutOrAdmin =
    location.pathname.startsWith('/checkout') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/cart');

  // Trigger: 15s dwell time on site (or 1s if in preview mode)
  useEffect(() => {
    if (!isActive || isCheckoutOrAdmin) return;
    if (popupSeen && !isPreview) return;

    const delay = isPreview ? 1200 : 15000;

    const timer = setTimeout(() => {
      // Respect one-popup-at-a-time rule
      if (!usePopupStore.getState().activePopup) {
        setIsOpen(true);
        openPopup('diwali');
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isActive, popupSeen, isPreview, isCheckoutOrAdmin, openPopup]);

  const handleClose = () => {
    setIsOpen(false);
    markPopupSeen();
    if (activePopup === 'diwali') {
      closePopup();
    }
  };

  const handleCta = () => {
    handleClose();
    if (popupCtaUrl) {
      navigate(popupCtaUrl);
    }
  };

  if (!isOpen && activePopup !== 'diwali') return null;

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      size="sm"
      variant="modal"
      showClose={true}
      className="p-0 overflow-hidden bg-ivory border border-sand-border shadow-2xl rounded-[4px] max-w-md mx-auto"
    >
      {/* Top Ornamental Header Bar */}
      <div className="h-1 bg-gradient-to-r from-champagne via-[#E8A33D] to-champagne" />

      <div className="p-6 sm:p-8 text-center space-y-5">
        {/* Diya Emblem */}
        <div className="w-14 h-14 mx-auto rounded-full bg-sand/60 border border-sand-border flex items-center justify-center shadow-inner">
          <DiyaIcon
            className="w-7 h-7 text-champagne-dark"
            fillLamp="#C6A15B"
            fillFlame="#E8A33D"
            stroke="#30251F"
          />
        </div>

        {/* Header and Story copy */}
        <div className="space-y-2">
          <span className="eyebrow text-champagne-dark text-[10px] tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-champagne" />
            <span>Festival of Lights</span>
            <Sparkles className="w-3 h-3 text-champagne" />
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-espresso tracking-tight">
            {popupTitle || 'Celebrate with Zewar'}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-espresso/75 leading-relaxed max-w-sm mx-auto">
            {popupBody ||
              'May your festive celebrations sparkle with eternal light and joyous heirlooms. Discover bespoke packaging and curated festive edits.'}
          </p>
        </div>

        {/* Feature highlight */}
        <div className="p-3 bg-sand/40 border border-sand-border/70 rounded-[3px] text-xs text-espresso/80 space-y-0.5">
          <p className="font-semibold text-espresso">Complimentary Festive Gift Box</p>
          <p className="text-[11px] text-espresso/60">
            Hand-wrapped in signature suede keepsake pouches with gold wax seal.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={handleCta}
            className="w-full py-3 bg-espresso hover:bg-espresso-light text-ivory font-semibold text-xs uppercase tracking-widest rounded-[2px] transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span>{popupCtaText || 'Explore Diwali Edits'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-champagne" />
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="text-xs text-espresso/50 hover:text-espresso transition-colors font-sans block mx-auto underline underline-offset-2"
          >
            Continue browsing boutique
          </button>
        </div>
      </div>
    </Modal>
  );
};
