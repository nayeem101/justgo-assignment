import { useQuery } from '@tanstack/react-query';
import { handleApiError, type ApiError } from '../../api/errors';
import { productsApi } from '../../api/products';
import type { UseCategoriesReturn } from '../../types/categories';
import { productKeys } from './productKeys';
import { useMemo } from 'react';
import type { CategoryOption } from '../../types/product';

export function useCategories(): UseCategoriesReturn {
  const query = useQuery({
    queryKey: productKeys.categories(),
    queryFn: async () => {
      try {
        return await productsApi.getCategories();
      } catch (error) {
        throw handleApiError(error);
      }
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
  });

  // Transform categories to select options
  const categoryOptions = useMemo((): CategoryOption[] => {
    if (!query.data) return [];
    return query.data.map((category) => ({
      value: category.slug,
      label: category.name,
    }));
  }, [query.data]);

  return {
    categories: query.data ?? [],
    categoryOptions,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as ApiError | null,
    refetch: query.refetch,
  };
}
