import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type UIEvent,
} from 'react';
import type {
  UseVirtualTableOptions,
  UseVirtualTableReturn,
} from '../types/table';

export function useVirtualTable({
  itemCount,
  itemHeight,
  containerHeight,
  buffer = 5,
  enabled = true,
  onScrollEnd,
  scrollEndThreshold = 200,
  isFetchingMore = false,
}: UseVirtualTableOptions): UseVirtualTableReturn {
  const [scrollTop, setScrollTop] = useState(0);
  const frameId = useRef<number>(0);
  const lastScrollTop = useRef(0);
  const hasTriggeredRef = useRef(false); // Prevent multiple triggers

  // Store latest values in refs
  const onScrollEndRef = useRef(onScrollEnd);
  const scrollEndThresholdRef = useRef(scrollEndThreshold);
  const isFetchingMoreRef = useRef(isFetchingMore);

  // Keep refs in sync
  useLayoutEffect(() => {
    onScrollEndRef.current = onScrollEnd;
    scrollEndThresholdRef.current = scrollEndThreshold;
    isFetchingMoreRef.current = isFetchingMore;
  });

  // Reset trigger flag when fetching completes and new items arrive
  useEffect(() => {
    if (!isFetchingMore) {
      // Small delay to let scroll position stabilize after new items load
      const timer = setTimeout(() => {
        hasTriggeredRef.current = false;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isFetchingMore, itemCount]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  // Optimized scroll handler
  const onScroll = useCallback((e: UIEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const currentScroll = target.scrollTop;

    // Cancel any pending animation frame
    if (frameId.current) {
      cancelAnimationFrame(frameId.current);
    }

    frameId.current = requestAnimationFrame(() => {
      setScrollTop(currentScroll);

      // Check for infinite scroll trigger
      const isScrollingDown = currentScroll > lastScrollTop.current;

      if (isScrollingDown) {
        const scrollBottom =
          target.scrollHeight - currentScroll - target.clientHeight;

        // Only trigger if:
        // 1. Near bottom
        // 2. Not currently fetching
        // 3. Haven't already triggered for this scroll session
        // 4. Handler exists
        if (
          scrollBottom < scrollEndThresholdRef.current &&
          !isFetchingMoreRef.current &&
          !hasTriggeredRef.current &&
          onScrollEndRef.current
        ) {
          hasTriggeredRef.current = true; // Prevent re-trigger
          onScrollEndRef.current();
        }
      }

      lastScrollTop.current = currentScroll;
    });
  }, []);

  // Calculate virtualization bounds
  const virtualBounds = useMemo(() => {
    const totalHeight = itemCount * itemHeight;

    if (!enabled || itemCount === 0) {
      return {
        startIndex: 0,
        endIndex: itemCount,
        paddingTop: 0,
        paddingBottom: 0,
        totalHeight,
      };
    }

    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);

    const endIndex = Math.min(
      itemCount,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + buffer,
    );

    // Round padding values to prevent fractional pixel shifts
    const paddingTop = Math.round(startIndex * itemHeight);
    const paddingBottom = Math.round(
      Math.max(0, (itemCount - endIndex) * itemHeight),
    );

    return {
      startIndex,
      endIndex,
      paddingTop,
      paddingBottom,
      totalHeight,
    };
  }, [scrollTop, itemCount, itemHeight, containerHeight, buffer, enabled]);

  return {
    ...virtualBounds,
    onScroll,
  };
}
