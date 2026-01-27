import { cn } from '../../utils/cn';

interface CategoryListSkeletonProps {
  count?: number;
  className?: string;
}

function CategoryListItemSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 animate-pulse">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-slate-200" />
        <div className="space-y-2">
          <div className="h-5 w-32 bg-slate-200 rounded" />
          <div className="h-4 w-24 bg-slate-200 rounded" />
        </div>
      </div>

      {/* Right */}
      <div className="h-4 w-16 bg-slate-200 rounded" />
    </div>
  );
}

export function CategoryListSkeleton({
  count = 8,
  className,
}: CategoryListSkeletonProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <CategoryListItemSkeleton key={index} />
      ))}
    </div>
  );
}
