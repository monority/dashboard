import type { ApiResponse, SettingsApiModel } from '@/types';

import { httpClient } from '@/services';

export const settingsService = {
    async get() {
        const response = await httpClient.get<ApiResponse<SettingsApiModel>>('/settings');
        return response.data.data;
    },
};
