import { currencyConfig, useSettingsStore } from '../../store/useSettingsStore';

interface PriceDisplayProps {
  price: number;
  discountPercentage?: number;
  className?: string;
}

export function PriceDisplay({
  price,
  discountPercentage = 0,
  className = '',
}: PriceDisplayProps) {
  const currency = useSettingsStore((state) => state.currency);
  const config = currencyConfig[currency];

  const convertedPrice = price * config.rate;
  const discountedPrice =
    discountPercentage > 0
      ? convertedPrice * (1 - discountPercentage / 100)
      : convertedPrice;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const hasDiscount = discountPercentage > 0;

  return (
    <div className={`text-right ${className}`}>
      <div className="flex items-center justify-end gap-2">
        {hasDiscount && (
          <span className="text-sm text-slate-400 line-through">
            {formatPrice(convertedPrice)}
          </span>
        )}
        <span
          className={`
            text-xl font-extrabold tabular-nums
            ${hasDiscount ? 'text-red-600' : 'text-foreground'}
          `}
        >
          {formatPrice(discountedPrice)}
        </span>
      </div>
    </div>
  );
}
