import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const { useQueryMock, listMock } = vi.hoisted(() => ({
  useQueryMock: vi.fn(),
  listMock: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: useQueryMock,
}));

vi.mock('../services', () => ({
  taskService: {
    list: listMock,
  },
}));

import { QUERY_KEYS } from '@/utils';

import { useTasks } from './useTasks';

describe('useTasks', () => {
  it('construit la queryKey avec la recherche normalisee', () => {
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });

    renderHook(() => useTasks({ status: 'Pending', search: '  API  ' }));

    const options = useQueryMock.mock.lastCall?.[0] as { queryKey: unknown } | undefined;
    expect(options?.queryKey).toEqual(QUERY_KEYS.tasks('Pending', 'api'));
  });

  it('queryFn delegue a taskService.list avec la recherche normalisee', async () => {
    useQueryMock.mockImplementation((opts: { queryFn: () => Promise<unknown> }) => opts);
    listMock.mockResolvedValue([]);

    const { result } = renderHook(() => useTasks({ status: 'Completed', search: '  Emma  ' }));
    const queryResult = result.current as unknown as { queryFn: () => Promise<unknown> };
    await queryResult.queryFn();

    expect(listMock).toHaveBeenCalledWith({ status: 'Completed', search: 'emma' });
  });
});
