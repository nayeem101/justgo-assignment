import type { ApiError } from '../api/errors';
import type { Product } from './product';

// Infinite products hook
export interface UseInfiniteProductsParams {
  category?: string;
  limit?: number;
  enabled?: boolean;
}

export interface UseInfiniteProductsReturn {
  products: Product[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  error: ApiError | null;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  refetch: () => void;
}
