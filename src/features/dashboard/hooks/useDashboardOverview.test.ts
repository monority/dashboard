import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const { useQueryMock, getOverviewMock } = vi.hoisted(() => ({
  useQueryMock: vi.fn(),
  getOverviewMock: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: useQueryMock,
}));

vi.mock('../services/dashboard-service', () => ({
  dashboardService: {
    getOverview: getOverviewMock,
  },
}));

import { QUERY_KEYS } from '@/utils';

import { useDashboardOverview } from './useDashboardOverview';

describe('useDashboardOverview', () => {
  it('appelle useQuery avec une queryKey normalisee', () => {
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });

    renderHook(() =>
      useDashboardOverview({
        range: '30d',
        team: 'Support',
        search: '  SLA  ',
      }),
    );

    const firstCall = useQueryMock.mock.calls[0];
    expect(firstCall).toBeDefined();
    const options = firstCall?.[0];
    expect(options).toBeDefined();
    if (!options || typeof options !== 'object') {
      throw new Error('Options useQuery introuvables');
    }

    expect((options as { queryKey: unknown }).queryKey).toEqual(
      QUERY_KEYS.dashboardOverview('30d', 'Support', 'sla'),
    );
  });

  it('queryFn appelle dashboardService.getOverview avec la recherche normalisee', async () => {
    useQueryMock.mockImplementation((options: { queryFn: () => Promise<unknown> }) => options);
    getOverviewMock.mockResolvedValue({ ok: true });

    const { result } = renderHook(() =>
      useDashboardOverview({
        range: '7d',
        team: 'Finance',
        search: '  Export  ',
      }),
    );

    const queryResult = result.current as unknown as { queryFn: () => Promise<unknown> };
    await queryResult.queryFn();

    expect(getOverviewMock).toHaveBeenCalledTimes(1);
    expect(getOverviewMock).toHaveBeenCalledWith({
      range: '7d',
      team: 'Finance',
      search: 'export',
    });
  });
});
