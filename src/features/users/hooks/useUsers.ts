import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/utils';

import { usersService } from '../services/users-service';

export const useUsers = () => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: QUERY_KEYS.users,
    queryFn: usersService.list,
  });

  const refreshUsers = useMutation({
    mutationFn: usersService.list,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.users });
      const previousUsers = queryClient.getQueryData(QUERY_KEYS.users);

      queryClient.setQueryData(QUERY_KEYS.users, (current: unknown) => current ?? []);

      return { previousUsers };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(QUERY_KEYS.users, context.previousUsers);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users });
    },
  });

  return {
    ...usersQuery,
    refreshUsers,
  };
};
