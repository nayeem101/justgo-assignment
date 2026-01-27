import { type SelectHTMLAttributes, forwardRef, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'children'
> {
  options: SelectOption[];
  placeholder?: string;
  leftIcon?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder, leftIcon, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            {leftIcon}
          </div>
        )}
        <select
          ref={ref}
          className={`
            appearance-none w-full py-2 pr-10 
            bg-card border border-border rounded-lg
            text-sm font-medium text-slate-700
            hover:bg-slate-50
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
            transition-all duration-150 cursor-pointer shadow-sm
            ${leftIcon ? 'pl-10' : 'pl-3'}
            ${className}
          `}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    );
  },
);

Select.displayName = 'Select';
