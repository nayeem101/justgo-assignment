import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../api/products';
import { handleApiError, type ApiError } from '../../api/errors';
import { productKeys } from './productKeys';
import type { Product } from '../../types/product';

interface UseProductDetailOptions {
  enabled?: boolean;
}

interface UseProductDetailReturn {
  product: Product | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ApiError | null;
  refetch: () => void;
}

export function useProductDetail(
  id: string | undefined,
  options: UseProductDetailOptions = {},
): UseProductDetailReturn {
  const { enabled = true } = options;

  const query = useQuery({
    queryKey: productKeys.detail(id!),
    queryFn: async () => {
      try {
        return await productsApi.getById(id!);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    enabled: enabled && !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  return {
    product: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as ApiError | null,
    refetch: query.refetch,
  };
}
