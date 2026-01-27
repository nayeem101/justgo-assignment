interface StockBadgeProps {
  stock: number;
  className?: string;
}

type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

function getStockStatus(stock: number): StockStatus {
  if (stock === 0) return 'out-of-stock';
  if (stock <= 10) return 'low-stock';
  return 'in-stock';
}

const statusConfig: Record<
  StockStatus,
  { label: string; dotColor: string; textColor: string }
> = {
  'in-stock': {
    label: 'In Stock',
    dotColor: 'bg-emerald-500',
    textColor: 'text-emerald-700',
  },
  'low-stock': {
    label: 'Low Stock',
    dotColor: 'bg-amber-500',
    textColor: 'text-amber-700',
  },
  'out-of-stock': {
    label: 'Out of Stock',
    dotColor: 'bg-red-500',
    textColor: 'text-red-700',
  },
};

export function StockBadge({ stock, className = '' }: StockBadgeProps) {
  const status = getStockStatus(stock);
  const config = statusConfig[status];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 text-xs font-medium
        ${config.textColor}
        ${className}
      `}
    >
      <span className={`size-1.5 rounded-full ${config.dotColor}`} />
      {config.label} {stock > 0 && `(${stock})`}
    </span>
  );
}
