import { describe, expect, it } from 'vitest';

import { httpClient } from './client';

describe('httpClient', () => {
  it('configure les options axios de base', () => {
    expect(httpClient.defaults.baseURL).toBe('/api');
    expect(httpClient.defaults.timeout).toBe(10_000);
    expect(httpClient.defaults.headers['Content-Type']).toBe('application/json');
    expect(httpClient.defaults.withCredentials).toBe(true);
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
