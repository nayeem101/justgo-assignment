import { useMemo } from 'react';
import type { Product } from '../types/product';

export type SortOption =
  | 'price-asc'
  | 'price-desc'
  | 'title-asc'
  | 'title-desc'
  | '';

export function useSortedProducts(
  products: Product[],
  sortBy: string,
): Product[] {
  return useMemo(() => {
    if (!sortBy || !products.length) return products;

    return [...products].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [products, sortBy]);
}
