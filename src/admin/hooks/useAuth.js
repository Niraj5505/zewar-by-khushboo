import { useCmsStore } from '../lib/cmsStore';

export const useAuth = () => {
  const currentAdmin = useCmsStore((s) => s.currentAdmin);
  const loginAdmin = useCmsStore((s) => s.loginAdmin);
  const logoutAdmin = useCmsStore((s) => s.logoutAdmin);
  const switchRole = useCmsStore((s) => s.switchRole);

  return {
    user: currentAdmin,
    isAuthenticated: Boolean(currentAdmin?.token),
    role: currentAdmin?.role || null,
    isSuperAdmin: currentAdmin?.role === 'SUPER_ADMIN',
    isAdmin: currentAdmin?.role === 'ADMIN' || currentAdmin?.role === 'SUPER_ADMIN',
    isStaff: currentAdmin?.role === 'STAFF',
    login: loginAdmin,
    logout: logoutAdmin,
    switchRole,
  };
};
