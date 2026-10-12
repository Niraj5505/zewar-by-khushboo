import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useShowOnce } from '../../hooks/useShowOnce';
import { POPUP_CONFIG } from '../../lib/popupConfig';

export const PromoModal = ({
  isOpen,
  onClose,
  headline = 'Festive Heirloom Edition',
  subcopy = 'Curated royal uncut Kundan jewellery celebrating traditional heritage.',
  image = '/images/brand-story.jpg',
  ctaText = 'Explore Limited Edition',
  ctaHref = '/shop?filter=featured',
  badge = 'Limited Drop',
}) => {
  const { markSeen } = useShowOnce('promo', POPUP_CONFIG.promo?.version || 'v1');

  if (!headline) return null;

  const handleDismiss = () => {
    markSeen();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleDismiss}
      size="md"
      showClose={true}
      className="p-0 overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
        <div className="md:col-span-5 relative aspect-[4/5] md:aspect-auto bg-sand overflow-hidden">
          <img
            src={image}
            alt={headline}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent md:hidden" />
        </div>

        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <span className="eyebrow text-champagne-dark">{badge}</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-espresso leading-snug">
              {headline}
            </h2>
            <p className="text-xs sm:text-sm text-espresso/75 leading-relaxed font-sans">
              {subcopy}
            </p>
          </div>

          <div className="pt-3 space-y-2">
            <Link
              to={ctaHref}
              onClick={handleDismiss}
              className="w-full py-3.5 bg-[#C6A15B] hover:bg-[#A8843F] text-[#30251F] text-xs font-bold uppercase tracking-widest rounded-[2px] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={handleDismiss}
              className="w-full text-center text-[11px] text-espresso/50 hover:text-espresso underline pt-1"
            >
              Dismiss announcement
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
