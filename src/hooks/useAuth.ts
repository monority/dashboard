import { authStore } from '@/stores';

/**
 * Hook for accessing authentication state and methods.
 * Provides current user, token, permissions, and auth management functions.
 * @returns Object containing user data, token, permissions, and auth methods
 * @example
 * const { user, isAuthenticated, setAuth, clearAuth } = useAuth();
 */
export const useAuth = () => {
  const user = authStore((state) => state.user);
  const token = authStore((state) => state.token);
  const permissions = authStore((state) => state.permissions);
  const setAuth = authStore((state) => state.setAuth);
  const clearAuth = authStore((state) => state.clearAuth);

  return {
    user,
    token,
    permissions,
    isAuthenticated: Boolean(token),
    setAuth,
    clearAuth,
  };
};
