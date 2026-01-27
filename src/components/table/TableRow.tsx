import type { CSSProperties } from 'react';
import type { Column } from '../../types/table';
import { cn } from '../../utils/cn';
import { TableCell } from './TableCell';

interface TableRowProps<T> {
  item: T;
  index: number;
  columns: Column<T>[];
  style?: CSSProperties;
}

export function TableRow<T>({ item, index, columns, style }: TableRowProps<T>) {
  return (
    <tr
      className={cn(
        'group',
        'hover:bg-slate-50',
        'text-slate-500',
        'transition-colors duration-150',
        'border-b border-slate-100 last:border-b-0',
      )}
      style={style}
    >
      {columns.map((column) => (
        <TableCell key={column.key} column={column} item={item} index={index} />
      ))}
    </tr>
  );
}
