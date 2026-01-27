import { useSearchParams, useNavigate, useLocation } from 'react-router';
import { useCallback, useMemo } from 'react';

export interface ProductFilters {
  q: string;
  category: string;
  sort: string;
}

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Read filters directly from URL - URL is the source of truth
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

  // Update a single filter
  const setFilter = useCallback(
    (key: keyof ProductFilters, value: string) => {
      const newParams = new URLSearchParams(searchParams);

      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }

      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  // Update multiple filters at once
  const setFilters = useCallback(
    (updates: Partial<ProductFilters>) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });

      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  // Navigate to search page with current filters + search query
  const navigateToSearch = useCallback(
    (query: string) => {
      const params = new URLSearchParams();

      if (query) params.set('q', query);
      if (filters.category) params.set('category', filters.category);
      if (filters.sort) params.set('sort', filters.sort);

      const queryString = params.toString();
      navigate(`/products/search${queryString ? `?${queryString}` : ''}`);
    },
    [navigate, filters.category, filters.sort],
  );

  // Clear all filters (stays on current page)
  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  // Clear filters and go back to products page
  const clearAndGoToProducts = useCallback(() => {
    navigate('/products');
  }, [navigate]);

  // Check if any filters are active
  const hasActiveFilters = !!(filters.q || filters.category || filters.sort);

  return {
    filters,
    setFilter,
    setFilters,
    navigateToSearch,
    clearFilters,
    clearAndGoToProducts,
    hasActiveFilters,
    isSearchPage,
  };
}
