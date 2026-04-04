import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const { useQueryMock, getOverviewMock } = vi.hoisted(() => ({
  useQueryMock: vi.fn(),
  getOverviewMock: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: useQueryMock,
}));

vi.mock('../services', () => ({
  orderService: {
    getOverview: getOverviewMock,
  },
}));

import { QUERY_KEYS } from '@/utils';

import { useOrderOverview } from './useOrderOverview';

describe('useOrderOverview', () => {
  it('configure useQuery avec la query key orderOverview', () => {
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });

    renderHook(() => useOrderOverview());

    const firstCall = useQueryMock.mock.calls[0];
    expect(firstCall).toBeDefined();
    const options = firstCall?.[0];
    expect(options).toBeDefined();
    if (!options || typeof options !== 'object') {
      throw new Error('Options useQuery introuvables');
    }

    expect((options as { queryKey: unknown }).queryKey).toEqual(QUERY_KEYS.orderOverview);
  });

  it('passe orderService.getOverview comme queryFn', async () => {
    useQueryMock.mockImplementation((options: { queryFn: () => Promise<unknown> }) => options);
    getOverviewMock.mockResolvedValue({ ok: true });

    const { result } = renderHook(() => useOrderOverview());
    const queryResult = result.current as unknown as { queryFn: () => Promise<unknown> };
    await queryResult.queryFn();

    expect(getOverviewMock).toHaveBeenCalledTimes(1);
  });
});
