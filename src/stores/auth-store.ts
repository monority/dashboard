import { create } from 'zustand';

import type { User } from '@/types';

interface AuthState {
    user: User | null;
    token: string | null;
    permissions: string[];
    setAuth: (payload: { user: User; token: string; permissions: string[] }) => void;
    clearAuth: () => void;
}

export const authStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    permissions: [],
    setAuth: ({ user, token, permissions }) => {
        set({ user, token, permissions });
    },
    clearAuth: () => {
        set({ user: null, token: null, permissions: [] });
    },
}));
