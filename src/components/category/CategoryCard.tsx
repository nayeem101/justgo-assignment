import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import type { Category } from '../../types/product';

interface CategoryCardProps {
  category: Category;
}

// Placeholder images for categories (since API doesn't provide them)
export const categoryImages: Record<string, string> = {
  beauty:
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
  fragrances:
    'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop',
  furniture:
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
  groceries:
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
  'home-decoration':
    'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=400&h=300&fit=crop',
  'kitchen-accessories':
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
  laptops:
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
  'mens-shirts':
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=300&fit=crop',
  'mens-shoes':
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
  'mens-watches':
    'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop',
  'mobile-accessories':
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop',
  motorcycle:
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=300&fit=crop',
  'skin-care':
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop',
  smartphones:
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
  'sports-accessories':
    'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400&h=300&fit=crop',
  sunglasses:
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop',
  tablets:
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
  tops: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=300&fit=crop',
  vehicle:
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop',
  'womens-bags':
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop',
  'womens-dresses':
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop',
  'womens-jewellery':
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
  'womens-shoes':
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=300&fit=crop',
  'womens-watches':
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
};

export const defaultImage =
  'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop';

export function CategoryCard({ category }: CategoryCardProps) {
  const imageUrl = categoryImages[category.slug] || defaultImage;

  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={imageUrl}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
          {category.name}
        </h3>

        {/* Explore Link */}
        <div className="flex items-center gap-1 text-sm text-indigo-600 font-medium group-hover:gap-2 transition-all">
          <span>Explore category</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
