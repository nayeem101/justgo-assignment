import { currencyConfig, useSettingsStore } from '../../store/useSettingsStore';

interface PriceDisplayProps {
  price: number;
  discountPercentage?: number;
  layout?: 'stacked' | 'inline';
  showOriginalPrice?: boolean;
}

export function PriceDisplay({
  price,
  discountPercentage = 0,
  layout = 'stacked',
  showOriginalPrice = true,
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

  if (layout === 'inline') {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-900 tabular-nums">
          {formatPrice(discountedPrice)}
        </span>
        {hasDiscount && showOriginalPrice && (
          <span className="text-xs text-slate-400 line-through tabular-nums">
            {formatPrice(price)}
          </span>
        )}
      </div>
    );
  }

  // Stacked layout (original)
  return (
    <div className="flex flex-col items-end">
      <span className="text-lg font-bold text-slate-900 tabular-nums">
        {formatPrice(discountedPrice)}
      </span>
      {hasDiscount && showOriginalPrice && (
        <span className="text-sm text-slate-400 line-through tabular-nums">
          {formatPrice(price)}
        </span>
      )}
    </div>
  );
}
