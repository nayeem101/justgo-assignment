import type { ReactNode } from 'react';
import type { Column } from '../../types/table';
import { cn } from '../../utils/cn';

interface TableCellProps<T> {
  column: Column<T>;
  item: T;
  index: number;
}

export function TableCell<T>({ column, item, index }: TableCellProps<T>) {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[column.align || 'left'];

  const visibilityClass = cn(
    column.hideOnMobile && 'hidden sm:table-cell',
    column.hideOnTablet && 'hidden lg:table-cell',
  );

  let content: ReactNode;

  if (column.render) {
    content = column.render(item, index);
  } else if (column.accessor) {
    const value = item[column.accessor];
    content = value as ReactNode;
  } else {
    content = null;
  }

  return (
    <td
      className={cn(
        'px-6 py-4 align-middle',
        alignmentClass,
        visibilityClass,
        column.cellClassName,
      )}
      style={{
        width: column.width,
        minWidth: column.width,
        maxWidth: column.width,
      }}
    >
      {content}
    </td>
  );
}
