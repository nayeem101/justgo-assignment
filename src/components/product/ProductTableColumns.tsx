import type { Product } from '../../types/product';
import { Badge } from '../ui/Badge';
import { PriceDisplay } from './PriceDisplay';
import { StockBadge } from './StockBadge';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import type { Column } from '../../types/table';
import { Button } from '../ui/Button';

// Column definitions for product table
export const productColumns: Column<Product>[] = [
  {
    key: 'image',
    header: 'Image',
    width: '80px',
    render: (product) => (
      <div className="size-12 rounded-lg bg-slate-100  overflow-hidden border border-slate-200 shrink-0">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    ),
  },
  {
    key: 'product',
    header: 'Product',
    width: '250px', // Fixed width for product column
    cellClassName: 'max-w-[250px]', // Ensure cell respects width
    render: (product) => (
      <div className="flex flex-col min-w-0">
        {' '}
        {/* min-w-0 for text truncation */}
        <span className="font-bold text-slate-900 text-sm truncate">
          {product.title}
        </span>
        <span className="text-xs text-slate-500  truncate">
          {product.brand || 'Unknown Brand'}
        </span>
      </div>
    ),
  },
  {
    key: 'category',
    header: 'Category',
    width: '150px',
    hideOnMobile: true,
    render: (product) => (
      <Badge variant="default" size="sm">
        {product.category}
      </Badge>
    ),
  },
  {
    key: 'price',
    header: 'Price',
    width: '150px',
    render: (product) => (
      <PriceDisplay
        price={product.price}
        discountPercentage={product.discountPercentage}
        layout="inline"
      />
    ),
  },
  {
    key: 'stock',
    header: 'Stock',
    width: '120px',
    hideOnMobile: true,
    hideOnTablet: true,
    render: (product) => <StockBadge stock={product.stock} />,
  },
  {
    key: 'actions',
    header: 'Action',
    width: '100px',
    align: 'right',
    render: (product) => (
      <Link to={`/products/${product.id}`}>
        <Button variant="outline" size="sm">
          View
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    ),
  },
];
