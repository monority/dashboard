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

vi.mock('../services/billing-service', () => ({
  billingService: {
    list: listMock,
  },
}));

import { QUERY_KEYS } from '@/utils';

import { useBilling } from './useBilling';

describe('useBilling', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('configure useQuery avec QUERY_KEYS.billing', () => {
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
    useMutationMock.mockReturnValue({ mutate: vi.fn(), isPending: false });
    useQueryClientMock.mockReturnValue({
      cancelQueries: vi.fn(),
      getQueryData: vi.fn(),
      setQueryData: vi.fn(),
      invalidateQueries: vi.fn(),
    });

    renderHook(() => useBilling());

    const options = useQueryMock.mock.lastCall?.[0] as
      | { queryKey: unknown; queryFn: unknown }
      | undefined;
    expect(options?.queryKey).toEqual(QUERY_KEYS.billing);
    expect(options?.queryFn).toBe(listMock);
  });

  it('configure refreshBilling avec billingService.list', () => {
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
    useMutationMock.mockReturnValue({ mutate: vi.fn(), isPending: false });
    useQueryClientMock.mockReturnValue({
      cancelQueries: vi.fn(),
      getQueryData: vi.fn(),
      setQueryData: vi.fn(),
      invalidateQueries: vi.fn(),
    });

    renderHook(() => useBilling());

    const mutationOptions = useMutationMock.mock.lastCall?.[0] as
      | { mutationFn: unknown }
      | undefined;
    expect(mutationOptions?.mutationFn).toBe(listMock);
  });

  it('onMutate annule, sauvegarde et initialise le cache', async () => {
    const queryClient = {
      cancelQueries: vi.fn().mockResolvedValue(undefined),
      getQueryData: vi.fn().mockReturnValue([{ id: 'b1' }]),
      setQueryData: vi.fn(),
      invalidateQueries: vi.fn(),
    };
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
    useMutationMock.mockImplementation((options: unknown) => options);
    useQueryClientMock.mockReturnValue(queryClient);

    renderHook(() => useBilling());

    const mutationOptions = useMutationMock.mock.lastCall?.[0] as {
      onMutate: () => Promise<unknown>;
    };
    const context = await mutationOptions.onMutate();

    expect(queryClient.cancelQueries).toHaveBeenCalledWith({ queryKey: QUERY_KEYS.billing });
    expect(queryClient.getQueryData).toHaveBeenCalledWith(QUERY_KEYS.billing);
    expect(queryClient.setQueryData).toHaveBeenCalled();
    expect(context).toEqual({ previousBilling: [{ id: 'b1' }] });
  });

  it('onError restaure le cache precedent quand present', () => {
    const queryClient = {
      cancelQueries: vi.fn(),
      getQueryData: vi.fn(),
      setQueryData: vi.fn(),
      invalidateQueries: vi.fn(),
    };
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
    useMutationMock.mockImplementation((options: unknown) => options);
    useQueryClientMock.mockReturnValue(queryClient);

    renderHook(() => useBilling());

    const mutationOptions = useMutationMock.mock.lastCall?.[0] as {
      onError: (
        _error: unknown,
        _variables: unknown,
        context: { previousBilling?: unknown },
      ) => void;
    };
    mutationOptions.onError(new Error('boom'), null, { previousBilling: [{ id: 'b1' }] });

    expect(queryClient.setQueryData).toHaveBeenCalledWith(QUERY_KEYS.billing, [{ id: 'b1' }]);
  });

  it('onSettled invalide QUERY_KEYS.billing', async () => {
    const queryClient = {
      cancelQueries: vi.fn(),
      getQueryData: vi.fn(),
      setQueryData: vi.fn(),
      invalidateQueries: vi.fn().mockResolvedValue(undefined),
    };
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
    useMutationMock.mockImplementation((options: unknown) => options);
    useQueryClientMock.mockReturnValue(queryClient);

    renderHook(() => useBilling());

    const mutationOptions = useMutationMock.mock.lastCall?.[0] as {
      onSettled: () => Promise<unknown>;
    };
    await mutationOptions.onSettled();

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: QUERY_KEYS.billing });
  });
});
