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

  // Virtualization spacers (rendered inside tbody)
  paddingTop?: number;
  paddingBottom?: number;
  columnCount?: number;

  // Loading states
  isLoading?: boolean;
  skeletonCount?: number;
  isFetchingMore?: boolean;

  // Row click
  onRowClick?: (item: T) => void;
  clickableOnMobile?: boolean;
}

export function TableBody<T>({
  data,
  columns,
  keyExtractor,
  startIndex = 0,
  endIndex,
  rowHeight,
  paddingTop = 0,
  paddingBottom = 0,
  columnCount,
  isLoading,
  skeletonCount = 5,
  isFetchingMore,
  onRowClick,
  clickableOnMobile = false,
}: TableBodyProps<T>) {
  const colSpan = columnCount ?? columns.length;

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
      {/* Top spacer row - inside tbody for stable sticky header */}
      {paddingTop > 0 && (
        <tr aria-hidden="true">
          <td
            colSpan={colSpan}
            style={{
              height: paddingTop,
              padding: 0,
              border: 'none',
              lineHeight: 0,
            }}
          />
        </tr>
      )}

      {/* Data rows */}
      {visibleData.map((item, idx) => {
        const actualIndex = startIndex + idx;
        return (
          <TableRow
            key={keyExtractor(item)}
            item={item}
            index={actualIndex}
            columns={columns}
            onClick={onRowClick ? () => onRowClick(item) : undefined}
            clickableOnMobile={clickableOnMobile}
            style={rowHeight ? { height: rowHeight } : undefined}
          />
        );
      })}

      {/* Fetching more skeleton */}
      {isFetchingMore && (
        <TableSkeleton columns={columns} rowCount={3} rowHeight={rowHeight} />
      )}

      {/* Bottom spacer row - inside tbody for stable sticky header */}
      {paddingBottom > 0 && (
        <tr aria-hidden="true">
          <td
            colSpan={colSpan}
            style={{
              height: paddingBottom,
              padding: 0,
              border: 'none',
              lineHeight: 0,
            }}
          />
        </tr>
      )}
    </tbody>
  );
}
