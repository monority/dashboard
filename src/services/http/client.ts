import axios, { type InternalAxiosRequestConfig } from 'axios';

import { authStore } from '@/stores';

import { toApiError } from './errors';

/** Base URL for all API requests. Reads from VITE_API_URL env var, defaults to '/api' */
const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

/**
 * Pre-configured Axios HTTP client with:
 * - Auto-injected Authorization header from auth store
 * - Normalized error handling via toApiError
 * - 10 second request timeout
 * - JSON content type default
 *
 * @example
 * const response = await httpClient.get('/users');
 * const data = response.data;
 */
export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = authStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(toApiError(error)),
);
