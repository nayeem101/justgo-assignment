import { useNavigate } from 'react-router';
import { Search, AlertCircle } from 'lucide-react';

import { EmptyState } from '../components/EmptyState';
import { InfiniteScrollTrigger } from '../components/InfiniteScrollTrigger';
import { ProductFilters } from '../components/product/ProductFilters';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductGridSkeleton } from '../components/product/ProductGridSkeleton';
import { ActiveFilterTags } from '../components/product/ActiveFilterTags';
import { Button } from '../components/ui/Button';

import { useProductFilters } from '../hooks/useProductFilters';
import { useSearchProducts } from '../hooks/queries/useSearchProducts';
import { useCategories } from '../hooks/queries/useCategories';
import { useSortedProducts } from '../hooks/useSortedProducts';
import { useFilteredByCategory } from '../hooks/useFilteredByCategory';

export function SearchPage() {
  const navigate = useNavigate();

  // URL-driven filters (setFilter is already stable via useCallback)
  const {
    filters,
    setFilter,
    navigateToSearch,
    clearFilters,
    hasActiveFilters,
  } = useProductFilters();

  // Search products
  const {
    products,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSearchProducts({
    query: filters.q,
    limit: 20,
  });

  // Categories for filter dropdown
  const { categoryOptions, isLoading: isCategoriesLoading } = useCategories();

  // Apply client-side filters
  const filteredProducts = useFilteredByCategory(products, filters.category);
  const sortedProducts = useSortedProducts(filteredProducts, filters.sort);

  // Simple handlers - no useCallback needed
  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigateToSearch(query);
    }
  };

  const handleCategoryChange = (value: string) => setFilter('category', value);

  const handleSortChange = (value: string) => setFilter('sort', value);

  const handleRemoveSearch = () => navigate('/products');

  const handleRemoveCategory = () => setFilter('category', '');

  const handleRemoveSort = () => setFilter('sort', '');

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // No search query - show prompt
  if (!filters.q) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <ProductFilters
          searchQuery=""
          category=""
          sortBy=""
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          onSortChange={handleSortChange}
          onClearFilters={clearFilters}
          categories={categoryOptions}
          isLoading={isCategoriesLoading}
        />

        <EmptyState
          icon={<Search className="w-8 h-8" />}
          title="Search for products"
          description="Enter a search term to find products in our catalog."
          action={
            <Button variant="primary" onClick={() => navigate('/products')}>
              Browse All Products
            </Button>
          }
        />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          icon={<AlertCircle className="w-8 h-8" />}
          title="Search failed"
          description={error?.message || 'An error occurred while searching.'}
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
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Search Results</h1>
        <p className="text-slate-500 mt-1">
          Showing results for &quot;{filters.q}&quot;
        </p>
      </div>

      {/* Filters */}
      <ProductFilters
        searchQuery={filters.q}
        category={filters.category}
        sortBy={filters.sort}
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onClearFilters={clearFilters}
        categories={categoryOptions}
        isLoading={isCategoriesLoading}
      />

      {/* Active Filter Tags */}
      <ActiveFilterTags
        totalResults={sortedProducts.length}
        searchQuery={filters.q}
        category={filters.category}
        sortBy={filters.sort}
        onRemoveSearch={handleRemoveSearch}
        onRemoveCategory={handleRemoveCategory}
        onRemoveSort={handleRemoveSort}
        onClearAll={clearFilters}
      />

      {/* Loading State */}
      {isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : sortedProducts.length > 0 ? (
        <>
          {/* Product Grid */}
          <ProductGrid products={sortedProducts} />

          {/* Infinite Scroll Trigger */}
          <InfiniteScrollTrigger
            onIntersect={handleLoadMore}
            hasMore={hasNextPage}
            isLoading={isFetchingNextPage}
          />
        </>
      ) : (
        /* Empty State */
        <EmptyState
          icon={<Search className="w-8 h-8" />}
          title="No products found"
          description={`We couldn't find any products matching "${filters.q}". Try adjusting your search or filters.`}
          action={
            hasActiveFilters ? (
              <Button variant="primary" onClick={clearFilters}>
                Clear Filters
              </Button>
            ) : (
              <Button variant="primary" onClick={() => navigate('/products')}>
                Browse All Products
              </Button>
            )
          }
        />
      )}
    </div>
  );
}
