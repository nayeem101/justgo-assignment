export function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="h-5 w-72 bg-slate-200 rounded mb-8" />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image gallery skeleton */}
        <div className="space-y-4">
          <div className="aspect-square bg-slate-200 rounded-2xl max-h-96 overflow-hidden border border-slate-200" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-16 h-16 bg-slate-200 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Product info skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-20 bg-slate-200 rounded" />
          <div className="h-8 w-3/4 bg-slate-200 rounded" />
          <div className="h-5 w-32 bg-slate-200 rounded" />
          <div className="flex gap-4">
            <div className="h-8 w-24 bg-slate-200 rounded" />
            <div className="h-8 w-20 bg-slate-200 rounded" />
          </div>
          <div className="space-y-2 pt-4">
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-2/3 bg-slate-200 rounded" />
          </div>
          <div className="flex gap-4 pt-4">
            <div className="h-4 w-24 bg-slate-200 rounded" />
            <div className="h-4 w-32 bg-slate-200 rounded" />
          </div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="mt-12 border-t border-slate-200 pt-8">
        <div className="flex gap-4 mb-6">
          <div className="h-10 w-28 bg-slate-200 rounded" />
          <div className="h-10 w-24 bg-slate-200 rounded" />
          <div className="h-10 w-36 bg-slate-200 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-5 w-24 bg-slate-200 rounded" />
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-4 w-full bg-slate-200 rounded" />
              <div className="h-4 w-2/3 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
