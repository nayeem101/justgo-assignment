import { cn } from '../../utils/cn';
import type { Column } from '../../types/table';

interface TableSkeletonProps<T> {
  columns: Column<T>[];
  rowCount: number;
  rowHeight?: number;
}

function SkeletonRow<T>({
  columns,
  rowHeight,
}: {
  columns: Column<T>[];
  rowHeight?: number;
}) {
  return (
    <tr className="border-b border-slate-100" style={{ height: rowHeight }}>
      {columns.map((column) => {
        // Responsive visibility
        const visibilityClass = cn(
          column.hideOnMobile && 'hidden sm:table-cell',
          column.hideOnTablet && 'hidden lg:table-cell',
        );

        // Special skeleton for image column
        if (column.key === 'image') {
          return (
            <td key={column.key} className={cn('px-6 py-4', visibilityClass)}>
              <div className="size-12 rounded-lg bg-slate-200 animate-pulse" />
            </td>
          );
        }

        // Special skeleton for product column (two lines)
        if (column.key === 'product') {
          return (
            <td key={column.key} className={cn('px-6 py-4', visibilityClass)}>
              <div className="flex flex-col gap-2">
                <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
              </div>
            </td>
          );
        }

        return (
          <td key={column.key} className={cn('px-6 py-4', visibilityClass)}>
            <div className="h-4 w-20 bg-slate-200 rounded animate-pulse" />
          </td>
        );
      })}
    </tr>
  );
}

export function TableSkeleton<T>({
  columns,
  rowCount,
  rowHeight,
}: TableSkeletonProps<T>) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, index) => (
        <SkeletonRow
          key={`skeleton-${index}`}
          columns={columns}
          rowHeight={rowHeight}
        />
      ))}
    </>
  );
}
