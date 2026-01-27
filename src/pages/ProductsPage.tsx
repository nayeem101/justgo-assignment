import { Search } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/product/PageHeader';
import { ProductFilters } from '../components/product/ProductFilters';
import { ProductTable } from '../components/product/ProductTable';
import { Button } from '../components/ui/Button';

import { useCategories } from '../hooks/queries/useCategories';
import { useInfiniteProducts } from '../hooks/queries/useProducts';
import { useProductFilters } from '../hooks/useProductFilters';
import { useSortedProducts } from '../hooks/useSortedProducts';

const ITEMS_PER_PAGE = 20;

export function ProductsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(600);

  // Calculate container height based on viewport
  useEffect(() => {
    const updateHeight = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Leave some padding at the bottom
      const availableHeight = window.innerHeight - rect.top - 40;
      setContainerHeight(Math.max(400, Math.min(availableHeight, 800)));
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // URL-driven filters
  const {
    filters,
    setFilter,
    navigateToSearch,
    clearFilters,
    hasActiveFilters,
  } = useProductFilters();

  // Fetch products with infinite scroll
  const {
    products,
    total,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = useInfiniteProducts({
    category: filters.category || undefined,
    limit: ITEMS_PER_PAGE,
  });

  // Fetch categories for filter dropdown
  const { categoryOptions, isLoading: isCategoriesLoading } = useCategories();

  // Sort products client-side
  const sortedProducts = useSortedProducts(products, filters.sort);

  // Handlers
  const handleSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        navigateToSearch(query);
      }
    },
    [navigateToSearch],
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      setFilter('category', value);
    },
    [setFilter],
  );

  const handleSortChange = useCallback(
    (value: string) => {
      setFilter('sort', value);
    },
    [setFilter],
  );

  const handleScrollEnd = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Error state
  if (isError) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          icon={<Search className="w-8 h-8" />}
          title="Failed to load products"
          description={
            error?.message || 'An error occurred while loading products.'
          }
          action={
            <Button variant="primary" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <PageHeader title="Products" count={total} countLabel="products" />

      {/* Filters */}
      <ProductFilters
        searchQuery=""
        category={filters.category}
        sortBy={filters.sort}
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onClearFilters={clearFilters}
        categories={categoryOptions}
        isLoading={isCategoriesLoading}
      />

      {/* Product Table */}
      <div ref={containerRef} className="mt-4">
        <ProductTable
          products={sortedProducts}
          isLoading={isLoading}
          isFetchingMore={isFetchingNextPage}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
          onScrollEnd={handleScrollEnd}
          virtualized={true}
          containerHeight={containerHeight}
        />
      </div>

      {/* Loading indicator outside table (optional) */}
      <div className="py-2 flex bg-white shadow-sm rounded-bl-lg rounded-br-lg items-center justify-center gap-3">
        {isFetchingNextPage ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-indigo-500 border-t-transparent" />
            <p className="text-sm text-slate-500">Loading more products...</p>
          </>
        ) : (
          <p className="text-sm text-slate-500">
            Showing {sortedProducts.length} of {total} products
          </p>
        )}
      </div>
    </div>
  );
}
