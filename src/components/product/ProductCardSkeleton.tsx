import { Skeleton } from '../ui/Skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-border p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
      {/* Image Skeleton */}
      <Skeleton className="size-20 min-w-20 rounded-lg" />

      {/* Content Skeleton */}
      <div className="flex-1 min-w-0 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full max-w-md" />
        <Skeleton className="h-4 w-3/4 max-w-sm" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      {/* Price Skeleton */}
      <div className="flex flex-col items-end gap-2 sm:pl-4 sm:border-l border-slate-100">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-28 mt-2 rounded-lg" />
      </div>
    </div>
  );
}
