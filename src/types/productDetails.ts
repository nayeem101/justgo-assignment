// for single product hook
import type { ApiError } from '../api/errors';
import type { Product } from './product';

export interface UseProductParams {
  id: string | number;
  enabled?: boolean;
}

export interface UseProductReturn {
  product: Product | undefined;
  isLoading: boolean;
  isError: boolean;
  error: ApiError | null;
  refetch: () => void;
}
