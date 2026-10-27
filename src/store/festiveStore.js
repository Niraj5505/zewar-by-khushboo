import { create } from 'zustand';

const BANNER_STORAGE_KEY = 'zewar.diwali.banner.v1';
const POPUP_STORAGE_KEY = 'zewar.diwali.popup.v1';
const OPTOUT_STORAGE_KEY = 'zewar.diwali.optout';
const PREFS_STORAGE_KEY = 'zewar.diwali.prefs.v2';
const SETTINGS_STORAGE_KEY = 'zewar.diwali.settings.v2';

const getStoredBool = (key, defaultVal = false) => {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? val === 'true' : defaultVal;
  } catch {
    return defaultVal;
  }
};

const getStoredJson = (key, defaultVal = {}) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...defaultVal, ...JSON.parse(raw) } : defaultVal;
  } catch {
    return defaultVal;
  }
};

const defaultPrefs = {
  ambient: true,     // garland, rangoli, floating diyas
  particles: true,   // sparkles, floating lamps
  heroScene: true,   // hero lighting + optional 3D
  animations: true,  // shimmer, glow, transitions
  confetti: true,    // burst on add-to-cart / order placed
  ambience: true,    // calm background music (plays automatically on enter)
};

const storedSettings = getStoredJson(SETTINGS_STORAGE_KEY, {});
const storedPrefs = getStoredJson(PREFS_STORAGE_KEY, defaultPrefs);

export const useFestiveStore = create((set, get) => ({
  enabled: storedSettings.enabled !== undefined ? storedSettings.enabled : true,
  mode: storedSettings.mode || 'auto', // 'auto' | 'on' | 'off'
  userOptOut: getStoredBool(OPTOUT_STORAGE_KEY, false),
  bannerDismissed: getStoredBool(BANNER_STORAGE_KEY, false),
  popupSeen: getStoredBool(POPUP_STORAGE_KEY, false),

  // Date window
  startDate: storedSettings.startDate || '2026-10-14',
  endDate: storedSettings.endDate || '2026-11-05',

  // Granular user preferences
  prefs: storedPrefs,

  // Marketing & Content Fields
  bannerMessage: storedSettings.bannerMessage || 'Diwali Gifting — Complimentary Gift Wrapping on All Orders',
  bannerLinkText: storedSettings.bannerLinkText || 'Explore Gifts',
  bannerLinkUrl: storedSettings.bannerLinkUrl || '/shop',

  giftWrappingEnabled: storedSettings.giftWrappingEnabled !== undefined ? storedSettings.giftWrappingEnabled : true,
  countdownEndDate: storedSettings.countdownEndDate || '', // optional, only if real offer

  giftingProductIds: storedSettings.giftingProductIds || ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-7'],

  storyTitle: storedSettings.storyTitle || 'Why We Celebrate Diwali at Zewar',
  storyText:
    storedSettings.storyText ||
    'Diwali represents the timeless triumph of radiance, honoring artisan traditions passed down through generations. At Zewar, our karigars hand-knot every seed pearl and hand-set each uncut polki stone with devotion, crafting heirlooms meant to illuminate your festive celebrations with ancestral warmth.',

  popupTitle: storedSettings.popupTitle || 'Celebrate with Zewar',
  popupBody:
    storedSettings.popupBody ||
    'May your festive celebrations sparkle with eternal light and joyous heirlooms. Discover bespoke packaging and curated festive edits.',
  popupCtaText: storedSettings.popupCtaText || 'Explore Diwali Edits',
  popupCtaUrl: storedSettings.popupCtaUrl || '/shop',
  popupImage: storedSettings.popupImage || '/images/hero-jewellery.jpg',

  // Actions
  setPref: (key, value) => {
    set((state) => {
      const updatedPrefs = { ...state.prefs, [key]: value };
      try {
        localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(updatedPrefs));
      } catch (e) {
        console.warn('Could not persist festive prefs', e);
      }
      return { prefs: updatedPrefs };
    });
  },

  resetPrefs: () => {
    set({ prefs: defaultPrefs });
    try {
      localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(defaultPrefs));
    } catch (e) {
      console.warn('Could not reset festive prefs', e);
    }
  },

  reduceAllMotion: () => {
    const reduced = {
      ambient: true,     // keep static decorations
      particles: false,
      heroScene: false,
      animations: false,
      confetti: false,
      ambience: false,
    };
    set({ prefs: reduced });
    try {
      localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(reduced));
    } catch (e) {
      console.warn('Could not persist reduced prefs', e);
    }
  },

  setEnabled: (enabled) => {
    set({ enabled });
    get().persistSettings();
  },

  setMode: (mode) => {
    set({ mode });
    get().persistSettings();
  },

  setUserOptOut: (userOptOut) => {
    set({ userOptOut });
    try {
      localStorage.setItem(OPTOUT_STORAGE_KEY, String(userOptOut));
    } catch (e) {
      console.warn('Could not persist user opt out', e);
    }
  },

  dismissBanner: () => {
    set({ bannerDismissed: true });
    try {
      localStorage.setItem(BANNER_STORAGE_KEY, 'true');
    } catch (e) {
      console.warn('Could not persist banner dismissal', e);
    }
  },

  resetBannerDismissal: () => {
    set({ bannerDismissed: false });
    try {
      localStorage.removeItem(BANNER_STORAGE_KEY);
    } catch (e) {
      console.warn('Could not reset banner dismissal', e);
    }
  },

  markPopupSeen: () => {
    set({ popupSeen: true });
    try {
      localStorage.setItem(POPUP_STORAGE_KEY, 'true');
    } catch (e) {
      console.warn('Could not persist popup status', e);
    }
  },

  resetPopupSeen: () => {
    set({ popupSeen: false });
    try {
      localStorage.removeItem(POPUP_STORAGE_KEY);
    } catch (e) {
      console.warn('Could not reset popup status', e);
    }
  },

  updateFestiveSettings: (newSettings) => {
    set((state) => ({ ...state, ...newSettings }));
    get().persistSettings();
  },

  persistSettings: () => {
    try {
      const state = get();
      const payload = {
        enabled: state.enabled,
        mode: state.mode,
        startDate: state.startDate,
        endDate: state.endDate,
        bannerMessage: state.bannerMessage,
        bannerLinkText: state.bannerLinkText,
        bannerLinkUrl: state.bannerLinkUrl,
        giftWrappingEnabled: state.giftWrappingEnabled,
        countdownEndDate: state.countdownEndDate,
        giftingProductIds: state.giftingProductIds,
        storyTitle: state.storyTitle,
        storyText: state.storyText,
        popupTitle: state.popupTitle,
        popupBody: state.popupBody,
        popupCtaText: state.popupCtaText,
        popupCtaUrl: state.popupCtaUrl,
        popupImage: state.popupImage,
      };
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Could not persist festive settings', e);
    }
  },

  isActive: (overridePreview = false) => {
    if (overridePreview) return true;

    // Accessibility guard: respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Still allows static ambient elements if enabled, but animations/particles are off
    }

    const { enabled, mode, userOptOut, startDate, endDate } = get();

    if (userOptOut) return false;
    if (!enabled || mode === 'off') return false;
    if (mode === 'on') return true;

    // Auto mode
    try {
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
      return today >= startDate && today <= endDate;
    } catch {
      return false;
    }
  },
}));
