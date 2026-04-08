import { renderHook } from '@testing-library/react';
import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { authStore } from '@/stores';

import { useAuth } from './useAuth';

const INITIAL_STATE = {
  user: null,
  permissions: [],
};

describe('useAuth', () => {
  beforeEach(() => {
    act(() => {
      authStore.setState(INITIAL_STATE);
    });
  });

  afterEach(() => {
    act(() => {
      authStore.setState(INITIAL_STATE);
    });
  });

  it('expose isAuthenticated=false sans user', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('expose user, permissions et isAuthenticated=true apres setAuth', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.setAuth({
        user: {
          id: 'u1',
          firstName: 'Alice',
          lastName: 'Doe',
          email: 'alice@example.com',
          role: 'admin',
        } as never,
        permissions: ['users.read'],
      });
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).not.toBeNull();
    expect(result.current.permissions).toEqual(['users.read']);
  });

  it('clearAuth vide les informations d authentification', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.setAuth({
        user: { id: 'u1' } as never,
        permissions: ['users.read'],
      });
    });

    act(() => {
      result.current.clearAuth();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.permissions).toEqual([]);
  });
});
