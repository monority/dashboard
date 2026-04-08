import { create } from 'zustand';

import type { ToastMessage } from '@/types';
import type { UiTheme } from '@/utils';

interface UiState {
  isSidebarOpen: boolean;
  theme: UiTheme;
  toasts: ToastMessage[];
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
  setTheme: (theme: UiTheme) => void;
  pushToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const uiStore = create<UiState>((set) => ({
  isSidebarOpen: true,
  theme: 'system',
  toasts: [],
  setSidebarOpen: (isOpen) => {
    set({ isSidebarOpen: isOpen });
  },
  toggleSidebar: () => {
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
  },
  setTheme: (theme) => {
    set({ theme });
  },
  pushToast: (toast) => {
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
    }));
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }));
  },
}));
