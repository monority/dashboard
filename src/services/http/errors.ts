import type { AxiosError } from 'axios';

import type { ApiError } from '@/types';

interface ErrorPayload {
    message?: string;
    code?: string;
    details?: Record<string, string[]>;
}

export const toApiError = (error: unknown): ApiError => {
    const axiosError = error as AxiosError<ErrorPayload>;

    if (axiosError?.isAxiosError) {
        return {
            message: axiosError.response?.data?.message ?? 'Une erreur reseau est survenue.',
            code: axiosError.response?.data?.code ?? 'NETWORK_ERROR',
            status: axiosError.response?.status ?? 500,
            details: axiosError.response?.data?.details,
        };
    }

    return {
        message: error instanceof Error ? error.message : 'Une erreur inconnue est survenue.',
        code: 'UNKNOWN_ERROR',
        status: 500,
    };
};
