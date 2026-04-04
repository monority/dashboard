import { useDeferredValue, useEffect, useState } from 'react';

import { globalSearchService } from '@/services';
import type { GlobalSearchResult } from '@/types';

const normalizeQuery = (value: string) => value.trim().toLowerCase().slice(0, 60);

interface UseGlobalSearchResult {
  results: GlobalSearchResult[];
  isLoading: boolean;
}

/**
 * Hook for global search functionality with debounced query.
 * Uses deferred value to avoid re-renders on every keystroke and provides live search results.
 * @param query - The search query string to execute
 * @returns Object with search results and loading state
 * @example
 * const { results, isLoading } = useGlobalSearch('mail');
 */
export const useGlobalSearch = (query: string): UseGlobalSearchResult => {
  const deferredQuery = useDeferredValue(normalizeQuery(query));
  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!deferredQuery) {
      setResults([]);
      setIsLoading(false);

      return;
    }

    let isCancelled = false;

    const runSearch = async () => {
      setIsLoading(true);

      try {
        const nextResults = await globalSearchService.search(deferredQuery);

        if (!isCancelled) {
          setResults(nextResults);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void runSearch();

    return () => {
      isCancelled = true;
    };
  }, [deferredQuery]);

  return { results, isLoading };
};
