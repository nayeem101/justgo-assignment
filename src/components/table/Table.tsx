import { useVirtualTable } from '../../hooks/useVirtualTable';
import type { TableProps } from '../../types/table';
import { cn } from '../../utils/cn';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';

const DEFAULT_ROW_HEIGHT = 73;
const DEFAULT_CONTAINER_HEIGHT = 600;
const DEFAULT_OVERSCAN = 5;

export function Table<T>({
  data,
  columns,
  keyExtractor,
  isLoading = false,
  skeletonCount = 5,
  isFetchingMore = false,
  virtualized = false,
  rowHeight = DEFAULT_ROW_HEIGHT,
  containerHeight = DEFAULT_CONTAINER_HEIGHT,
  overscan = DEFAULT_OVERSCAN,
  className,
  tableClassName,
  emptyState,
  onScrollEnd,
  scrollEndThreshold = 200,
  onRowClick,
  clickableOnMobile,
}: TableProps<T>) {
  const columnCount = columns.length;

  // Virtualization hook
  const { startIndex, endIndex, paddingTop, paddingBottom, onScroll } =
    useVirtualTable({
      itemCount: data.length,
      itemHeight: rowHeight,
      containerHeight,
      buffer: overscan,
      enabled: virtualized && !isLoading,
      onScrollEnd,
      scrollEndThreshold,
      isFetchingMore,
    });

  // Empty state
  if (!isLoading && data.length === 0 && emptyState) {
    return (
      <div
        className={cn('bg-white rounded-lg border border-slate-200', className)}
      >
        {emptyState}
      </div>
    );
  }

  // Non-virtualized table (simple version)
  if (!virtualized) {
    return (
      <div
        className={cn(
          'bg-white rounded-lg shadow-sm',
          'border border-slate-200',
          'overflow-x-auto',
          className,
        )}
      >
        <table className={cn('w-full', tableClassName)}>
          <TableHead columns={columns} />
          <TableBody
            data={data}
            columns={columns}
            keyExtractor={keyExtractor}
            isLoading={isLoading}
            skeletonCount={skeletonCount}
            isFetchingMore={isFetchingMore}
            onRowClick={onRowClick}
            clickableOnMobile={clickableOnMobile}
          />
        </table>
      </div>
    );
  }

  // Virtualized table - spacers INSIDE tbody for stable sticky header
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-sm',
        'border border-slate-200',
        className,
      )}
    >
      <div
        onScroll={onScroll}
        className="overflow-auto"
        style={{
          maxHeight: containerHeight,
          willChange: 'scroll-position',
        }}
      >
        <table className={cn('w-full border-collapse', tableClassName)}>
          {/* Sticky header */}
          <TableHead columns={columns} sticky />

          {/* Body with internal spacers */}
          <TableBody
            data={data}
            columns={columns}
            keyExtractor={keyExtractor}
            startIndex={startIndex}
            endIndex={endIndex}
            rowHeight={rowHeight}
            isLoading={isLoading}
            skeletonCount={skeletonCount}
            isFetchingMore={isFetchingMore}
            // Virtualization spacers - rendered inside tbody
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
            columnCount={columnCount}
            onRowClick={onRowClick}
            clickableOnMobile={clickableOnMobile}
          />
        </table>
      </div>
    </div>
  );
}
