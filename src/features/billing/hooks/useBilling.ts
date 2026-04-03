import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/utils';

import { billingService } from '../services/billing-service';

export const useBilling = () => {
    const queryClient = useQueryClient();

    const billingQuery = useQuery({
        queryKey: QUERY_KEYS.billing,
        queryFn: billingService.list,
    });

    const refreshBilling = useMutation({
        mutationFn: billingService.list,
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: QUERY_KEYS.billing });
            const previousBilling = queryClient.getQueryData(QUERY_KEYS.billing);

            queryClient.setQueryData(QUERY_KEYS.billing, (current: unknown) => current ?? []);

            return { previousBilling };
        },
        onError: (_error, _variables, context) => {
            if (context?.previousBilling) {
                queryClient.setQueryData(QUERY_KEYS.billing, context.previousBilling);
            }
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.billing });
        },
    });

    return {
        ...billingQuery,
        refreshBilling,
    };
};
