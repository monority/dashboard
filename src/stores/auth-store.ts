import { create } from 'zustand';

import type { User } from '@/types';

interface AuthState {
  user: User | null;
  permissions: string[];
  setAuth: (payload: { user: User; permissions: string[] }) => void;
  clearAuth: () => void;
}

export const authStore = create<AuthState>((set) => ({
  user: null,
  permissions: [],
  setAuth: ({ user, permissions }) => {
    set({ user, permissions });
  },
  clearAuth: () => {
    set({ user: null, permissions: [] });
  },
}));
