import { renderHook } from '@testing-library/react';
import { act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { authStore } from '@/stores';

import { usePermissions } from './usePermissions';

const INITIAL_STATE = {
  user: null,
  permissions: [],
};

describe('usePermissions', () => {
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

  it('retourne la liste des permissions du store', () => {
    act(() => {
      authStore.setState({ permissions: ['users.read', 'billing.read'] });
    });

    const { result } = renderHook(() => usePermissions());

    expect(result.current.permissions).toEqual(['users.read', 'billing.read']);
  });

  it('can retourne true pour une permission presente et false sinon', () => {
    act(() => {
      authStore.setState({ permissions: ['users.read', 'billing.read'] });
    });

    const { result } = renderHook(() => usePermissions());

    expect(result.current.can('users.read')).toBe(true);
    expect(result.current.can('users.write')).toBe(false);
  });
});
