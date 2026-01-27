import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { EmptyState } from '../components/EmptyState';
import { ProductDetailSkeleton } from '../components/productDetails/ProductDetailSkeleton';
import { ProductImageGallery } from '../components/productDetails/ProductImageGallery';
import { ProductInfo } from '../components/productDetails/ProductInfo';
import { ProductTabs } from '../components/productDetails/ProductTabs';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { useProductDetail } from '../hooks/queries/useProductDetail';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, isError, error } = useProductDetail(id);

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductDetailSkeleton />
      </div>
    );
  }

  // Error state
  if (isError || !product) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EmptyState
          icon={<AlertCircle className="w-8 h-8" />}
          title="Product not found"
          description={
            error?.message || "We couldn't find the product you're looking for."
          }
          action={
            <Link to="/products">
              <Button
                variant="primary"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to Products
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Products', href: '/products' },
    { label: product.category, href: `/products?category=${product.category}` },
    { label: product.title },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-6">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Image Gallery */}
        <ProductImageGallery images={product.images} title={product.title} />

        {/* Product Info */}
        <ProductInfo product={product} />
      </div>

      {/* Tabs Section */}
      <div className="mt-6 p-2 shadow border border-slate-100 rounded-xl bg-white">
        <ProductTabs product={product} />
      </div>
    </div>
  );
}
