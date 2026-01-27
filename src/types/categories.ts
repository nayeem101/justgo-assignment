import type { Category, CategoryOption } from './product';
import type { ApiError } from '../api/errors';

export interface UseCategoriesReturn {
  categories: Category[];
  categoryOptions: CategoryOption[];
  isLoading: boolean;
  isError: boolean;
  error: ApiError | null;
  refetch: () => void;
}
