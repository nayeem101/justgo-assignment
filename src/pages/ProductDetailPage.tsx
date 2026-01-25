import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>
      <h1 className="text-3xl font-bold text-foreground">Product {id}</h1>
      {/* Product details will go here */}
    </div>
  );
}
