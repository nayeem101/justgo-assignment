import { Link } from 'react-router';
import type { Product } from '../../types/product';
import { Badge } from '../ui/Badge';
import { PriceDisplay } from './PriceDisplay';
import { StockBadge } from './StockBadge';
import { DiscountBadge } from '../ui/DiscountBadge';

interface ProductGridCardProps {
  product: Product;
}

export function ProductGridCard({ product }: ProductGridCardProps) {
  const hasDiscount = product.discountPercentage > 0;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square bg-slate-50 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <DiscountBadge percentage={product.discountPercentage} />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between gap-2 mb-2">
          {product.brand && (
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide truncate">
              {product.brand}
            </span>
          )}
          <Badge variant="default" size="sm" className="shrink-0 capitalize">
            {product.category}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-slate-900 mb-3 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {product.title}
        </h3>

        {/* Price & Stock */}
        <div className="flex items-end justify-between gap-2">
          <PriceDisplay
            price={product.price}
            discountPercentage={product.discountPercentage}
            layout="stacked"
            size="md"
          />
          <StockBadge stock={product.stock} />
        </div>
      </div>
    </Link>
  );
}
