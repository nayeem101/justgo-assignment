import type { Category } from '../../types/product';
import { CategoryListItem } from './CategoryListItem';
import { cn } from '../../utils/cn';

interface CategoryListProps {
  categories: Category[];
  className?: string;
}

export function CategoryList({ categories, className }: CategoryListProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)}>
      {categories.map((category) => (
        <CategoryListItem key={category.slug} category={category} />
      ))}
    </div>
  );
}
