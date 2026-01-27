import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ChipProps {
  label: string;
  value?: string;
  onRemove?: () => void;
  variant?: 'default' | 'primary' | 'success';
  className?: string;
}

export function Chip({
  label,
  value,
  onRemove,
  variant = 'default',
  className,
}: ChipProps) {
  const variantClasses = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border',
        variantClasses[variant],
        className,
      )}
    >
      {value ? (
        <>
          <span className="text-slate-500">{label}:</span>
          <span>{value}</span>
        </>
      ) : (
        <span>{label}</span>
      )}

      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 p-0.5 rounded-full hover:bg-black/10 transition-colors"
          aria-label={`Remove ${label} filter`}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </span>
  );
}
