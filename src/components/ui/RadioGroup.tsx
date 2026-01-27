import { createContext, useContext, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

// Context for RadioGroup
interface RadioGroupContextValue {
  value: string;
  onChange: (value: string) => void;
  name: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroup components must be used within a RadioGroup');
  }
  return context;
}

// RadioGroup Root
interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  name: string;
  children: ReactNode;
  className?: string;
}

export function RadioGroup({
  value,
  onChange,
  name,
  children,
  className,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onChange, name }}>
      <div role="radiogroup" className={cn('flex flex-col gap-3', className)}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

// RadioGroup Option
interface RadioOptionProps {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export function RadioOption({
  value,
  children,
  className,
  disabled = false,
}: RadioOptionProps) {
  const { value: selectedValue, onChange, name } = useRadioGroupContext();
  const isSelected = selectedValue === value;

  return (
    <label
      className={cn(
        'relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
        'hover:bg-slate-50',
        isSelected
          ? 'border-indigo-500 bg-indigo-50/50'
          : 'border-slate-200 bg-white',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {/* Hidden radio input */}
      <input
        type="radio"
        name={name}
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        disabled={disabled}
        className="sr-only"
      />

      {/* Custom radio circle */}
      <div
        className={cn(
          'shrink-0 w-5 h-5 rounded-full border-2 transition-all',
          'flex items-center justify-center',
          isSelected
            ? 'border-indigo-500 bg-indigo-500'
            : 'border-slate-300 bg-white',
        )}
      >
        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>

      {/* Content */}
      <div className="flex-1">{children}</div>
    </label>
  );
}
