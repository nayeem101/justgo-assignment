import { type ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center py-16 px-4 text-center
        bg-card rounded-xl border border-border
        ${className}
      `}
    >
      {icon && (
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
      {action}
    </div>
  );
}
