import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/utils';

import { supportService } from '../services';

export const useSupportData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.supportDashboard,
    queryFn: supportService.getDashboardData,
  });
};
