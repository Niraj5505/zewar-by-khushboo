import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePopupStore } from '../../store/popupStore';
import { useExitIntent } from '../../hooks/useExitIntent';
import { POPUP_CONFIG } from '../../lib/popupConfig';

// Popups
import { WelcomeOfferPopup } from './WelcomeOfferPopup';
import { NewsletterPopup } from './NewsletterPopup';
import { ExitIntentPopup } from './ExitIntentPopup';
import { QuickViewModal } from './QuickViewModal';
import { SizeGuideModal } from './SizeGuideModal';
import { ImageLightbox } from './ImageLightbox';
import { BackInStockModal } from './BackInStockModal';
import { LoginModal } from './LoginModal';
import { CartDrawer } from './CartDrawer';
import { PromoModal } from './PromoModal';
import { CookieConsent } from './CookieConsent';
import { FloatingSupport } from './FloatingSupport';

export const PopupRoot = () => {
  const location = useLocation();
  const { activePopup, popupProps, closePopup, openPopup, hasSeen } = usePopupStore();

  const isCheckoutOrCart = ['/checkout', '/cart'].includes(location.pathname);
  const isDevPage = location.pathname.startsWith('/dev');

  // 1. Welcome Offer Trigger: 12s on site OR scroll >= 50%
  useEffect(() => {
    if (isCheckoutOrCart || isDevPage) return;
    if (hasSeen(`welcome.${POPUP_CONFIG.welcome.version}`)) return;

    let timer = setTimeout(() => {
      if (!usePopupStore.getState().activePopup) {
        openPopup('welcome');
      }
    }, POPUP_CONFIG.welcome.delay);

    const handleScroll = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal <= 0) return;
      const scrollPercent = window.scrollY / scrollTotal;

      if (scrollPercent >= POPUP_CONFIG.welcome.scrollTrigger) {
        if (!usePopupStore.getState().activePopup && !hasSeen(`welcome.${POPUP_CONFIG.welcome.version}`)) {
          openPopup('welcome');
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, hasSeen, isCheckoutOrCart, isDevPage, openPopup]);

  // 2. Newsletter Trigger: 45s dwell (if welcome was seen/ignored)
  useEffect(() => {
    if (isCheckoutOrCart || isDevPage) return;
    if (hasSeen(`newsletter.${POPUP_CONFIG.newsletter.version}`)) return;

    const timer = setTimeout(() => {
      // Only fire if welcome was seen and no popup is currently open
      const welcomeSeen = hasSeen(`welcome.${POPUP_CONFIG.welcome.version}`);
      if (welcomeSeen && !usePopupStore.getState().activePopup) {
        openPopup('newsletter');
      }
    }, POPUP_CONFIG.newsletter.delay);

    return () => clearTimeout(timer);
  }, [location.pathname, hasSeen, isCheckoutOrCart, isDevPage, openPopup]);

  // 3. Exit Intent Trigger: Mouseleave / popstate
  useExitIntent(() => {
    if (isCheckoutOrCart || isDevPage) return;

    // Check if exitIntent or newsletter was already shown
    const exitSeen = hasSeen(`exitIntent.${POPUP_CONFIG.exitIntent.version}`);
    const newsletterSeen = hasSeen(`newsletter.${POPUP_CONFIG.newsletter.version}`);

    if (!exitSeen && !newsletterSeen && !usePopupStore.getState().activePopup) {
      openPopup('exitIntent');
    }
  }, !isCheckoutOrCart && !isDevPage);

  return (
    <>
      {/* 1. Welcome Offer */}
      <WelcomeOfferPopup
        isOpen={activePopup === 'welcome'}
        onClose={closePopup}
        {...popupProps}
      />

      {/* 2. Newsletter */}
      <NewsletterPopup
        isOpen={activePopup === 'newsletter'}
        onClose={closePopup}
        {...popupProps}
      />

      {/* 3. Exit Intent */}
      <ExitIntentPopup
        isOpen={activePopup === 'exitIntent'}
        onClose={closePopup}
        {...popupProps}
      />

      {/* 4. Quick View */}
      <QuickViewModal
        isOpen={activePopup === 'quickview'}
        onClose={closePopup}
        product={popupProps?.product}
        {...popupProps}
      />

      {/* 5. Size Guide */}
      <SizeGuideModal
        isOpen={activePopup === 'sizeguide'}
        onClose={closePopup}
        {...popupProps}
      />

      {/* 6. Image Lightbox */}
      <ImageLightbox
        isOpen={activePopup === 'lightbox'}
        onClose={closePopup}
        images={popupProps?.images}
        initialIndex={popupProps?.initialIndex || 0}
      />

      {/* 7. Back In Stock */}
      <BackInStockModal
        isOpen={activePopup === 'backInStock'}
        onClose={closePopup}
        product={popupProps?.product}
        {...popupProps}
      />

      {/* 8. Patron Login / Auth Modal */}
      <LoginModal
        isOpen={activePopup === 'login'}
        onClose={closePopup}
        onSuccess={popupProps?.onSuccess}
      />

      {/* 9. Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={activePopup === 'cart'}
        onClose={closePopup}
      />

      {/* 10. Admin Promo Modal */}
      <PromoModal
        isOpen={activePopup === 'promo'}
        onClose={closePopup}
        {...popupProps}
      />

      {/* Persistent Non-Modal Overlays */}
      <CookieConsent />
      <FloatingSupport />
    </>
  );
};
