import { useQuery } from '@tanstack/react-query';
import { useDeferredValue, useMemo } from 'react';

import { QUERY_KEYS } from '@/utils';

import { dashboardService } from '../services';
import type { DashboardFilters } from '../types';

export const useDashboardOverview = (filters: DashboardFilters) => {
  const normalizedSearch = filters.search.trim().toLowerCase();
  const deferredSearch = useDeferredValue(normalizedSearch);

  const queryKey = useMemo(
    () => QUERY_KEYS.dashboardOverview(filters.range, filters.team, deferredSearch),
    [filters.range, filters.team, deferredSearch],
  );

  return useQuery({
    queryKey,
    queryFn: () =>
      dashboardService.getOverview({
        ...filters,
        search: deferredSearch,
      }),
  });
};
