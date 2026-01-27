import { Rating } from '../ui/Rating';
import { PriceDisplay } from '../product/PriceDisplay';
import { StockBadge } from '../product/StockBadge';
import type { Product } from '../../types/product';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const reviewCount = product.reviews?.length ?? 0;

  return (
    <div className="flex flex-col gap-4 bg-white p-4 lg:p-6 shadow border border-slate-100 rounded-xl">
      {/* Brand */}
      {product.brand && (
        <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
          {product.brand}
        </span>
      )}

      {/* Title */}
      <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
        {product.title}
      </h1>

      {/* Rating */}
      <Rating value={product.rating} reviewCount={reviewCount} size="md" />

      {/* Price & Stock */}
      <div className="flex items-center gap-4 flex-wrap">
        <PriceDisplay
          price={product.price}
          discountPercentage={product.discountPercentage}
          layout="inline"
          size="lg"
        />
        <StockBadge stock={product.stock} />
      </div>

      {/* Description */}
      <p className="text-slate-600 leading-relaxed">{product.description}</p>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-slate-100">
        {product.sku && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">SKU:</span>
            <span className="text-slate-700 font-medium">{product.sku}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500">Category:</span>
          <span className="text-slate-700 font-medium capitalize">
            {product.category}
          </span>
        </div>

        {product.tags && product.tags.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Tags:</span>
            <span className="text-slate-700">{product.tags.join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
