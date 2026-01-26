import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { handleApiError, type ApiError } from '../../api/errors';
import { productsApi } from '../../api/products';
import type {
  UseInfiniteProductsParams,
  UseInfiniteProductsReturn,
} from '../../types/infiniteProduct';
import { productKeys } from './productKeys';

export function useInfiniteProducts({
  category,
  limit = 20,
  enabled = true,
}: UseInfiniteProductsParams = {}): UseInfiniteProductsReturn {
  const query = useInfiniteQuery({
    queryKey: productKeys.list({ category, limit }),
    queryFn: async ({ pageParam = 0 }) => {
      try {
        if (category) {
          return await productsApi.getByCategory(category, {
            limit,
            skip: pageParam,
          });
        }
        return await productsApi.getAll({
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
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });

  // Flatten products from all pages
  const products = useMemo(() => {
    if (!query.data?.pages) return [];
    return query.data.pages.flatMap((page) => page.products);
  }, [query.data?.pages]);

  // Get total from first page
  const total = query.data?.pages[0]?.total ?? 0;

  return {
    products,
    total,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as ApiError | null,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage ?? false,
    fetchNextPage: query.fetchNextPage,
    refetch: query.refetch,
  };
}
