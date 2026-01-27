import { type ReactNode } from 'react';
import { Badge } from '../ui/Badge';

interface PageHeaderProps {
  title: string;
  count?: number;
  countLabel?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  count,
  countLabel = 'items',
  actions,
  className = '',
}: PageHeaderProps) {
  return (
    <div
      className={`
        flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8
        ${className}
      `}
    >
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          {title}
        </h1>
        {typeof count === 'number' && (
          <Badge variant="primary" size="md">
            {count} {countLabel}
          </Badge>
        )}
      </div>

      {actions && <div className="flex gap-3">{actions}</div>}
    </div>
  );
}
