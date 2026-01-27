import type { Column } from '../../types/table';
import { cn } from '../../utils/cn';
import { TableHeaderCell } from './TableHeaderCell';

interface TableHeadProps<T> {
  columns: Column<T>[];
  sticky?: boolean;
}

export function TableHead<T>({ columns, sticky = false }: TableHeadProps<T>) {
  return (
    <thead
      className={cn('bg-slate-100', sticky && 'sticky top-0 z-10')}
      // Ensure sticky works during fast scrolling
      style={sticky ? { position: 'sticky', top: 0 } : undefined}
    >
      <tr className="border-b border-slate-200 bg-slate-100 shadow-sm">
        {columns.map((column) => (
          <TableHeaderCell
            key={column.key}
            column={column}
            // Pass sticky prop to ensure th has background
            sticky={sticky}
          />
        ))}
      </tr>
    </thead>
  );
}
