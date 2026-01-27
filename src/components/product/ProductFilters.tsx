import { ArrowUpDown, Filter, Search, X } from 'lucide-react';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

interface ProductFiltersProps {
  // Current filter values (from URL)
  searchQuery: string;
  category: string;
  sortBy: string;

  // Handlers
  onSearch: (query: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;

  // Options
  categories: { value: string; label: string }[];

  // State
  isLoading?: boolean;
  showSearchInput?: boolean;
}

const sortOptions = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'title-asc', label: 'Name: A to Z' },
  { value: 'title-desc', label: 'Name: Z to A' },
];

export function ProductFilters({
  searchQuery,
  category,
  sortBy,
  onSearch,
  onCategoryChange,
  onSortChange,
  onClearFilters,
  categories,
  isLoading = false,
  showSearchInput = true,
}: ProductFiltersProps) {
  // Local input state for typing (before submission)
  const [inputValue, setInputValue] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync input with URL when URL changes (e.g., back/forward navigation)
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleSubmit = () => {
    const trimmedValue = inputValue.trim();
    onSearch(trimmedValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleClear = () => {
    setInputValue('');
    onClearFilters();
  };

  const hasActiveFilters = !!(searchQuery || category || sortBy);

  return (
    <div className="mb-6 p-3 bg-card rounded-xl shadow-sm border border-border flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-18 z-40">
      {/* Search Input */}
      {showSearchInput && (
        <div className="flex items-center w-full md:max-w-md">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            leftIcon={<Search className="h-5 w-5" />}
            rightElement={
              <Button
                size="sm"
                onClick={handleSubmit}
                isLoading={isLoading}
                className="h-8 px-3 text-xs"
              >
                Search
              </Button>
            }
          />
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto overflow-x-auto">
        <div className="flex items-center gap-2">
          {/* Category Filter */}
          <Select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            options={categories}
            placeholder="Category"
            leftIcon={<Filter className="h-4 w-4" />}
            className="w-36"
          />

          {/* Sort Filter */}
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            options={sortOptions}
            placeholder="Price"
            leftIcon={<ArrowUpDown className="h-4 w-4" />}
            className="w-44"
          />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-border mx-1 hidden sm:block" />

        {/* Clear Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          disabled={!hasActiveFilters}
          leftIcon={<X className="h-4 w-4" />}
          className="whitespace-nowrap border border-slate-200 rounded-lg"
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
