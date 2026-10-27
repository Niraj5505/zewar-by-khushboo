import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: ["prod-1", "prod-4"], // seeded with 2 favorites

      isInWishlist: (productId) => {
        return get().items.includes(productId);
      },

      toggleWishlist: (productId) => {
        set((state) => {
          const exists = state.items.includes(productId);
          if (exists) {
            return { items: state.items.filter((id) => id !== productId) };
          }
          return { items: [...state.items, productId] };
        });
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter((id) => id !== productId),
        }));
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'zewar-wishlist-v1',
    }
  )
);
