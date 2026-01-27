import type { Column } from '../../types/table';
import { cn } from '../../utils/cn';

interface TableHeaderCellProps<T> {
  column: Column<T>;
}

export function TableHeaderCell<T>({ column }: TableHeaderCellProps<T>) {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[column.align || 'left'];

  const visibilityClass = cn(
    column.hideOnMobile && 'hidden sm:table-cell',
    column.hideOnTablet && 'hidden lg:table-cell',
  );

  return (
    <th
      className={cn(
        'px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider',
        alignmentClass,
        visibilityClass,
        column.headerClassName,
      )}
      style={{
        width: column.width,
        minWidth: column.width, // Ensure minimum width
      }}
    >
      {column.header}
    </th>
  );
}
