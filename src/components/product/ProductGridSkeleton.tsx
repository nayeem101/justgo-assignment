import { cn } from '../../utils/cn';

interface ProductGridSkeletonProps {
  count?: number;
  className?: string;
}

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-pulse">
      {/* Image */}
      <div className="aspect-square bg-slate-200" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Brand & Category */}
        <div className="flex items-center justify-between">
          <div className="h-3 w-16 bg-slate-200 rounded" />
          <div className="h-5 w-20 bg-slate-200 rounded-full" />
        </div>

        {/* Title */}
        <div className="h-5 w-3/4 bg-slate-200 rounded" />

        {/* Price & Stock */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="h-5 w-20 bg-slate-200 rounded" />
            <div className="h-3 w-14 bg-slate-200 rounded" />
          </div>
          <div className="h-6 w-16 bg-slate-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({
  count = 8,
  className,
}: ProductGridSkeletonProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
