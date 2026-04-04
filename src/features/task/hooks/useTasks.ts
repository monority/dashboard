import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/utils';

import { taskService } from '../services';
import type { TaskFilters } from '../types';

export const useTasks = (filters: TaskFilters) => {
  const normalizedSearch = filters.search.trim().toLowerCase();

  return useQuery({
    queryKey: QUERY_KEYS.tasks(filters.status, normalizedSearch),
    queryFn: () =>
      taskService.list({
        ...filters,
        search: normalizedSearch,
      }),
  });
};
