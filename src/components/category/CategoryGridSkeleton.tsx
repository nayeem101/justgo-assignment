import { cn } from '../../utils/cn';

interface CategoryGridSkeletonProps {
  count?: number;
  className?: string;
}

function CategoryCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden animate-pulse">
      {/* Image */}
      <div className="aspect-4/3 bg-slate-200" />

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="h-5 w-2/3 bg-slate-200 rounded" />
        <div className="h-4 w-1/2 bg-slate-200 rounded" />
      </div>
    </div>
  );
}

export function CategoryGridSkeleton({
  count = 8,
  className,
}: CategoryGridSkeletonProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <CategoryCardSkeleton key={index} />
      ))}
    </div>
  );
}
