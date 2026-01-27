import { Search } from 'lucide-react';
import { type ProductTableProps } from '../../types/table';
import { EmptyState } from '../EmptyState';
import { Table } from '../table/Table';
import { Button } from '../ui/Button';
import { productColumns } from './ProductTableColumns';

export function ProductTable({
  products,
  isLoading = false,
  isFetchingMore = false,
  hasActiveFilters = false,
  onClearFilters,
  onScrollEnd,
  virtualized = true,
  containerHeight = 600,
}: ProductTableProps) {
  return (
    <Table
      data={products}
      columns={productColumns}
      keyExtractor={(product) => product.id}
      isLoading={isLoading}
      skeletonCount={5}
      isFetchingMore={isFetchingMore}
      virtualized={virtualized}
      rowHeight={73}
      containerHeight={containerHeight}
      overscan={5}
      onScrollEnd={onScrollEnd}
      scrollEndThreshold={200}
      tableClassName="table-fixed" // Force fixed layout
      emptyState={
        <EmptyState
          icon={<Search className="w-8 h-8" />}
          title="No products found"
          description={
            hasActiveFilters
              ? "Try adjusting your filters to find what you're looking for."
              : 'No products available at the moment.'
          }
          action={
            hasActiveFilters && onClearFilters ? (
              <Button variant="primary" onClick={onClearFilters}>
                Clear Filters
              </Button>
            ) : undefined
          }
        />
      }
    />
  );
}
