import type { Column } from '../../types/table';
import { cn } from '../../utils/cn';

interface TableHeaderCellProps<T> {
  column: Column<T>;
  sticky?: boolean;
}

// Helper to get text alignment class
function getAlignClass(align?: 'left' | 'center' | 'right'): string {
  switch (align) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return 'text-left';
  }
}

export function TableHeaderCell<T>({
  column,
  sticky,
}: TableHeaderCellProps<T>) {
  return (
    <th
      className={cn(
        'px-6 py-3',
        'text-xs font-semibold text-slate-600 uppercase tracking-wider',
        sticky && 'bg-slate-100',
        getAlignClass(column.align),
        column.headerClassName,
        column.hideOnMobile && 'hidden sm:table-cell',
        column.hideOnTablet && 'hidden lg:table-cell',
      )}
      style={{ width: column.width }}
    >
      {column.header}
    </th>
  );
}
