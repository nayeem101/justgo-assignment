import type { Column } from '../../types/table';
import { TableRow } from './TableRow';
import { TableSkeleton } from './TableSkeleton';

interface TableBodyProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;

  // Virtualization (index-based)
  startIndex?: number;
  endIndex?: number;
  rowHeight?: number;

  // Loading states
  isLoading?: boolean;
  skeletonCount?: number;
  isFetchingMore?: boolean;
}

export function TableBody<T>({
  data,
  columns,
  keyExtractor,
  startIndex = 0,
  endIndex,
  rowHeight,
  isLoading,
  skeletonCount = 5,
  isFetchingMore,
}: TableBodyProps<T>) {
  // Initial loading state
  if (isLoading) {
    return (
      <tbody>
        <TableSkeleton
          columns={columns}
          rowCount={skeletonCount}
          rowHeight={rowHeight}
        />
      </tbody>
    );
  }

  // Determine slice of data to render
  const effectiveEndIndex = endIndex ?? data.length;
  const visibleData = data.slice(startIndex, effectiveEndIndex);

  return (
    <tbody>
      {/* Data rows */}
      {visibleData.map((item, idx) => {
        const actualIndex = startIndex + idx;
        return (
          <TableRow
            key={keyExtractor(item)}
            item={item}
            index={actualIndex}
            columns={columns}
            style={rowHeight ? { height: rowHeight } : undefined}
          />
        );
      })}

      {/* Fetching more skeleton */}
      {isFetchingMore && (
        <TableSkeleton columns={columns} rowCount={3} rowHeight={rowHeight} />
      )}
    </tbody>
  );
}
