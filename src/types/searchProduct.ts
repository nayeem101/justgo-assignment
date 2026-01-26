import type { ApiError } from '../api/errors';
import type { Product } from './product';

// for search products hook
export interface UseSearchProductsParams {
  query: string;
  limit?: number;
  enabled?: boolean;
}

export interface UseSearchProductsReturn {
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
