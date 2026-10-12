import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: {
        id: "usr-guest-001",
        name: "Khushboo Guest",
        email: "khushboo.client@example.com",
        phone: "+91 9876543210",
        isLoggedIn: false,
      },
      addresses: [
        {
          id: "addr-1",
          isDefault: true,
          name: "Khushboo Shah",
          street: "Flat 402, Royal Palms Heights, Linking Road",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400050",
          phone: "9876543210",
        }
      ],

      login: (email, password) => {
        set({
          user: {
            id: "usr-101",
            name: email.split('@')[0],
            email: email,
            phone: "+91 9876543210",
            isLoggedIn: true,
          }
        });
        return { success: true };
      },

      logout: () => {
        set({
          user: {
            id: null,
            name: "",
            email: "",
            phone: "",
            isLoggedIn: false,
          }
        });
      },

      addAddress: (address) => {
        set((state) => ({
          addresses: [...state.addresses, { ...address, id: `addr-${Date.now()}` }],
        }));
      },
    }),
    {
      name: 'zewar-auth-v1',
    }
  )
);
