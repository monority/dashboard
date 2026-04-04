import { httpClient } from '@/services';
import type { ApiResponse, UserApiModel } from '@/types';

export const usersService = {
  async list() {
    const response = await httpClient.get<ApiResponse<UserApiModel[]>>('/users');
    return response.data.data;
  },
};
