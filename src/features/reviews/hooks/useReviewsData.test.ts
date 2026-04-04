import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const { useQueryMock, getReviewsDataMock } = vi.hoisted(() => ({
  useQueryMock: vi.fn(),
  getReviewsDataMock: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: useQueryMock,
}));

vi.mock('../services', () => ({
  reviewsService: {
    getReviewsData: getReviewsDataMock,
  },
}));

import { QUERY_KEYS } from '@/utils';

import { useReviewsData } from './useReviewsData';

describe('useReviewsData', () => {
  it('configure useQuery avec la query key reviewsData', () => {
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });

    renderHook(() => useReviewsData());

    const options = useQueryMock.mock.lastCall?.[0] as
      | { queryKey: unknown; queryFn: unknown }
      | undefined;
    expect(options?.queryKey).toEqual(QUERY_KEYS.reviewsData);
    expect(options?.queryFn).toBe(getReviewsDataMock);
  });

  it('delegue la recuperation a reviewsService.getReviewsData', async () => {
    useQueryMock.mockImplementation((opts: { queryFn: () => Promise<unknown> }) => opts);
    getReviewsDataMock.mockResolvedValue({ ok: true });

    const { result } = renderHook(() => useReviewsData());
    const queryResult = result.current as unknown as { queryFn: () => Promise<unknown> };
    await queryResult.queryFn();

    expect(getReviewsDataMock).toHaveBeenCalledTimes(1);
  });
});
