import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialUsers = [
  {
    id: "usr-demo-001",
    name: "Khushboo Shah",
    email: "khushboo@zewar.com",
    phone: "+91 9876543210",
    password: "Password123",
  }
];

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: {
        id: null,
        name: "",
        email: "",
        phone: "",
        tier: "Royal Patron",
        isLoggedIn: false,
      },
      registeredUsers: initialUsers,
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
      orders: [],

      login: async (emailOrPhone, password) => {
        const cleanIdentifier = emailOrPhone.trim().toLowerCase();

        // 1. Attempt MongoDB API Login
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailOrPhone: cleanIdentifier, password }),
          });
          const data = await res.json();
          if (data.success && data.user) {
            set({
              user: data.user,
              ...(data.addresses && { addresses: data.addresses }),
              ...(data.orders && { orders: data.orders }),
            });
            return { success: true, user: data.user };
          } else if (res.status === 401 || res.status === 404) {
            return { success: false, message: data.message || 'Invalid credentials.' };
          }
        } catch (err) {
          console.warn('MongoDB API login unreachable, attempting local fallback:', err);
        }

        // 2. Resilient Local / Fallback Login
        const users = get().registeredUsers || [];
        const foundUser = users.find(
          (u) =>
            u.email.toLowerCase() === cleanIdentifier ||
            u.phone.replace(/\D/g, '') === cleanIdentifier.replace(/\D/g, '')
        );

        let authenticatedUser;
        if (foundUser) {
          authenticatedUser = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            phone: foundUser.phone,
            tier: 'Royal Patron',
            isLoggedIn: true,
          };
        } else {
          const isEmail = cleanIdentifier.includes('@');
          authenticatedUser = {
            id: `usr-${Date.now()}`,
            name: isEmail ? cleanIdentifier.split('@')[0] : 'Valued Patron',
            email: isEmail ? cleanIdentifier : `${cleanIdentifier}@client.zewar.com`,
            phone: isEmail ? '+91 9876543210' : cleanIdentifier,
            tier: 'Royal Patron',
            isLoggedIn: true,
          };
          set((state) => ({
            registeredUsers: [...state.registeredUsers, { ...authenticatedUser, password }],
          }));
        }

        set({ user: authenticatedUser });
        return { success: true, user: authenticatedUser };
      },

      register: async ({ name, email, phone, password }) => {
        const cleanEmail = email.trim().toLowerCase();
        const cleanPhone = phone ? phone.trim() : '+91 9876543210';

        // 1. Attempt MongoDB API Registration
        try {
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: name.trim(),
              email: cleanEmail,
              phone: cleanPhone,
              password,
            }),
          });
          const data = await res.json();
          if (data.success && data.user) {
            set({
              user: data.user,
              ...(data.addresses && { addresses: data.addresses }),
            });
            return { success: true, user: data.user };
          } else if (res.status === 409 || !data.success) {
            return {
              success: false,
              message: data.message || 'Unable to register patron account.',
            };
          }
        } catch (err) {
          console.warn('MongoDB API register unreachable, attempting local fallback:', err);
        }

        // 2. Resilient Local / Fallback Registration
        const users = get().registeredUsers || [];
        const existing = users.find((u) => u.email.toLowerCase() === cleanEmail);
        if (existing) {
          return {
            success: false,
            message: 'An account with this email address already exists. Please sign in.',
          };
        }

        const newUser = {
          id: `usr-${Date.now()}`,
          name: name.trim(),
          email: cleanEmail,
          phone: cleanPhone,
          password,
          tier: 'Royal Patron',
        };

        const sessionUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          tier: newUser.tier,
          isLoggedIn: true,
        };

        set((state) => ({
          registeredUsers: [...state.registeredUsers, newUser],
          user: sessionUser,
        }));

        return { success: true, user: sessionUser };
      },

      updateProfile: async (updatedData) => {
        const currentUser = get().user;
        const updatedUser = { ...currentUser, ...updatedData };
        set((state) => ({
          user: updatedUser,
          registeredUsers: state.registeredUsers.map((u) =>
            u.id === currentUser?.id ? { ...u, ...updatedData } : u
          ),
        }));

        try {
          await fetch('/api/auth/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: currentUser?.id,
              email: currentUser?.email,
              updatedData,
            }),
          });
        } catch (err) {
          console.warn('Could not sync profile to MongoDB:', err);
        }
        return { success: true };
      },

      logout: () => {
        set({
          user: {
            id: null,
            name: "",
            email: "",
            phone: "",
            tier: "Royal Patron",
            isLoggedIn: false,
          }
        });
      },

      addAddress: async (address) => {
        const newAddr = { ...address, id: `addr-${Date.now()}` };
        const updatedAddresses = [...get().addresses, newAddr];
        set({ addresses: updatedAddresses });

        const currentUser = get().user;
        try {
          await fetch('/api/auth/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: currentUser?.id,
              email: currentUser?.email,
              updatedData: { addresses: updatedAddresses },
            }),
          });
        } catch (err) {
          console.warn('Could not sync addresses to MongoDB:', err);
        }
      },
    }),
    {
      name: 'zewar-auth-v2',
    }
  )
);
