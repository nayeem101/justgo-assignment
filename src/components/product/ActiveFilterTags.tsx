import { Chip } from '../ui/Chip';

export interface ActiveFilterTagsProps {
  totalResults: number;
  searchQuery?: string;
  category?: string;
  sortBy?: string;
  onRemoveSearch?: () => void;
  onRemoveCategory?: () => void;
  onRemoveSort?: () => void;
  onClearAll?: () => void;
}

const sortLabels: Record<string, string> = {
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'title-asc': 'Name: A to Z',
  'title-desc': 'Name: Z to A',
};

export function ActiveFilterTags({
  totalResults,
  searchQuery,
  category,
  sortBy,
  onRemoveSearch,
  onRemoveCategory,
  onRemoveSort,
  onClearAll,
}: ActiveFilterTagsProps) {
  const hasActiveFilters = !!(searchQuery || category || sortBy);

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {/* Results Count */}
      <Chip
        label={`${totalResults} product${totalResults !== 1 ? 's' : ''} found`}
        variant="primary"
      />

      {/* Search Query */}
      {searchQuery && (
        <Chip label="Search" value={searchQuery} onRemove={onRemoveSearch} />
      )}

      {/* Category */}
      {category && (
        <Chip label="Category" value={category} onRemove={onRemoveCategory} />
      )}

      {/* Sort */}
      {sortBy && sortLabels[sortBy] && (
        <Chip label="Sort" value={sortLabels[sortBy]} onRemove={onRemoveSort} />
      )}

      {/* Clear All */}
      {hasActiveFilters && onClearAll && (
        <button
          onClick={onClearAll}
          className="text-sm text-slate-500 hover:text-slate-700 transition-colors ml-2"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
