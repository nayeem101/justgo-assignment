import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import type { Category } from '../../types/product';
import { categoryImages, defaultImage } from './CategoryCard';

interface CategoryListItemProps {
  category: Category;
}

export function CategoryListItem({ category }: CategoryListItemProps) {
  const imageUrl = categoryImages[category.slug] || defaultImage;
  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
    >
      {/* Left: Icon + Name */}
      <div className="flex items-center gap-4">
        <div className="shrink-0 w-16 h-16 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
          <img
            src={imageUrl}
            alt={category.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-slate-500">/{category.slug}</p>
        </div>
      </div>

      {/* Right: Arrow */}
      <div className="flex items-center gap-2 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-sm font-medium">Explore</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
