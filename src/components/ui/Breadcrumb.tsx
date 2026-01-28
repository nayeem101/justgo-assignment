import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'overflow-x-auto scrollbar-none', // Scrollable, hide scrollbar
        className,
      )}
    >
      <ol className="flex items-center gap-1 text-sm w-max">
        {' '}
        {/* w-max prevents wrapping */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1 shrink-0">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              )}

              {isLast || !item.href ? (
                <span
                  className={cn(
                    'truncate max-w-32 sm:max-w-40 lg:max-w-72', // Smaller on mobile
                    isLast
                      ? 'text-slate-900 font-medium capitalize'
                      : 'text-slate-500',
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="text-slate-500 capitalize hover:text-slate-700 transition-colors truncate max-w-24 md:max-w-40" // Smaller on mobile
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
