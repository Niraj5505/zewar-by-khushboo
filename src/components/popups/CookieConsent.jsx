import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { POPUP_CONFIG } from '../../lib/popupConfig';

export const CookieConsent = () => {
  const [consent, setConsent] = useLocalStorage(`zewar.cookies.${POPUP_CONFIG.cookie.version}`, null);
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [prefs, setPrefs] = useState({
    necessary: true,
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    // Show banner after brief mount if no consent decision is stored yet
    if (consent === null) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, [consent]);

  if (!isVisible || consent !== null) return null;

  const handleAcceptAll = () => {
    setConsent({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() });
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    setConsent({ necessary: true, analytics: false, marketing: false, timestamp: Date.now() });
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    setConsent({ ...prefs, necessary: true, timestamp: Date.now() });
    setIsVisible(false);
    setShowPreferences(false);
  };

  return (
    <>
      {/* Bottom Sticky Cookie Banner */}
      <div
        role="region"
        aria-label="Cookie consent banner"
        className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-5 bg-ivory/98 backdrop-blur-md border-t border-espresso/20 shadow-2xl animate-in slide-in-from-bottom duration-300"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3 max-w-3xl">
            <Cookie className="w-5 h-5 text-champagne-dark mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <p className="text-xs sm:text-sm font-medium text-espresso">
                We value your privacy and bespoke shopping experience.
              </p>
              <p className="text-[11px] sm:text-xs text-espresso/70 leading-relaxed font-sans">
                Zewar by Khushboo utilizes cookies to personalize product recommendations, remember items in your cart, and maintain secure payments.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={() => setShowPreferences(true)}
              className="text-xs text-espresso/70 hover:text-espresso underline font-medium px-2 py-1"
            >
              Customize
            </button>

            <button
              type="button"
              onClick={handleRejectNonEssential}
              className="px-4 py-2 bg-brandWhite border border-espresso/25 text-espresso hover:bg-sand/30 text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
            >
              Reject Non-Essential
            </button>

            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-5 py-2 bg-[#C6A15B] hover:bg-[#A8843F] text-[#30251F] text-xs font-bold uppercase tracking-wider rounded-[2px] transition-colors shadow-sm"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-espresso/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-ivory border border-espresso/20 rounded-[3px] p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-espresso/10 pb-3">
              <h3 className="font-serif text-lg font-medium text-espresso">Cookie Preferences</h3>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="text-espresso/60 hover:text-espresso p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-2.5 bg-sand/20 rounded-[2px]">
                <div>
                  <span className="font-bold text-espresso block">Essential & Security</span>
                  <span className="text-espresso/60 text-[11px]">Necessary for cart persistence and Razorpay checkout.</span>
                </div>
                <input type="checkbox" checked disabled className="accent-champagne" />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-sand/20 rounded-[2px]">
                <div>
                  <span className="font-bold text-espresso block">Analytics & Performance</span>
                  <span className="text-espresso/60 text-[11px]">Helps us analyze traffic and refine site navigation.</span>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.analytics}
                  onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
                  className="accent-champagne"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 bg-sand/20 rounded-[2px]">
                <div>
                  <span className="font-bold text-espresso block">Marketing & Recommendations</span>
                  <span className="text-espresso/60 text-[11px]">Enables tailor-made promotions and bridal styling alerts.</span>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.marketing}
                  onChange={(e) => setPrefs({ ...prefs, marketing: e.target.checked })}
                  className="accent-champagne"
                />
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-espresso/10">
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 border border-espresso/20 text-xs font-semibold rounded-[2px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-5 py-2 bg-espresso text-ivory text-xs font-semibold uppercase tracking-wider rounded-[2px]"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
