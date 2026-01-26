import { FilterChip } from '../ui/FilterChip';

interface ActiveFiltersProps {
  filters: {
    q: string;
    category: string;
    sort: string;
  };
  onRemove: (key: 'q' | 'category' | 'sort') => void;
  onClearAll: () => void;
}

const sortLabels: Record<string, string> = {
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'title-asc': 'Name: A to Z',
  'title-desc': 'Name: Z to A',
};

export function ActiveFilters({
  filters,
  onRemove,
  onClearAll,
}: ActiveFiltersProps) {
  const hasFilters = filters.q || filters.category || filters.sort;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-muted-foreground">Active filters:</span>

      {filters.q && (
        <FilterChip
          label={`Search: "${filters.q}"`}
          onRemove={() => onRemove('q')}
        />
      )}

      {filters.category && (
        <FilterChip
          label={`Category: ${filters.category}`}
          onRemove={() => onRemove('category')}
        />
      )}

      {filters.sort && (
        <FilterChip
          label={sortLabels[filters.sort] || filters.sort}
          onRemove={() => onRemove('sort')}
        />
      )}

      <button
        onClick={onClearAll}
        className="text-sm text-primary hover:text-primary/80 font-medium ml-2 transition-colors"
      >
        Clear all
      </button>
    </div>
  );
}
