import { useMemo } from 'react';
import type { Product } from '../types/product';

export function useFilteredByCategory(
  products: Product[],
  category: string,
): Product[] {
  return useMemo(() => {
    if (!category || !products.length) return products;
    return products.filter((product) => product.category === category);
  }, [products, category]);
}
