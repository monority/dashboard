import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { useQueryMock, useMutationMock, useQueryClientMock, listMock } = vi.hoisted(() => ({
  useQueryMock: vi.fn(),
  useMutationMock: vi.fn(),
  useQueryClientMock: vi.fn(),
  listMock: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: useQueryMock,
  useMutation: useMutationMock,
  useQueryClient: useQueryClientMock,
}));

vi.mock('../services/users-service', () => ({
  usersService: {
    list: listMock,
  },
}));

import { QUERY_KEYS } from '@/utils';

import { useUsers } from './useUsers';

describe('useUsers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('configure useQuery avec QUERY_KEYS.users', () => {
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
    useMutationMock.mockReturnValue({ mutate: vi.fn(), isPending: false });
    useQueryClientMock.mockReturnValue({
      cancelQueries: vi.fn(),
      getQueryData: vi.fn(),
      setQueryData: vi.fn(),
      invalidateQueries: vi.fn(),
    });

    renderHook(() => useUsers());

    const options = useQueryMock.mock.lastCall?.[0] as
      | { queryKey: unknown; queryFn: unknown }
      | undefined;
    expect(options?.queryKey).toEqual(QUERY_KEYS.users);
    expect(options?.queryFn).toBe(listMock);
  });

  it('configure refreshUsers avec usersService.list', () => {
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
    useMutationMock.mockReturnValue({ mutate: vi.fn(), isPending: false });
    useQueryClientMock.mockReturnValue({
      cancelQueries: vi.fn(),
      getQueryData: vi.fn(),
      setQueryData: vi.fn(),
      invalidateQueries: vi.fn(),
    });

    renderHook(() => useUsers());

    const mutationOptions = useMutationMock.mock.lastCall?.[0] as
      | { mutationFn: unknown }
      | undefined;
    expect(mutationOptions?.mutationFn).toBe(listMock);
  });

  it('onMutate annule, sauvegarde et initialise le cache', async () => {
    const queryClient = {
      cancelQueries: vi.fn().mockResolvedValue(undefined),
      getQueryData: vi.fn().mockReturnValue([{ id: 'u1' }]),
      setQueryData: vi.fn(),
      invalidateQueries: vi.fn(),
    };
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
    useMutationMock.mockImplementation((options: unknown) => options);
    useQueryClientMock.mockReturnValue(queryClient);

    renderHook(() => useUsers());

    const mutationOptions = useMutationMock.mock.lastCall?.[0] as {
      onMutate: () => Promise<unknown>;
    };
    const context = await mutationOptions.onMutate();

    expect(queryClient.cancelQueries).toHaveBeenCalledWith({ queryKey: QUERY_KEYS.users });
    expect(queryClient.getQueryData).toHaveBeenCalledWith(QUERY_KEYS.users);
    expect(queryClient.setQueryData).toHaveBeenCalled();
    expect(context).toEqual({ previousUsers: [{ id: 'u1' }] });
  });

  it('onError restaure les users precedents quand presents', () => {
    const queryClient = {
      cancelQueries: vi.fn(),
      getQueryData: vi.fn(),
      setQueryData: vi.fn(),
      invalidateQueries: vi.fn(),
    };
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
    useMutationMock.mockImplementation((options: unknown) => options);
    useQueryClientMock.mockReturnValue(queryClient);

    renderHook(() => useUsers());

    const mutationOptions = useMutationMock.mock.lastCall?.[0] as {
      onError: (_error: unknown, _variables: unknown, context: { previousUsers?: unknown }) => void;
    };
    mutationOptions.onError(new Error('boom'), null, { previousUsers: [{ id: 'u1' }] });

    expect(queryClient.setQueryData).toHaveBeenCalledWith(QUERY_KEYS.users, [{ id: 'u1' }]);
  });

  it('onSettled invalide QUERY_KEYS.users', async () => {
    const queryClient = {
      cancelQueries: vi.fn(),
      getQueryData: vi.fn(),
      setQueryData: vi.fn(),
      invalidateQueries: vi.fn().mockResolvedValue(undefined),
    };
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
    useMutationMock.mockImplementation((options: unknown) => options);
    useQueryClientMock.mockReturnValue(queryClient);

    renderHook(() => useUsers());

    const mutationOptions = useMutationMock.mock.lastCall?.[0] as {
      onSettled: () => Promise<unknown>;
    };
    await mutationOptions.onSettled();

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: QUERY_KEYS.users });
  });
});
