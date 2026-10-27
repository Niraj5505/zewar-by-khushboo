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

      login: (emailOrPhone, password) => {
        const users = get().registeredUsers || [];
        const cleanIdentifier = emailOrPhone.trim().toLowerCase();

        // Find existing matching user
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
            isLoggedIn: true,
          };
        } else {
          // Allow seamless login for patrons with valid formatting
          const isEmail = cleanIdentifier.includes('@');
          authenticatedUser = {
            id: `usr-${Date.now()}`,
            name: isEmail ? cleanIdentifier.split('@')[0] : 'Valued Patron',
            email: isEmail ? cleanIdentifier : `${cleanIdentifier}@client.zewar.com`,
            phone: isEmail ? '+91 9876543210' : cleanIdentifier,
            isLoggedIn: true,
          };
          // Save to registered list
          set((state) => ({
            registeredUsers: [...state.registeredUsers, { ...authenticatedUser, password }],
          }));
        }

        set({ user: authenticatedUser });
        return { success: true, user: authenticatedUser };
      },

      register: ({ name, email, phone, password }) => {
        const users = get().registeredUsers || [];
        const cleanEmail = email.trim().toLowerCase();

        // Check if email already registered
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
          phone: phone ? phone.trim() : '+91 9876543210',
          password,
        };

        const sessionUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          isLoggedIn: true,
        };

        set((state) => ({
          registeredUsers: [...state.registeredUsers, newUser],
          user: sessionUser,
        }));

        return { success: true, user: sessionUser };
      },

      updateProfile: (updatedData) => {
        set((state) => {
          const updatedUser = { ...state.user, ...updatedData };
          const updatedUsers = state.registeredUsers.map((u) =>
            u.id === state.user?.id ? { ...u, ...updatedData } : u
          );
          return {
            user: updatedUser,
            registeredUsers: updatedUsers,
          };
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
      name: 'zewar-auth-v2',
    }
  )
);
