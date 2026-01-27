import { useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

export interface ProductFilters {
  q: string;
  category: string;
  sort: string;
}

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Read filters from URL - URL is the source of truth
  const filters: ProductFilters = useMemo(
    () => ({
      q: searchParams.get('q') || '',
      category: searchParams.get('category') || '',
      sort: searchParams.get('sort') || '',
    }),
    [searchParams],
  );

  // Check if we're on search page
  const isSearchPage = location.pathname === '/products/search';

  // Check if any filters are active
  const hasActiveFilters = !!(filters.q || filters.category || filters.sort);

  // Update a single filter
  const setFilter = (key: keyof ProductFilters, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams, { replace: true });
  };

  // Update multiple filters at once
  const setFilters = (updates: Partial<ProductFilters>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    setSearchParams(newParams, { replace: true });
  };

  // Navigate to search page with query
  const navigateToSearch = (query: string) => {
    const params = new URLSearchParams();

    if (query) params.set('q', query);
    if (filters.category) params.set('category', filters.category);
    if (filters.sort) params.set('sort', filters.sort);

    const queryString = params.toString();
    navigate(`/products/search${queryString ? `?${queryString}` : ''}`);
  };

  // Clear all filters (stays on current page)
  const clearFilters = () => {
    setSearchParams({}, { replace: true });
  };

  // Clear filters and go back to products page
  const clearAndGoToProducts = () => {
    navigate('/products');
  };

  return {
    // State
    filters,
    hasActiveFilters,
    isSearchPage,

    // Actions
    setFilter,
    setFilters,
    navigateToSearch,
    clearFilters,
    clearAndGoToProducts,
  };
}
