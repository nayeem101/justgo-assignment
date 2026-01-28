import type { ReactNode, UIEvent } from 'react';
import type { Product } from './product';

export interface Column<T> {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  headerClassName?: string;
  cellClassName?: string;
  accessor?: keyof T;
  render?: (item: T, index: number) => ReactNode;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
  isLoading?: boolean;
  skeletonCount?: number;
  isFetchingMore?: boolean;
  virtualized?: boolean;
  rowHeight?: number;
  containerHeight?: number;
  overscan?: number;
  className?: string;
  tableClassName?: string;
  emptyState?: ReactNode;
  onScrollEnd?: () => void;
  scrollEndThreshold?: number;
  onRowClick?: (item: T) => void;
  clickableOnMobile?: boolean;
}

export interface ProductTableProps {
  products: Product[];
  isLoading?: boolean;
  isFetchingMore?: boolean;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
  onScrollEnd?: () => void;
  virtualized?: boolean;
  containerHeight?: number;
}

// options for useVirtualTable
export interface UseVirtualTableOptions {
  itemCount: number;
  itemHeight: number;
  containerHeight: number;
  buffer?: number; // Extra rows to render above/below viewport
  enabled?: boolean;
  onScrollEnd?: () => void;
  scrollEndThreshold?: number;
  isFetchingMore?: boolean; // Prevent trigger during fetch
}

// Return type for useVirtualTable
export interface UseVirtualTableReturn {
  startIndex: number;
  endIndex: number;
  paddingTop: number;
  paddingBottom: number;
  totalHeight: number;
  onScroll: (e: UIEvent<HTMLElement>) => void;
}
