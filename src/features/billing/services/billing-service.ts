import type { ApiResponse, BillingApiModel } from '@/types';

import { httpClient } from '@/services';

export const billingService = {
    async list() {
        const response = await httpClient.get<ApiResponse<BillingApiModel[]>>('/billing');
        return response.data.data;
    },
};
