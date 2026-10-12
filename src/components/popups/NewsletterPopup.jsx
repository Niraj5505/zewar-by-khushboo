import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useShowOnce } from '../../hooks/useShowOnce';
import { POPUP_CONFIG } from '../../lib/popupConfig';

export const NewsletterPopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { markSeen } = useShowOnce('newsletter', POPUP_CONFIG.newsletter.version);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSuccess(true);
    markSeen();
  };

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
      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[360px]">
        {/* Left Editorial Image (5 cols) */}
        <div className="hidden md:block md:col-span-5 relative bg-sand overflow-hidden">
          <img
            src="/images/hero-jewellery.jpg"
            alt="Handcrafted Kundan Jewellery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-espresso/20" />
        </div>

        {/* Right Form Content (7 cols) */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center space-y-4">
          <span className="eyebrow text-champagne-dark">Private Salon</span>
          
          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl font-medium text-espresso leading-snug">
              Jewellery Stories & Private Previews
            </h2>
            <p className="text-xs text-espresso/70 leading-relaxed font-sans">
              Subscribe to receive invitations to private festive collection drops, styling notes, and insider privileges.
            </p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full text-xs px-3.5 py-3 bg-brandWhite text-espresso placeholder:text-espresso/40 border border-espresso/20 rounded-[2px] focus:outline-none focus:border-champagne"
              />

              <button
                type="submit"
                className="w-full py-3 bg-espresso text-ivory text-xs uppercase tracking-widest font-semibold rounded-[2px] hover:bg-espresso-light transition-colors flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5 text-champagne" />
              </button>

              <p className="text-[10px] text-espresso/50 text-center">
                We respect your privacy. Unsubscribe anytime with one click.
              </p>
            </form>
          ) : (
            <div className="py-6 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
              <p className="font-serif text-lg font-medium text-espresso">
                You're on the Guestlist
              </p>
              <p className="text-xs text-espresso/70 max-w-xs mx-auto">
                Thank you for joining Zewar by Khushboo. Watch your inbox for curations and private releases.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-6 py-2 bg-champagne text-espresso text-xs font-semibold uppercase tracking-wider rounded-[2px] hover:bg-champagne-hover"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
