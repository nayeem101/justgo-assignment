import { type InputHTMLAttributes, forwardRef, type ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leftIcon, rightElement, error, className = '', ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full py-2 bg-slate-50 border border-border rounded-lg
            text-sm text-foreground placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
            transition-all duration-150
            ${leftIcon ? 'pl-10' : 'pl-4'}
            ${rightElement ? 'pr-24' : 'pr-4'}
            ${error ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : ''}
            ${className}
          `}
          {...props}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-1 flex items-center">
            {rightElement}
          </div>
        )}
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
