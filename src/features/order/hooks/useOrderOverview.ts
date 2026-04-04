import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/utils';

import { orderService } from '../services';

export const useOrderOverview = () => {
  return useQuery({
    queryKey: QUERY_KEYS.orderOverview,
    queryFn: orderService.getOverview,
  });
};
