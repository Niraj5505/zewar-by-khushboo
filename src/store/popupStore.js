import { create } from 'zustand';

const STORAGE_KEY = 'zewar.popups';
const SESSION_PROMO_KEY = 'zewar.session.promo.shown';

// Load initial seen record from localStorage
const getStoredSeen = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error('Failed reading popups from localStorage', err);
    return {};
  }
};

export const usePopupStore = create((set, get) => ({
  activePopup: null,
  popupProps: {},
  seen: getStoredSeen(),

  openPopup: (name, props = {}) => {
    // If it's a promotional popup (welcome, newsletter, exitIntent, promo), enforce frequency cap per session
    const isPromo = ['welcome', 'newsletter', 'exitIntent', 'promo'].includes(name);
    if (isPromo) {
      const alreadyShownThisSession = sessionStorage.getItem(SESSION_PROMO_KEY);
      if (alreadyShownThisSession && !props.force) {
        return; // Frequency cap: max one promotional popup per session
      }
    }

    // Never stack: close current and open new
    set({
      activePopup: name,
      popupProps: props,
    });

    if (isPromo) {
      sessionStorage.setItem(SESSION_PROMO_KEY, 'true');
    }
  },

  closePopup: () => {
    set({
      activePopup: null,
      popupProps: {},
    });
  },

  hasSeen: (key) => {
    return Boolean(get().seen[key]);
  },

  markSeen: (key) => {
    const updated = { ...get().seen, [key]: true };
    set({ seen: updated });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error('Failed saving seen popup to localStorage', err);
    }
  },

  resetAllSeen: () => {
    set({ seen: {} });
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SESSION_PROMO_KEY);
  },
}));
