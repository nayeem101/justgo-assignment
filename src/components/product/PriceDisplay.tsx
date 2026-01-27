import { currencyConfig, useSettingsStore } from '../../store/useSettingsStore';
import { cn } from '../../utils/cn';

interface PriceDisplayProps {
  price: number;
  discountPercentage?: number;
  layout?: 'stacked' | 'inline';
  showOriginalPrice?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function PriceDisplay({
  price,
  discountPercentage = 0,
  layout = 'stacked',
  showOriginalPrice = true,
  size = 'md',
}: PriceDisplayProps) {
  const currency = useSettingsStore((state) => state.currency);
  const { rate, locale } = currencyConfig[currency];

  const hasDiscount = discountPercentage > 0;
  const discountedPrice = hasDiscount
    ? price * (1 - discountPercentage / 100)
    : price;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(value * rate);
  };

  const sizeClasses = {
    sm: {
      current: 'text-sm font-medium',
      original: 'text-xs',
    },
    md: {
      current: 'text-base font-semibold',
      original: 'text-sm',
    },
    lg: {
      current: 'text-2xl font-bold',
      original: 'text-base',
    },
  };

  if (layout === 'inline') {
    return (
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            'text-slate-900 tabular-nums',
            sizeClasses[size].current,
          )}
        >
          {formatPrice(discountedPrice)}
        </span>
        {hasDiscount && showOriginalPrice && (
          <span
            className={cn(
              'text-slate-400 line-through tabular-nums',
              sizeClasses[size].original,
            )}
          >
            {formatPrice(price)}
          </span>
        )}
      </div>
    );
  }

  // Stacked layout
  return (
    <div className="flex flex-col items-end">
      <span
        className={cn('text-slate-900 tabular-nums', sizeClasses[size].current)}
      >
        {formatPrice(discountedPrice)}
      </span>
      {hasDiscount && showOriginalPrice && (
        <span
          className={cn(
            'text-slate-400 line-through tabular-nums',
            sizeClasses[size].original,
          )}
        >
          {formatPrice(price)}
        </span>
      )}
    </div>
  );
}
