import { uiStore } from '@/stores';
import type { ToastMessage } from '@/types';

type ToastPayload = Omit<ToastMessage, 'id'>;

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
