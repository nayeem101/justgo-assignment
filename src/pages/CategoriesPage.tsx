import { useState, useMemo } from 'react';
import { Search, Grid, AlertCircle, X } from 'lucide-react';

import { EmptyState } from '../components/EmptyState';
import { CategoryGrid } from '../components/category/CategoryGrid';
import { CategoryGridSkeleton } from '../components/category/CategoryGridSkeleton';
import { CategoryList } from '../components/category/CategoryList';
import { CategoryListSkeleton } from '../components/category/CategoryListSkeleton';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ViewToggle } from '../components/ui/ViewToggle';

import { useCategories } from '../hooks/queries/useCategories';
import { useSettingsStore } from '../store/useSettingsStore';

export function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // View mode from Zustand (persisted)
  const viewMode = useSettingsStore((state) => state.viewMode);
  const setViewMode = useSettingsStore((state) => state.setViewMode);

  // Fetch categories
  const { categories, isLoading, isError, error } = useCategories();

  // Filter categories by search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;

    const query = searchQuery.toLowerCase();
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.slug.toLowerCase().includes(query),
    );
  }, [categories, searchQuery]);

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
            <p className="text-slate-500 mt-1">
              Browse products by department and type.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-full sm:w-72">
              <Input
                type="text"
                placeholder="Search categories..."
                disabled
                leftIcon={<Search className="w-5 h-5" />}
              />
            </div>
            <ViewToggle value={viewMode} onChange={setViewMode} />
          </div>
        </div>

        {/* Skeleton based on view mode */}
        {viewMode === 'grid' ? (
          <CategoryGridSkeleton count={8} />
        ) : (
          <CategoryListSkeleton count={8} />
        )}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          icon={<AlertCircle className="w-8 h-8" />}
          title="Failed to load categories"
          description={
            error?.message || 'An error occurred while loading categories.'
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
          <p className="text-slate-500 mt-1">
            Browse products by department and type.
          </p>
        </div>

        {/* Search + View Toggle */}
        <div className="flex items-center gap-3">
          <div className="w-full sm:w-72">
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              rightElement={
                searchQuery && (
                  <X
                    className="w-5 h-5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    onClick={() => setSearchQuery('')}
                  />
                )
              }
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>
          <ViewToggle value={viewMode} onChange={setViewMode} />
        </div>
      </div>

      {/* Results Count */}
      {searchQuery && (
        <p className="text-sm text-slate-500 mb-6">
          {filteredCategories.length} categor
          {filteredCategories.length !== 1 ? 'ies' : 'y'} found
        </p>
      )}

      {/* Categories Display */}
      {filteredCategories.length > 0 ? (
        viewMode === 'grid' ? (
          <CategoryGrid categories={filteredCategories} />
        ) : (
          <CategoryList categories={filteredCategories} />
        )
      ) : (
        <EmptyState
          icon={<Grid className="w-8 h-8" />}
          title="No categories found"
          description={
            searchQuery
              ? `No categories match "${searchQuery}". Try a different search term.`
              : 'No categories available.'
          }
          action={
            searchQuery ? (
              <Button variant="primary" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            ) : undefined
          }
        />
      )}
    </div>
  );
}
