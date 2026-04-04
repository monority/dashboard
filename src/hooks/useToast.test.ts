import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { uiStore } from '@/stores';

import { useToast } from './useToast';

const INITIAL_STATE = {
  isSidebarOpen: true,
  theme: 'system' as const,
  toasts: [],
};

describe('useToast', () => {
  beforeEach(() => {
    act(() => {
      uiStore.setState(INITIAL_STATE);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    act(() => {
      uiStore.setState(INITIAL_STATE);
    });
  });

  it('retourne les toasts courants du store', () => {
    act(() => {
      uiStore.setState({ toasts: [{ id: '1', title: 'Saved', variant: 'success' }] });
    });

    const { result } = renderHook(() => useToast());

    expect(result.current.toasts).toEqual([{ id: '1', title: 'Saved', variant: 'success' }]);
  });

  it('notify delegue a pushToast', () => {
    const pushToast = vi.fn();
    act(() => {
      uiStore.setState({ pushToast });
    });

    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.notify({ title: 'Done', description: 'OK', variant: 'success' });
    });

    expect(pushToast).toHaveBeenCalledWith({
      title: 'Done',
      description: 'OK',
      variant: 'success',
    });
  });

  it('expose removeToast du store', () => {
    const removeToast = vi.fn();
    act(() => {
      uiStore.setState({ removeToast });
    });

    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.removeToast('toast-1');
    });

    expect(removeToast).toHaveBeenCalledWith('toast-1');
  });
});
