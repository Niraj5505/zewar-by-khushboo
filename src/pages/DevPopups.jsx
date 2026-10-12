import React from 'react';
import { Sparkles, Eye, Ruler, Image, Bell, User, ShoppingBag, Megaphone, CheckCircle2, RotateCcw, AlertCircle, Info } from 'lucide-react';
import { usePopupStore } from '../store/popupStore';
import { toast } from '../store/toastStore';
import { PRODUCTS } from '../data/products';

export const DevPopups = () => {
  const { openPopup, resetAllSeen, seen } = usePopupStore();

  const sampleProduct = PRODUCTS[0]; // Pearl Bloom Earrings

  const handleResetStorage = () => {
    resetAllSeen();
    localStorage.removeItem('zewar.cookies.v1');
    toast.success('All popup frequency caps and cookies reset!');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="border-b border-sand-border pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-champagne/20 border border-champagne/40 rounded-full text-espresso text-[11px] font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-champagne-dark" />
          <span>Interactive QA Laboratory</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-espresso">
          Popup, Modal & Overlay System
        </h1>
        <p className="text-xs sm:text-sm text-espresso/70 max-w-2xl font-sans">
          Test and verify every popup, modal primitive, slide-out drawer, and toast row built for Zewar by Khushboo. Each trigger respects accessibility, ESC dismiss, and WCAG AA contrast.
        </p>
      </div>

      {/* Control Status Box */}
      <div className="p-5 bg-brandWhite border border-sand-border rounded-[3px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-serif text-sm font-semibold text-espresso">
            Frequency Cap & Persistence Engine
          </h3>
          <p className="text-xs text-espresso/60 font-sans">
            Currently marked as seen: <strong className="font-mono text-espresso">{Object.keys(seen).length ? Object.keys(seen).join(', ') : 'None (Fresh Visitor)'}</strong>
          </p>
        </div>
        <button
          type="button"
          onClick={handleResetStorage}
          className="inline-flex items-center gap-2 px-4 py-2 bg-sand text-espresso hover:bg-sand-border text-xs uppercase tracking-wider font-semibold rounded-[2px] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Seen History</span>
        </button>
      </div>

      {/* Grid of Popup Triggers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* 1. Welcome Offer */}
        <div className="p-5 bg-brandWhite border border-sand-border rounded-[3px] flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <span className="eyebrow text-champagne-dark">Automatic / Manual</span>
            <h3 className="font-serif text-base font-semibold text-espresso">1. Welcome Offer Popup</h3>
            <p className="text-xs text-espresso/70 font-sans">
              Offers 10% maiden discount with copyable code ZEWAR10. Auto-triggers after 12s or 50% scroll.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openPopup('welcome', { force: true })}
            className="w-full py-2.5 bg-espresso text-ivory text-xs uppercase tracking-wider font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
          >
            Trigger Welcome Popup
          </button>
        </div>

        {/* 2. Newsletter */}
        <div className="p-5 bg-brandWhite border border-sand-border rounded-[3px] flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <span className="eyebrow text-champagne-dark">2-Column Editorial</span>
            <h3 className="font-serif text-base font-semibold text-espresso">2. Newsletter Popup</h3>
            <p className="text-xs text-espresso/70 font-sans">
              Editorial photography left, private salon invitation right. Triggered after 45s dwell or on exit.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openPopup('newsletter', { force: true })}
            className="w-full py-2.5 bg-espresso text-ivory text-xs uppercase tracking-wider font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
          >
            Trigger Newsletter
          </button>
        </div>

        {/* 3. Exit Intent */}
        <div className="p-5 bg-brandWhite border border-sand-border rounded-[3px] flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <span className="eyebrow text-champagne-dark">Exit Detection</span>
            <h3 className="font-serif text-base font-semibold text-espresso">3. Exit Intent Popup</h3>
            <p className="text-xs text-espresso/70 font-sans">
              Fires when cursor leaves top viewport or on mobile back button. Offers free shipping or 5% code ROYAL05.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openPopup('exitIntent', { force: true })}
            className="w-full py-2.5 bg-espresso text-ivory text-xs uppercase tracking-wider font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
          >
            Trigger Exit Intent
          </button>
        </div>

        {/* 4. Quick View */}
        <div className="p-5 bg-brandWhite border border-sand-border rounded-[3px] flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <span className="eyebrow text-champagne-dark">Catalog Action</span>
            <h3 className="font-serif text-base font-semibold text-espresso">4. Quick View Modal</h3>
            <p className="text-xs text-espresso/70 font-sans">
              900px wide modal with gallery, sizing, stock limits, and auto-open of CartDrawer upon adding.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openPopup('quickview', { product: sampleProduct })}
            className="w-full py-2.5 bg-[#C6A15B] hover:bg-[#A8843F] text-[#30251F] text-xs uppercase tracking-wider font-bold rounded-[2px] transition-colors"
          >
            Open Quick View (Pearl Bloom)
          </button>
        </div>

        {/* 5. Size Guide */}
        <div className="p-5 bg-brandWhite border border-sand-border rounded-[3px] flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <span className="eyebrow text-champagne-dark">PDP Utility</span>
            <h3 className="font-serif text-base font-semibold text-espresso">5. Size Guide Modal</h3>
            <p className="text-xs text-espresso/70 font-sans">
              Tabbed sizing charts for Indian, UK, and US rings, 2.4-2.8 bangles, and necklace lengths.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openPopup('sizeguide')}
            className="w-full py-2.5 bg-espresso text-ivory text-xs uppercase tracking-wider font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
          >
            Open Size Guide
          </button>
        </div>

        {/* 6. Image Lightbox */}
        <div className="p-5 bg-brandWhite border border-sand-border rounded-[3px] flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <span className="eyebrow text-champagne-dark">High-Resolution Zoom</span>
            <h3 className="font-serif text-base font-semibold text-espresso">6. Image Lightbox</h3>
            <p className="text-xs text-espresso/70 font-sans">
              Full-screen dark backdrop (95% espresso), keyboard arrow navigation, and bottom thumbnail strip.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openPopup('lightbox', { images: sampleProduct.images, initialIndex: 0 })}
            className="w-full py-2.5 bg-espresso text-ivory text-xs uppercase tracking-wider font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
          >
            Open Image Lightbox
          </button>
        </div>

        {/* 7. Back In Stock */}
        <div className="p-5 bg-brandWhite border border-sand-border rounded-[3px] flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <span className="eyebrow text-champagne-dark">Inventory Lead Capture</span>
            <h3 className="font-serif text-base font-semibold text-espresso">7. Back In Stock Alert</h3>
            <p className="text-xs text-espresso/70 font-sans">
              Captures patron email and WhatsApp phone number with instant confirmation feedback.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openPopup('backInStock', { product: PRODUCTS[1] })}
            className="w-full py-2.5 bg-espresso text-ivory text-xs uppercase tracking-wider font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
          >
            Open Restock Modal
          </button>
        </div>

        {/* 8. Patron Login Modal */}
        <div className="p-5 bg-brandWhite border border-sand-border rounded-[3px] flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <span className="eyebrow text-champagne-dark">Authentication</span>
            <h3 className="font-serif text-base font-semibold text-espresso">8. Patron Login Modal</h3>
            <p className="text-xs text-espresso/70 font-sans">
              Login, Register, and Forgot Password tabs. Restores interrupted actions seamlessly on success.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openPopup('login', {
              onSuccess: () => toast.success('Login callback executed! Wishlist saved.')
            })}
            className="w-full py-2.5 bg-espresso text-ivory text-xs uppercase tracking-wider font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
          >
            Open Login Modal
          </button>
        </div>

        {/* 9. Cart Drawer */}
        <div className="p-5 bg-brandWhite border border-sand-border rounded-[3px] flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <span className="eyebrow text-champagne-dark">Slide-Out Sheet</span>
            <h3 className="font-serif text-base font-semibold text-espresso">9. Cart Drawer</h3>
            <p className="text-xs text-espresso/70 font-sans">
              Slides from right on desktop and bottom on mobile. Features free shipping progress bar.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openPopup('cart')}
            className="w-full py-2.5 bg-[#C6A15B] hover:bg-[#A8843F] text-[#30251F] text-xs uppercase tracking-wider font-bold rounded-[2px] transition-colors"
          >
            Slide Out Cart Drawer
          </button>
        </div>

        {/* 10. Admin Promo Modal */}
        <div className="p-5 bg-brandWhite border border-sand-border rounded-[3px] flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <span className="eyebrow text-champagne-dark">Marketing Drop</span>
            <h3 className="font-serif text-base font-semibold text-espresso">10. Admin Promo Modal</h3>
            <p className="text-xs text-espresso/70 font-sans">
              Admin-triggered festive drop with custom image, headline, and direct CTA link.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openPopup('promo', { force: true })}
            className="w-full py-2.5 bg-espresso text-ivory text-xs uppercase tracking-wider font-semibold rounded-[2px] hover:bg-espresso-light transition-colors"
          >
            Trigger Promo Modal
          </button>
        </div>

      </div>

      {/* Toast Notification Suite */}
      <div className="p-6 bg-brandWhite border border-sand-border rounded-[3px] space-y-4">
        <h3 className="font-serif text-lg font-semibold text-espresso">
          11. Global Toast Notifications
        </h3>
        <p className="text-xs text-espresso/70">
          Non-blocking toasts featuring thin champagne left accent, 4-second auto-dismiss, hover pause, and product thumbnail attachments.
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          <button
            type="button"
            onClick={() => toast.success("Added Pearl Bloom Earrings to bag", {
              product: sampleProduct,
              action: { label: "View bag", href: "/cart" }
            })}
            className="px-4 py-2 bg-emerald-800 text-ivory text-xs font-semibold uppercase tracking-wider rounded-[2px] hover:bg-emerald-900"
          >
            Success Toast (with Product & Link)
          </button>

          <button
            type="button"
            onClick={() => toast.error("Invalid coupon code. Try ZEWAR10")}
            className="px-4 py-2 bg-rose-800 text-ivory text-xs font-semibold uppercase tracking-wider rounded-[2px] hover:bg-rose-900"
          >
            Error Toast
          </button>

          <button
            type="button"
            onClick={() => toast.info("You've unlocked Free Pan-India Shipping above ₹999")}
            className="px-4 py-2 bg-espresso text-ivory text-xs font-semibold uppercase tracking-wider rounded-[2px] hover:bg-espresso-light"
          >
            Info Toast
          </button>
        </div>
      </div>

    </div>
  );
};
