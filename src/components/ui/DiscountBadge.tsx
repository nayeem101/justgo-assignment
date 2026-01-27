import { cn } from '../../utils/cn';

interface DiscountBadgeProps {
  percentage: number;
  className?: string;
}

export function DiscountBadge({ percentage, className }: DiscountBadgeProps) {
  if (percentage <= 0) return null;

  return (
    <span
      className={cn(
        'absolute top-3 right-3 z-10',
        'px-2 py-1 rounded-lg',
        'text-xs font-bold text-white',
        'bg-red-500 shadow-sm',
        className,
      )}
    >
      -{Math.round(percentage)}%
    </span>
  );
}
