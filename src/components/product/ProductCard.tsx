import { Link } from 'react-router';
import type { Product } from '../../types/product';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { PriceDisplay } from './PriceDisplay';
import { StockBadge } from './StockBadge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock === 0;
  const hasDiscount = product.discountPercentage > 0;

  return (
    <article
      className={`
        group bg-card rounded-xl shadow-sm border border-border p-6
        hover:shadow-md transition-all duration-200
        flex flex-col sm:flex-row gap-6 items-start sm:items-center
        ${isOutOfStock ? 'opacity-75 grayscale-[0.3] hover:grayscale-0 hover:opacity-100' : ''}
      `}
    >
      {/* Product Image */}
      <div className="size-20 min-w-20 rounded-lg bg-slate-100 overflow-hidden border border-border relative">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {hasDiscount && (
          <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-bl-lg">
            SALE
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
          <h3 className="text-lg font-bold text-foreground">{product.title}</h3>
          <Badge
            variant="default"
            size="sm"
            className="uppercase tracking-wide w-fit"
          >
            {product.category}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 max-w-2xl mb-2">
          {product.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>{product.brand}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span>SKU: {product.sku || `PRD-${product.id}`}</span>
        </div>
      </div>

      {/* Price & Actions */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 sm:gap-1 mt-2 sm:mt-0 pl-0 sm:pl-4 sm:border-l border-slate-100">
        <div className="text-right">
          <PriceDisplay
            price={product.price}
            discountPercentage={product.discountPercentage}
          />
          <StockBadge stock={product.stock} />
        </div>

        <div className="flex items-center gap-2 mt-2">
          {isOutOfStock ? (
            <Button variant="secondary" disabled className="cursor-not-allowed">
              Notify Me
            </Button>
          ) : (
            <Link to={`/products/${product.id}`}>
              <Button variant="primary">View Details</Button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
