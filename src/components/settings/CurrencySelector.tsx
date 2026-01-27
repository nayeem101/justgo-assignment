import { DollarSign } from 'lucide-react';
import { RadioGroup, RadioOption } from '../ui/RadioGroup';
import { Badge } from '../ui/Badge';
import type { Currency } from '../../store/useSettingsStore';

interface CurrencyOption {
  code: Currency;
  symbol: string;
  name: string;
  fullName: string;
  rate: number;
}

const currencyOptions: CurrencyOption[] = [
  {
    code: 'USD',
    symbol: '$',
    name: 'USD',
    fullName: 'United States Dollar',
    rate: 1.0,
  },
  {
    code: 'GBP',
    symbol: '£',
    name: 'Pound',
    fullName: 'British Pound Sterling',
    rate: 0.79,
  },
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    fullName: 'European Union Euro',
    rate: 0.92,
  },
];

interface CurrencySelectorProps {
  value: Currency;
  onChange: (value: Currency) => void;
}

export function CurrencySelector({ value, onChange }: CurrencySelectorProps) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4 sm:p-6">
      {/* Section Header */}
      <div className="flex items-start gap-3 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg shrink-0">
          <DollarSign className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h2 className="font-semibold text-slate-900">Currency</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Choose your preferred currency for product pricing.
          </p>
        </div>
      </div>

      {/* Currency Options */}
      <RadioGroup
        name="currency"
        value={value}
        onChange={(val) => onChange(val as Currency)}
      >
        {currencyOptions.map((option) => (
          <RadioOption key={option.code} value={option.code}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              {/* Currency Name */}
              <span className="font-medium text-slate-900">
                {option.name} ({option.symbol})
              </span>

              {/* Rate & Full Name */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-sm text-slate-500">
                  1 USD = {option.rate.toFixed(2)} {option.code}
                </span>
                <Badge
                  variant="default"
                  size="sm"
                  className="hidden sm:inline-flex"
                >
                  {option.fullName}
                </Badge>
              </div>
            </div>
          </RadioOption>
        ))}
      </RadioGroup>
    </div>
  );
}
