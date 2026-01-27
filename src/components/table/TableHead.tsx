import type { Column } from '../../types/table';
import { cn } from '../../utils/cn';
import { TableHeaderCell } from './TableHeaderCell';

interface TableHeadProps<T> {
  columns: Column<T>[];
  sticky?: boolean;
}

export function TableHead<T>({ columns, sticky = false }: TableHeadProps<T>) {
  return (
    <thead className={cn(sticky && 'sticky top-0 z-10 p-1')}>
      <tr className="border-b border-slate-200 bg-slate-100/80 backdrop-blur-sm rounded-tl-lg rounded-tr-lg shadow-sm">
        {columns.map((column) => (
          <TableHeaderCell key={column.key} column={column} />
        ))}
      </tr>
    </thead>
  );
}
