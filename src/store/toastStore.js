import { create } from 'zustand';

export const useToastStore = create((set, get) => ({
  toasts: [],

  addToast: (message, options = {}) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast = {
      id,
      message,
      type: options.type || 'info', // 'success' | 'error' | 'info'
      product: options.product || null,
      action: options.action || null, // { label: string, href: string, onClick?: () => void }
      duration: options.duration || 4000,
      createdAt: Date.now(),
    };

    set((state) => {
      // Max 3 stacked, older ones discarded / shifted
      const current = [...state.toasts, newToast];
      if (current.length > 3) {
        return { toasts: current.slice(current.length - 3) };
      }
      return { toasts: current };
    });

    return id;
  },

  dismissToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearAll: () => set({ toasts: [] }),
}));

// Global toast helper object for easy calling: toast.success(...), toast.error(...), toast.info(...)
export const toast = {
  success: (message, options = {}) => {
    return useToastStore.getState().addToast(message, { ...options, type: 'success' });
  },
  error: (message, options = {}) => {
    return useToastStore.getState().addToast(message, { ...options, type: 'error' });
  },
  info: (message, options = {}) => {
    return useToastStore.getState().addToast(message, { ...options, type: 'info' });
  },
  dismiss: (id) => {
    useToastStore.getState().dismissToast(id);
  },
};
