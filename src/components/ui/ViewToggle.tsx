import { LayoutGrid, List } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { ViewMode } from '../../store/useSettingsStore';

interface ViewToggleProps {
  value: ViewMode;
  onChange: (mode: ViewMode) => void;
  className?: string;
}

export function ViewToggle({ value, onChange, className }: ViewToggleProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center p-1 bg-slate-100 rounded-lg',
        className,
      )}
      role="radiogroup"
      aria-label="View mode"
    >
      <button
        type="button"
        role="radio"
        aria-checked={value === 'grid'}
        onClick={() => onChange('grid')}
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-md transition-all',
          value === 'grid'
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-slate-500 hover:text-slate-700',
        )}
        title="Grid view"
      >
        <LayoutGrid className="w-4 h-4" />
        <span className="sr-only">Grid view</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={value === 'list'}
        onClick={() => onChange('list')}
        className={cn(
          'flex items-center justify-center w-9 h-9 rounded-md transition-all',
          value === 'list'
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-slate-500 hover:text-slate-700',
        )}
        title="List view"
      >
        <List className="w-4 h-4" />
        <span className="sr-only">List view</span>
      </button>
    </div>
  );
}
