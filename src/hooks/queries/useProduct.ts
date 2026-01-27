import { useQuery } from '@tanstack/react-query';
import { handleApiError, type ApiError } from '../../api/errors';
import { productsApi } from '../../api/products';
import type {
  UseProductParams,
  UseProductReturn,
} from '../../types/productDetails';
import { productKeys } from './productKeys';

export function useProduct({
  id,
  enabled = true,
}: UseProductParams): UseProductReturn {
  const query = useQuery({
    queryKey: productKeys.detail(id),
    queryFn: async () => {
      try {
        return await productsApi.getById(id);
      } catch (error) {
        throw handleApiError(error);
      }
    },
    enabled: enabled && !!id,
    staleTime: 1000 * 60 * 10,
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
