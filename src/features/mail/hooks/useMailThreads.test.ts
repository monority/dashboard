import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const { useQueryMock, listThreadsMock } = vi.hoisted(() => ({
  useQueryMock: vi.fn(),
  listThreadsMock: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: useQueryMock,
}));

vi.mock('../services', () => ({
  mailService: {
    listThreads: listThreadsMock,
  },
}));

import { QUERY_KEYS } from '@/utils';

import { useMailThreads } from './useMailThreads';

describe('useMailThreads', () => {
  it('construit une queryKey avec la recherche normalisee', () => {
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });

    renderHook(() => useMailThreads({ folder: 'Inbox', search: '  Emma  ' }));

    const options = useQueryMock.mock.lastCall?.[0] as
      | { queryKey: unknown; queryFn: unknown }
      | undefined;
    expect(options?.queryKey).toEqual(QUERY_KEYS.mailThreads('Inbox', 'emma'));
  });

  it('queryFn delegue a mailService.listThreads avec la recherche normalisee', async () => {
    useQueryMock.mockImplementation((opts: { queryFn: () => Promise<unknown> }) => opts);
    listThreadsMock.mockResolvedValue([]);

    const { result } = renderHook(() => useMailThreads({ folder: 'Archive', search: '  KPI  ' }));
    const queryResult = result.current as unknown as { queryFn: () => Promise<unknown> };
    await queryResult.queryFn();

    expect(listThreadsMock).toHaveBeenCalledWith({ folder: 'Archive', search: 'kpi' });
  });
});
