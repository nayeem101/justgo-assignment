import { EmptyState } from '../components/EmptyState';
import { InfiniteScrollTrigger } from '../components/InfiniteScrollTrigger';
import { PageHeader } from '../components/product/PageHeader';
import { ProductCard } from '../components/product/ProductCard';
import { ProductCardSkeleton } from '../components/product/ProductCardSkeleton';
import { ProductFilters } from '../components/product/ProductFilters';
import { Button } from '../components/ui/Button';
import { useProductFilters } from '../hooks/useProductFilters';
import { useInfiniteProducts } from '../hooks/queries/useProducts';
import { useCategories } from '../hooks/queries/useCategories';
import { useSortedProducts } from '../hooks/useSortedProducts';
import { Download, Plus, Search } from 'lucide-react';
import { useCallback } from 'react';

const ITEMS_PER_PAGE = 20;

export function ProductsPage() {
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

  const handleLoadMore = useCallback(() => {
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
      <PageHeader
        title="Products"
        count={total}
        countLabel="products"
        actions={
          <>
            <Button
              variant="secondary"
              leftIcon={<Download className="h-4 w-4" />}
            >
              Export
            </Button>
            <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
              Add product
            </Button>
          </>
        }
      />

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

      {/* Product List */}
      <div className="flex flex-col gap-4">
        {isLoading ? (
          // Initial loading skeletons
          Array.from({ length: 5 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : sortedProducts.length > 0 ? (
          // Product cards
          sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          // Empty state
          <EmptyState
            icon={<Search className="w-8 h-8" />}
            title="No products found"
            description={
              hasActiveFilters
                ? "Try adjusting your filters to find what you're looking for."
                : 'No products available at the moment.'
            }
            action={
              hasActiveFilters ? (
                <Button variant="primary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              ) : undefined
            }
          />
        )}
      </div>

      {/* Infinite Scroll Trigger */}
      {!isLoading && sortedProducts.length > 0 && (
        <InfiniteScrollTrigger
          onIntersect={handleLoadMore}
          hasMore={!!hasNextPage}
          isLoading={isFetchingNextPage}
        />
      )}
    </div>
  );
}
