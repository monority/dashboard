import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { QUERY_KEYS } from '@/utils';

import { mailService } from '../services';
import type { MailFilters } from '../types';

export const useMailThreads = (filters: MailFilters) => {
  const normalizedSearch = filters.search.trim().toLowerCase();

  const queryKey = useMemo(
    () => QUERY_KEYS.mailThreads(filters.folder, normalizedSearch),
    [filters.folder, normalizedSearch],
  );

  return useQuery({
    queryKey,
    queryFn: () =>
      mailService.listThreads({
        ...filters,
        search: normalizedSearch,
      }),
  });
};
