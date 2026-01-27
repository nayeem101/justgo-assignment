import { cn } from '../../utils/cn';

interface StockBadgeProps {
  stock: number;
  showCount?: boolean;
}

type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

function getStockStatus(stock: number): StockStatus {
  if (stock === 0) return 'out-of-stock';
  if (stock <= 10) return 'low-stock';
  return 'in-stock';
}
const statusConfig: Record<
  StockStatus,
  { label: string; dotClass: string; badgeClass: string }
> = {
  'in-stock': {
    label: 'In Stock',
    dotClass: 'bg-emerald-500',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  },
  'low-stock': {
    label: 'Low Stock',
    dotClass: 'bg-amber-500',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-100',
  },
  'out-of-stock': {
    label: 'Out of Stock',
    dotClass: 'bg-red-500',
    badgeClass: 'bg-red-50 text-red-700 border-red-100',
  },
};

export function StockBadge({ stock, showCount = false }: StockBadgeProps) {
  const status = getStockStatus(stock);
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.badgeClass,
      )}
    >
      <span className={cn('size-1.5 rounded-full', config.dotClass)} />
      {config.label}
      {showCount && status !== 'out-of-stock' && (
        <span className="text-xs opacity-75">({stock})</span>
      )}
    </span>
  );
}
