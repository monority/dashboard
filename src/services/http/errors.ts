import type { AxiosError } from 'axios';

import type { ApiError } from '@/types';

interface ErrorPayload {
  message?: string;
  code?: string;
  details?: Record<string, string[]>;
}

/**
 * Normalizes Axios errors to a consistent ApiError format.
 * Handles both Axios errors and generic errors, extracting message, code, and status.
 *
 * @param error - Error from Axios or unknown error type
 * @returns Normalized ApiError with message, code, status, and optional details
 */
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
