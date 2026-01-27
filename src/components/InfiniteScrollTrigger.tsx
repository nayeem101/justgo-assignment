import { useEffect, useRef } from 'react';
import { Spinner } from './ui/Spinner';

interface InfiniteScrollTriggerProps {
  onIntersect: () => void;
  hasMore: boolean;
  isLoading: boolean;
  threshold?: number;
  rootMargin?: string;
}

export function InfiniteScrollTrigger({
  onIntersect,
  hasMore,
  isLoading,
  threshold = 0.1,
  rootMargin = '100px',
}: InfiniteScrollTriggerProps) {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, [onIntersect, hasMore, isLoading, threshold, rootMargin]);

  if (!hasMore && !isLoading) {
    return (
      <div className="py-8 flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <span className="w-12 h-px bg-border" />
        <span>You&apos;ve reached the end</span>
        <span className="w-12 h-px bg-border" />
      </div>
    );
  }

  return (
    <div
      ref={triggerRef}
      className="py-8 flex flex-col items-center justify-center"
    >
      {isLoading && (
        <>
          <Spinner size="md" className="mb-3" />
          <span className="text-sm font-medium text-muted-foreground animate-pulse">
            Loading more products...
          </span>
        </>
      )}
    </div>
  );
}
