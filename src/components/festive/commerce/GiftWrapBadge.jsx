import React, { useState } from 'react';
import { Gift, Sparkles, X, Check } from 'lucide-react';
import { Modal } from '../../ui/Modal';
import { DiyaIcon } from '../DiyaIcon';
import { useFestiveMode } from '../../../hooks/useFestiveMode';

export const GiftWrapBadge = ({ className = "" }) => {
  const { isActive, giftWrappingEnabled } = useFestiveMode();
  const [modalOpen, setModalOpen] = useState(false);

  if (!isActive || !giftWrappingEnabled) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-sand/60 hover:bg-sand text-espresso border border-sand-border/80 rounded-[2px] text-[11px] font-medium transition-colors ${className}`}
        title="View complimentary Diwali gift wrapping details"
      >
        <DiyaIcon className="w-3.5 h-3.5 text-champagne-dark" />
        <span className="font-semibold text-espresso">Complimentary Festive Gift Wrapping</span>
        <span className="text-champagne-dark underline ml-0.5">Info</span>
      </button>

      {modalOpen && (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          size="sm"
          title="Diwali Gift Packaging"
          className="p-6 bg-ivory border border-sand-border rounded-[4px] space-y-4"
        >
          <div className="flex items-center gap-2 pb-3 border-b border-sand-border">
            <div className="w-8 h-8 rounded-full bg-sand/60 flex items-center justify-center">
              <Gift className="w-4 h-4 text-champagne-dark" />
            </div>
            <div>
              <h3 className="font-serif text-base font-medium text-espresso">
                Complimentary Festive Gifting
              </h3>
              <p className="text-[11px] text-espresso/60">
                Crafted for Diwali celebrations and treasured heirlooms.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-espresso/80 leading-relaxed">
            <div className="p-3 bg-white border border-sand-border rounded-[3px] space-y-2">
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-champagne-dark mt-0.5 flex-shrink-0" />
                <span><strong>Signature Suede Keepsake Box:</strong> Protective lined travel case with gold foil monogram.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-champagne-dark mt-0.5 flex-shrink-0" />
                <span><strong>Marigold Zari Ribbon:</strong> Hand-tied golden metallic ribbon and wax seal.</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-champagne-dark mt-0.5 flex-shrink-0" />
                <span><strong>Personalized Calligraphy Note:</strong> Complimentary handwritten note for your recipient.</span>
              </div>
            </div>

            <p className="text-[11px] text-espresso/60 italic text-center">
              Automatically included with every order during the Diwali festive window.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="w-full py-2 bg-espresso text-ivory text-xs uppercase tracking-wider font-semibold rounded-[2px]"
            >
              Understood
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
