import { useAuth } from './useAuth';
import { hasPermission } from '../lib/permissions';

export const usePermission = () => {
  const { role } = useAuth();

  const can = (permissionKey) => {
    return hasPermission(role, permissionKey);
  };

  const hasRole = (allowedRoles = []) => {
    if (!role) return false;
    if (allowedRoles.length === 0) return true;
    return allowedRoles.includes(role);
  };

  return {
    role,
    can,
    hasRole,
    isSuperAdmin: role === 'SUPER_ADMIN',
    isAdmin: role === 'ADMIN' || role === 'SUPER_ADMIN',
    isStaff: role === 'STAFF',
  };
};
