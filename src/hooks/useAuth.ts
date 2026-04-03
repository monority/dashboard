import { authStore } from '@/stores';

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
