import axios from 'axios';

import { toApiError } from './errors';

/** Base URL for all API requests. Reads from VITE_API_URL env var, defaults to '/api' */
const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

/**
 * Pre-configured Axios HTTP client with:
 * - HttpOnly cookie authentication (withCredentials: true)
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
  withCredentials: true,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(toApiError(error)),
);
