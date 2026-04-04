import { describe, expect, it } from 'vitest';

import { queryClient } from './client';

describe('queryClient', () => {
  it('configure les options par defaut des queries', () => {
    const queryDefaults = queryClient.getDefaultOptions().queries;

    expect(queryDefaults?.staleTime).toBe(5 * 60 * 1000);
    expect(queryDefaults?.retry).toBe(2);
    expect(queryDefaults?.refetchOnWindowFocus).toBe(false);
  });

  it('configure les options par defaut des mutations', () => {
    const mutationDefaults = queryClient.getDefaultOptions().mutations;

    expect(mutationDefaults?.retry).toBe(1);
  });
});
