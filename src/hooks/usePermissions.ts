import { useMemo } from 'react';

import { authStore } from '@/stores';

/**
 * Hook for checking user permissions.
 * Provides helper methods to verify user access rights.
 * @returns Object with permissions list and checking method
 * @example
 * const { permissions, can } = usePermissions();
 * if (can('admin')) { // render admin UI }
 */
export const usePermissions = () => {
  const permissions = authStore((state) => state.permissions);

  const can = useMemo(
    () => (permissionCode: string) => permissions.includes(permissionCode),
    [permissions],
  );

  return {
    permissions,
    can,
  };
};
