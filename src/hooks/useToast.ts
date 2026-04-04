import { uiStore } from '@/stores';
import type { ToastMessage } from '@/types';

type ToastPayload = Omit<ToastMessage, 'id'>;

/**
 * Hook for displaying toast notifications.
 * Manages the toast queue and provides methods to show and remove toasts.
 * @returns Object with toasts list, notify function, and removeToast function
 * @example
 * const { notify, removeToast } = useToast();
 * notify({ title: 'Success', variant: 'success' });
 */
export const useToast = () => {
  const toasts = uiStore((state) => state.toasts);
  const pushToast = uiStore((state) => state.pushToast);
  const removeToast = uiStore((state) => state.removeToast);

  const notify = (payload: ToastPayload) => {
    pushToast(payload);
  };

  return {
    toasts,
    notify,
    removeToast,
  };
};
