import { renderHook } from '@testing-library/react';
import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { authStore } from '@/stores';

import { useAuth } from './useAuth';

const INITIAL_STATE = {
  user: null,
  token: null,
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

  it('expose isAuthenticated=false sans token', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.token).toBeNull();
  });

  it('expose user, token, permissions et isAuthenticated=true apres setAuth', () => {
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
        token: 'token-123',
        permissions: ['users.read'],
      });
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.token).toBe('token-123');
    expect(result.current.permissions).toEqual(['users.read']);
  });

  it('clearAuth vide les informations d authentification', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.setAuth({
        user: { id: 'u1' } as never,
        token: 'token-123',
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
