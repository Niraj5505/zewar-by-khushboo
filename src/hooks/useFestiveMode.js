import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useFestiveStore } from '../store/festiveStore';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { useDeviceTier } from './useDeviceTier';

export const useFestiveMode = () => {
  const location = useLocation();
  const store = useFestiveStore();
  const reducedMotion = usePrefersReducedMotion();
  const deviceTier = useDeviceTier();

  // Check URL query param for festive=preview
  const isPreview = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('festive') === 'preview';
  }, [location.search]);

  // Overall active flag
  const isActive = useMemo(() => {
    return store.isActive(isPreview);
  }, [isPreview, store.enabled, store.mode, store.userOptOut, store.startDate, store.endDate]);

  // Granular preference checks that factor in reduced motion
  const canShowAmbient = isActive && store.prefs.ambient;
  const canShowParticles = isActive && !reducedMotion && store.prefs.particles;
  const canShowHeroScene = isActive && store.prefs.heroScene;
  const canShowAnimations = isActive && !reducedMotion && store.prefs.animations;
  const canShowConfetti = isActive && !reducedMotion && store.prefs.confetti;
  const canShowAmbience = isActive && store.prefs.ambience;

  return {
    isActive,
    isPreview,
    reducedMotion,
    deviceTier,
    prefs: store.prefs,
    setPref: store.setPref,
    resetPrefs: store.resetPrefs,
    reduceAllMotion: store.reduceAllMotion,
    canShowAmbient,
    canShowParticles,
    canShowHeroScene,
    canShowAnimations,
    canShowConfetti,
    canShowAmbience,

    enabled: store.enabled,
    mode: store.mode,
    userOptOut: store.userOptOut,
    bannerDismissed: store.bannerDismissed,
    popupSeen: store.popupSeen,
    startDate: store.startDate,
    endDate: store.endDate,
    bannerMessage: store.bannerMessage,
    bannerLinkText: store.bannerLinkText,
    bannerLinkUrl: store.bannerLinkUrl,
    giftWrappingEnabled: store.giftWrappingEnabled,
    countdownEndDate: store.countdownEndDate,
    giftingProductIds: store.giftingProductIds,
    storyTitle: store.storyTitle,
    storyText: store.storyText,
    popupTitle: store.popupTitle,
    popupBody: store.popupBody,
    popupCtaText: store.popupCtaText,
    popupCtaUrl: store.popupCtaUrl,
    popupImage: store.popupImage,

    setUserOptOut: store.setUserOptOut,
    dismissBanner: store.dismissBanner,
    resetBannerDismissal: store.resetBannerDismissal,
    markPopupSeen: store.markPopupSeen,
    resetPopupSeen: store.resetPopupSeen,
    setEnabled: store.setEnabled,
    setMode: store.setMode,
    updateFestiveSettings: store.updateFestiveSettings,
  };
};
