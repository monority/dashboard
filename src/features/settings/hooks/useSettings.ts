import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/utils';

import { settingsService } from '../services/settings-service';

export const useSettings = () => {
    const queryClient = useQueryClient();

    const settingsQuery = useQuery({
        queryKey: QUERY_KEYS.settings,
        queryFn: settingsService.get,
    });

    const refreshSettings = useMutation({
        mutationFn: settingsService.get,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: QUERY_KEYS.settings });
            const previousSettings = queryClient.getQueryData(QUERY_KEYS.settings);

            queryClient.setQueryData(QUERY_KEYS.settings, (current: unknown) => current ?? null);

            return { previousSettings };
        },
        onError: (_error, _variables, context) => {
            if (context?.previousSettings) {
                queryClient.setQueryData(QUERY_KEYS.settings, context.previousSettings);
            }
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.settings });
        },
    });

    return {
        ...settingsQuery,
        refreshSettings,
    };
};
