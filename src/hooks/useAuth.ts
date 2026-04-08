import { authStore } from '@/stores';

/**
 * Hook for accessing authentication state and methods.
 * Provides current user, permissions, and auth management functions.
 * Authentication is handled via HttpOnly cookies.
 * @returns Object containing user data, permissions, and auth methods
 * @example
 * const { user, isAuthenticated, setAuth, clearAuth } = useAuth();
 */
export const useAuth = () => {
  const user = authStore((state) => state.user);
  const permissions = authStore((state) => state.permissions);
  const setAuth = authStore((state) => state.setAuth);
  const clearAuth = authStore((state) => state.clearAuth);

  return {
    user,
    permissions,
    isAuthenticated: Boolean(user),
    setAuth,
    clearAuth,
  };
};
