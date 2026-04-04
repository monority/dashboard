import type { InternalAxiosRequestConfig } from 'axios';
import { beforeEach, describe, expect, it } from 'vitest';

import { authStore } from '@/stores';

import { httpClient } from './client';

const INITIAL_AUTH_STATE = {
  user: null,
  token: null,
  permissions: [],
};

describe('httpClient', () => {
  beforeEach(() => {
    authStore.setState(INITIAL_AUTH_STATE);
  });

  it('configure les options axios de base', () => {
    expect(httpClient.defaults.baseURL).toBe('/api');
    expect(httpClient.defaults.timeout).toBe(10_000);
    expect(httpClient.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('ajoute Authorization quand un token est present', () => {
    authStore.setState({ token: 'token-123' });

    const requestHandler = (
      httpClient.interceptors.request as unknown as {
        handlers: Array<{
          fulfilled: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
        }>;
      }
    ).handlers[0]?.fulfilled;

    expect(requestHandler).toBeDefined();
    if (!requestHandler) {
      throw new Error('Interceptor request introuvable');
    }

    const config = requestHandler({ headers: {} } as InternalAxiosRequestConfig);
    expect(config.headers.Authorization).toBe('Bearer token-123');
  });

  it('laisse passer la reponse sans modification', () => {
    const responseHandler = (
      httpClient.interceptors.response as unknown as {
        handlers: Array<{ fulfilled: (response: unknown) => unknown }>;
      }
    ).handlers[0]?.fulfilled;

    expect(responseHandler).toBeDefined();
    if (!responseHandler) {
      throw new Error('Interceptor response introuvable');
    }

    const response = { data: { ok: true } };
    expect(responseHandler(response)).toBe(response);
  });
});
