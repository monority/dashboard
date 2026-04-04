import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/utils';

import { reviewsService } from '../services';

export const useReviewsData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.reviewsData,
    queryFn: reviewsService.getReviewsData,
  });
};
