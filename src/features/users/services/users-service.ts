import type { ApiResponse, UserApiModel } from '@/types';

import { httpClient } from '@/services';

export const usersService = {
    async list() {
        const response = await httpClient.get<ApiResponse<UserApiModel[]>>('/users');
        return response.data.data;
    },
};
