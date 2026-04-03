import axios, { type InternalAxiosRequestConfig } from 'axios';

import { authStore } from '@/stores';

import { toApiError } from './errors';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

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
