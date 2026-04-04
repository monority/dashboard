import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { useQueryMock, useMutationMock, useQueryClientMock, getMock, saveMock } = vi.hoisted(() => ({
  useQueryMock: vi.fn(),
  useMutationMock: vi.fn(),
  useQueryClientMock: vi.fn(),
  getMock: vi.fn(),
  saveMock: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
  useQuery: useQueryMock,
  useMutation: useMutationMock,
  useQueryClient: useQueryClientMock,
}));

vi.mock('../services/settings-service', () => ({
  settingsService: {
    get: getMock,
    save: saveMock,
  },
}));

import { QUERY_KEYS } from '@/utils';

import { useSettings } from './useSettings';

describe('useSettings', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('configure useQuery avec la query key settings', () => {
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
    useMutationMock.mockReturnValue({ mutate: vi.fn(), isPending: false });
    useQueryClientMock.mockReturnValue({
      cancelQueries: vi.fn(),
      getQueryData: vi.fn(),
      setQueryData: vi.fn(),
      invalidateQueries: vi.fn(),
    });

    renderHook(() => useSettings());

    const queryOptions = useQueryMock.mock.lastCall?.[0] as
      | { queryKey: unknown; queryFn: unknown }
      | undefined;
    expect(queryOptions?.queryKey).toEqual(QUERY_KEYS.settings);
    expect(queryOptions?.queryFn).toBe(getMock);
  });

  it('configure useMutation avec settingsService.save', () => {
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
    useMutationMock.mockReturnValue({ mutate: vi.fn(), isPending: false });
    useQueryClientMock.mockReturnValue({
      cancelQueries: vi.fn(),
      getQueryData: vi.fn(),
      setQueryData: vi.fn(),
      invalidateQueries: vi.fn(),
    });

    renderHook(() => useSettings());

    const mutationOptions = useMutationMock.mock.lastCall?.[0] as
      | { mutationFn: unknown }
      | undefined;
    expect(mutationOptions?.mutationFn).toBe(saveMock);
  });

  it('onMutate annule les queries, capture previousSettings et initialise le cache', async () => {
    const queryClient = {
      cancelQueries: vi.fn().mockResolvedValue(undefined),
      getQueryData: vi.fn().mockReturnValue({ theme: 'dark', notificationsEnabled: false }),
      setQueryData: vi.fn(),
      invalidateQueries: vi.fn(),
    };
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
    useMutationMock.mockImplementation((options: unknown) => options);
    useQueryClientMock.mockReturnValue(queryClient);

    renderHook(() => useSettings());

    const mutationOptions = useMutationMock.mock.lastCall?.[0] as {
      onMutate: () => Promise<unknown>;
    };
    const context = await mutationOptions.onMutate();

    expect(queryClient.cancelQueries).toHaveBeenCalledWith({ queryKey: QUERY_KEYS.settings });
    expect(queryClient.getQueryData).toHaveBeenCalledWith(QUERY_KEYS.settings);
    expect(queryClient.setQueryData).toHaveBeenCalled();
    expect(context).toEqual({ previousSettings: { theme: 'dark', notificationsEnabled: false } });
  });

  it('onError restaure le cache precedent quand il existe', () => {
    const queryClient = {
      cancelQueries: vi.fn(),
      getQueryData: vi.fn(),
      setQueryData: vi.fn(),
      invalidateQueries: vi.fn(),
    };
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
    useMutationMock.mockImplementation((options: unknown) => options);
    useQueryClientMock.mockReturnValue(queryClient);

    renderHook(() => useSettings());

    const mutationOptions = useMutationMock.mock.lastCall?.[0] as {
      onError: (
        _error: unknown,
        _variables: unknown,
        context: { previousSettings?: unknown },
      ) => void;
    };
    mutationOptions.onError(new Error('boom'), null, { previousSettings: { theme: 'light' } });

    expect(queryClient.setQueryData).toHaveBeenCalledWith(QUERY_KEYS.settings, { theme: 'light' });
  });

  it('onSettled invalide les queries settings', async () => {
    const queryClient = {
      cancelQueries: vi.fn(),
      getQueryData: vi.fn(),
      setQueryData: vi.fn(),
      invalidateQueries: vi.fn().mockResolvedValue(undefined),
    };
    useQueryMock.mockReturnValue({ data: undefined, isLoading: false });
    useMutationMock.mockImplementation((options: unknown) => options);
    useQueryClientMock.mockReturnValue(queryClient);

    renderHook(() => useSettings());

    const mutationOptions = useMutationMock.mock.lastCall?.[0] as {
      onSettled: () => Promise<unknown>;
    };
    await mutationOptions.onSettled();

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: QUERY_KEYS.settings });
  });
});
