import { beforeEach, describe, expect, it } from 'vitest';

import { authStore } from './auth-store';

const INITIAL_STATE = {
  user: null,
  permissions: [],
};

describe('authStore', () => {
  beforeEach(() => {
    authStore.setState(INITIAL_STATE);
  });

  it('setAuth met a jour user et permissions', () => {
    authStore.getState().setAuth({
      user: {
        id: 'u1',
        firstName: 'Alice',
        lastName: 'Doe',
        email: 'alice@example.com',
        role: 'admin',
      } as never,
      permissions: ['users.read', 'users.write'],
    });

    expect(authStore.getState().permissions).toEqual(['users.read', 'users.write']);
    expect(authStore.getState().user).not.toBeNull();
  });

  it('clearAuth reinitialise le store', () => {
    authStore.setState({
      user: { id: 'u1' } as never,
      permissions: ['users.read'],
    });

    authStore.getState().clearAuth();

    expect(authStore.getState().user).toBeNull();
    expect(authStore.getState().permissions).toEqual([]);
  });
});
