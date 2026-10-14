import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BRAND } from '../lib/brand';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [
        // Seed with items matching the mockup demonstration
        {
          id: "prod-1",
          slug: "pearl-bloom-earrings",
          name: "Pearl Bloom Earrings",
          pricePaise: 149900,
          compareAtPricePaise: 199900,
          image: "/images/pearl-bloom-earrings.jpg",
          quantity: 1,
          variant: "Gold / Pearl",
          maxStock: 14,
        },
        {
          id: "prod-3",
          slug: "floral-kundan-bracelet",
          name: "Floral Kundan Bracelet",
          pricePaise: 199900,
          compareAtPricePaise: 259900,
          image: "/images/floral-kundan-bracelet.jpg",
          quantity: 1,
          variant: "Size 2.6 (Medium)",
          maxStock: 11,
        }
      ],
      appliedCoupon: null,
      couponDiscountPercent: 0,

      addItem: (product, quantity = 1, variant = "Standard") => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.id === product.id && item.variant === variant
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            const newQty = Math.min(
              updated[existingIndex].quantity + quantity,
              product.stock || 20
            );
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: newQty,
            };
            return { items: updated };
          }

          return {
            items: [
              ...state.items,
              {
                id: product.id,
                slug: product.slug,
                name: product.name,
                pricePaise: product.pricePaise,
                compareAtPricePaise: product.compareAtPricePaise || product.pricePaise,
                image: product.images?.[0] || "/images/pearl-bloom-earrings.jpg",
                quantity: Math.min(quantity, product.stock || 20),
                variant: variant,
                maxStock: product.stock || 20,
              },
            ],
          };
        });
      },

      removeItem: (id, variant) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && (!variant || item.variant === variant))
          ),
        }));
      },

      updateQuantity: (id, quantity, variant) => {
        if (quantity <= 0) {
          get().removeItem(id, variant);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (item.id === id && (!variant || item.variant === variant)) {
              const safeQty = Math.min(quantity, item.maxStock || 20);
              return { ...item, quantity: safeQty };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ items: [], appliedCoupon: null, couponDiscountPercent: 0 }),

      applyCoupon: (code) => {
        const cleanCode = code?.trim().toUpperCase();
        if (cleanCode === 'ZEWAR10' || cleanCode === 'DIWALI10') {
          set({ appliedCoupon: cleanCode, couponDiscountPercent: 10 });
          return { success: true, message: '10% festive discount applied!' };
        } else if (cleanCode === 'ROYAL15' || cleanCode === 'DIWALI15') {
          set({ appliedCoupon: cleanCode, couponDiscountPercent: 15 });
          return { success: true, message: '15% Royal festive discount applied!' };
        } else if (cleanCode === 'FIRST500') {
          set({ appliedCoupon: 'FIRST500', couponDiscountPercent: 12 });
          return { success: true, message: 'First order discount applied!' };
        }
        return { success: false, message: 'Invalid coupon code. Try DIWALI10 or ZEWAR10' };
      },

      removeCoupon: () => set({ appliedCoupon: null, couponDiscountPercent: 0 }),

      // Calculators
      getSubtotalPaise: () => {
        return get().items.reduce(
          (acc, item) => acc + item.pricePaise * item.quantity,
          0
        );
      },

      getDiscountPaise: () => {
        const subtotal = get().getSubtotalPaise();
        const percent = get().couponDiscountPercent;
        if (!percent || percent <= 0) return 0;
        return Math.round((subtotal * percent) / 100);
      },

      getShippingPaise: () => {
        const subtotal = get().getSubtotalPaise();
        if (subtotal === 0) return 0;
        if (subtotal >= BRAND.freeShippingThresholdPaise) return 0;
        return BRAND.flatShippingFeePaise;
      },

      getTotalPaise: () => {
        const subtotal = get().getSubtotalPaise();
        const discount = get().getDiscountPaise();
        const shipping = get().getShippingPaise();
        return Math.max(0, subtotal - discount + shipping);
      },

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'zewar-cart-v1',
    }
  )
);
