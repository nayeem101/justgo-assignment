import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { handleApiError, type ApiError } from '../../api/errors';
import { productsApi } from '../../api/products';
import type {
  UseSearchProductsParams,
  UseSearchProductsReturn,
} from '../../types/searchProduct';
import { productKeys } from './productKeys';

export function useSearchProducts({
  query,
  limit = 20,
  enabled = true,
}: UseSearchProductsParams): UseSearchProductsReturn {
  const infiniteQuery = useInfiniteQuery({
    queryKey: productKeys.search(query, { limit }),
    queryFn: async ({ pageParam = 0 }) => {
      try {
        return await productsApi.search({
          query,
          limit,
          skip: pageParam,
        });
      } catch (error) {
        throw handleApiError(error);
      }
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      if (nextSkip >= lastPage.total) {
        return undefined;
      }
      return nextSkip;
    },
    enabled: enabled && query.length > 0,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  // Flatten products from all pages
  const products = useMemo(() => {
    if (!infiniteQuery.data?.pages) return [];
    return infiniteQuery.data.pages.flatMap((page) => page.products);
  }, [infiniteQuery.data?.pages]);

  // Get total from first page
  const total = infiniteQuery.data?.pages[0]?.total ?? 0;

  return {
    products,
    total,
    isLoading: infiniteQuery.isLoading,
    isError: infiniteQuery.isError,
    error: infiniteQuery.error as ApiError | null,
    isFetchingNextPage: infiniteQuery.isFetchingNextPage,
    hasNextPage: infiniteQuery.hasNextPage ?? false,
    fetchNextPage: infiniteQuery.fetchNextPage,
    refetch: infiniteQuery.refetch,
  };
}
