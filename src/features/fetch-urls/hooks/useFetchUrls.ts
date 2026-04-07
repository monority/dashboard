import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useCallback } from 'react';

import { fetchUrlsService } from '../services/fetch-urls-service';
import type { FetchUrlResponse, HttpMethod } from '../types';

interface UseFetchUrlsOptions {
  onSuccess?: (response: FetchUrlResponse) => void;
  onError?: (error: Error) => void;
}

interface UseFetchUrlsReturn {
  execute: (
    url: string,
    method: HttpMethod,
    body?: string,
    headers?: Record<string, string>,
  ) => void;
  response: FetchUrlResponse | null;
  isLoading: boolean;
  error: Error | null;
  history: FetchUrlResponse[];
  clearHistory: () => void;
}

export function useFetchUrls(options?: UseFetchUrlsOptions): UseFetchUrlsReturn {
  const { onSuccess, onError } = options || {};
  const [response, setResponse] = useState<FetchUrlResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      url,
      method,
      body,
      headers,
    }: {
      url: string;
      method: HttpMethod;
      body?: string;
      headers?: Record<string, string>;
    }) => {
      const request = {
        id: crypto.randomUUID(),
        url,
        method,
        headers,
        body,
        timestamp: Date.now(),
      };

      const result = await fetchUrlsService.execute(request);
      fetchUrlsService.saveToHistory(result);
      return result;
    },
    onSuccess: (data) => {
      setResponse(data);
      setError(null);
      onSuccess?.(data);
      queryClient.invalidateQueries({ queryKey: ['fetch-urls-history'] });
    },
    onError: (err) => {
      setError(err);
      setResponse(null);
      onError?.(err);
    },
  });

  const execute = useCallback(
    (url: string, method: HttpMethod, body?: string, headers?: Record<string, string>) => {
      mutation.mutate({ url, method, body, headers });
    },
    [mutation],
  );

  const history = fetchUrlsService.getHistory();

  const clearHistory = useCallback(() => {
    fetchUrlsService.clearHistory();
    queryClient.invalidateQueries({ queryKey: ['fetch-urls-history'] });
  }, [queryClient]);

  return {
    execute,
    response,
    isLoading: mutation.isPending,
    error: error || (mutation.error as Error | null),
    history,
    clearHistory,
  };
}
