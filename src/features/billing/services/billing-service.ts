import { httpClient } from '@/services';
import type { ApiResponse, BillingApiModel } from '@/types';

export const billingService = {
  async list() {
    const response = await httpClient.get<ApiResponse<BillingApiModel[]>>('/billing');
    return response.data.data;
  },
};
