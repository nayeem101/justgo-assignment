import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

interface RatingProps {
  value: number;
  maxValue?: number;
  showValue?: boolean;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Rating({
  value,
  maxValue = 5,
  showValue = true,
  reviewCount,
  size = 'md',
  className,
}: RatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Calculate filled, half, and empty stars
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = maxValue - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(sizeClasses[size], 'text-amber-400 fill-amber-400')}
          />
        ))}

        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star className={cn(sizeClasses[size], 'text-slate-200')} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star
                className={cn(
                  sizeClasses[size],
                  'text-amber-400 fill-amber-400',
                )}
              />
            </div>
          </div>
        )}

        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(sizeClasses[size], 'text-slate-200')}
          />
        ))}
      </div>

      {/* Value and review count */}
      {(showValue || reviewCount !== undefined) && (
        <div className={cn('flex items-center gap-1', textSizeClasses[size])}>
          {showValue && (
            <span className="font-medium text-slate-900">
              {value.toFixed(1)}
            </span>
          )}
          {reviewCount !== undefined && (
            <span className="text-slate-500">
              ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
