import { create } from 'zustand';

import type { User } from '@/types';

interface AuthState {
  user: User | null;
  permissions: string[];
  setAuth: (payload: { user: User; permissions: string[] }) => void;
  clearAuth: () => void;
}

const getStoredAuth = (): { user: User | null; permissions: string[] } | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('auth');
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

const storedAuth = getStoredAuth();

export const authStore = create<AuthState>((set) => ({
  user: storedAuth?.user ?? null,
  permissions: storedAuth?.permissions ?? [],
  setAuth: ({ user, permissions }) => {
    localStorage.setItem('auth', JSON.stringify({ user, permissions }));
    set({ user, permissions });
  },
  clearAuth: () => {
    localStorage.removeItem('auth');
    set({ user: null, permissions: [] });
  },
}));
