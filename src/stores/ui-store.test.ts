import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { uiStore } from './ui-store';

const INITIAL_STATE = {
  isSidebarOpen: true,
  theme: 'system' as const,
  toasts: [],
};

describe('uiStore', () => {
  beforeEach(() => {
    uiStore.setState(INITIAL_STATE);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    uiStore.setState(INITIAL_STATE);
  });

  it('ouvre et ferme la sidebar', () => {
    uiStore.getState().setSidebarOpen(false);
    expect(uiStore.getState().isSidebarOpen).toBe(false);

    uiStore.getState().toggleSidebar();
    expect(uiStore.getState().isSidebarOpen).toBe(true);
  });

  it('met a jour le theme', () => {
    uiStore.getState().setTheme('dark');
    expect(uiStore.getState().theme).toBe('dark');
  });

  it('ajoute un toast avec un id genere', () => {
    vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue(
      '123e4567-e89b-12d3-a456-426614174000',
    );

    uiStore.getState().pushToast({ title: 'Succes', variant: 'success' });

    expect(uiStore.getState().toasts).toEqual([
      { id: '123e4567-e89b-12d3-a456-426614174000', title: 'Succes', variant: 'success' },
    ]);
  });

  it('supprime un toast par id', () => {
    uiStore.setState({
      toasts: [
        { id: 'a', title: 'A', variant: 'info' },
        { id: 'b', title: 'B', variant: 'warning' },
      ],
    });

    uiStore.getState().removeToast('a');

    expect(uiStore.getState().toasts).toEqual([{ id: 'b', title: 'B', variant: 'warning' }]);
  });
});
