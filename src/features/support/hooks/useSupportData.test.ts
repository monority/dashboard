import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const { useQueryMock, getDashboardDataMock } = vi.hoisted(() => ({
  useQueryMock: vi.fn(),
  getDashboardDataMock: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: useQueryMock,
}));

vi.mock('../services', () => ({
  supportService: {
    getDashboardData: getDashboardDataMock,
  },
}));

import { QUERY_KEYS } from '@/utils';

import { useSupportData } from './useSupportData';

describe('useSupportData', () => {
  it('configure useQuery avec la query key supportDashboard', () => {
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });

    renderHook(() => useSupportData());

    const options = useQueryMock.mock.lastCall?.[0] as
      | { queryKey: unknown; queryFn: unknown }
      | undefined;
    expect(options?.queryKey).toEqual(QUERY_KEYS.supportDashboard);
    expect(options?.queryFn).toBe(getDashboardDataMock);
  });

  it('delegue la recuperation a supportService.getDashboardData', async () => {
    useQueryMock.mockImplementation((opts: { queryFn: () => Promise<unknown> }) => opts);
    getDashboardDataMock.mockResolvedValue({ ok: true });

    const { result } = renderHook(() => useSupportData());
    const queryResult = result.current as unknown as { queryFn: () => Promise<unknown> };
    await queryResult.queryFn();

    expect(getDashboardDataMock).toHaveBeenCalledTimes(1);
  });
});
