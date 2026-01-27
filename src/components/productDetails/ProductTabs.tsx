import { Tabs, TabList, TabTrigger, TabContent } from '../ui/Tabs';
import { ProductSpecifications } from './ProductSpecifications';
import { ProductReviews } from './ProductReviews';
import { ProductShipping } from './ProductShipping';
import type { Product } from '../../types/product';

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const reviewCount = product.reviews?.length ?? 0;

  return (
    <Tabs defaultValue="specifications">
      <TabList>
        <TabTrigger value="specifications">Specifications</TabTrigger>
        <TabTrigger value="reviews">
          Reviews {reviewCount > 0 && `(${reviewCount})`}
        </TabTrigger>
        <TabTrigger value="shipping">Shipping & Returns</TabTrigger>
      </TabList>

      <TabContent value="specifications">
        <ProductSpecifications product={product} />
      </TabContent>

      <TabContent value="reviews">
        <ProductReviews product={product} />
      </TabContent>

      <TabContent value="shipping">
        <ProductShipping product={product} />
      </TabContent>
    </Tabs>
  );
}
