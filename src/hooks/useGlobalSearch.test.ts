import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const { searchMock } = vi.hoisted(() => ({
  searchMock: vi.fn(),
}));

vi.mock('@/services', () => ({
  globalSearchService: {
    search: searchMock,
  },
}));

import { useGlobalSearch } from './useGlobalSearch';

describe('useGlobalSearch', () => {
  it('n appelle pas le service quand la requete est vide', async () => {
    searchMock.mockResolvedValue([]);

    const { result } = renderHook(() => useGlobalSearch('   '));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(searchMock).not.toHaveBeenCalled();
    expect(result.current.results).toEqual([]);
  });

  it('normalise la requete avant appel au service', async () => {
    searchMock.mockResolvedValue([]);

    renderHook(() => useGlobalSearch('  Dashboard  '));

    await waitFor(() => {
      expect(searchMock).toHaveBeenCalledWith('dashboard');
    });
  });

  it('alimente les resultats et remet isLoading a false', async () => {
    searchMock.mockResolvedValue([{ id: '1', label: 'Dashboard', route: '/', kind: 'section' }]);

    const { result } = renderHook(() => useGlobalSearch('dashboard'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.results).toEqual([
      { id: '1', label: 'Dashboard', route: '/', kind: 'section' },
    ]);
  });

  it('tronque la requete a 60 caracteres avant recherche', async () => {
    searchMock.mockResolvedValue([]);
    const longQuery = 'A'.repeat(80);

    renderHook(() => useGlobalSearch(longQuery));

    await waitFor(() => {
      expect(searchMock).toHaveBeenCalled();
    });

    const firstArg = searchMock.mock.lastCall?.[0];
    expect(typeof firstArg).toBe('string');
    expect((firstArg as string).length).toBe(60);
  });
});
