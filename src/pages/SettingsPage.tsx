import { Check } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { CurrencySelector } from '../components/settings/CurrencySelector';
import { Button } from '../components/ui/Button';
import { useSettingsStore, type Currency } from '../store/useSettingsStore';

export function SettingsPage() {
  const navigate = useNavigate();

  // Get current value from Zustand
  const storedCurrency = useSettingsStore((state) => state.currency);
  const setCurrency = useSettingsStore((state) => state.setCurrency);

  // Local state for form (allows cancel functionality)
  const [selectedCurrency, setSelectedCurrency] =
    useState<Currency>(storedCurrency);
  const [isSaved, setIsSaved] = useState(false);

  // Check if there are unsaved changes
  const hasChanges = selectedCurrency !== storedCurrency;

  // Handle save
  const handleSave = () => {
    setCurrency(selectedCurrency);
    setIsSaved(true);

    // Reset saved indicator after 2 seconds
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Handle cancel
  const handleCancel = () => {
    if (hasChanges) {
      // Reset to stored value
      setSelectedCurrency(storedCurrency);
    } else {
      // Navigate back
      navigate(-1);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">
          Manage your application preferences and configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Settings Card */}
        <div className="col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Currency Section */}
          <div className="p-6">
            <CurrencySelector
              value={selectedCurrency}
              onChange={setSelectedCurrency}
            />
          </div>

          {/* Actions Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200">
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={!hasChanges && !isSaved}
              leftIcon={isSaved ? <Check className="w-4 h-4" /> : undefined}
            >
              {isSaved ? 'Saved!' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {/* Optional: Preview Section */}
        <div className="col-span-1 p-6 bg-white rounded-2xl border border-slate-200">
          <h3 className="font-medium text-slate-900 mb-2">Preview</h3>
          <p className="text-sm text-slate-500 mb-4">
            See how prices will be displayed with your selected currency.
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            <PricePreview
              label="Sample Price"
              basePrice={99.99}
              currency={selectedCurrency}
            />
            <PricePreview
              label="With Discount"
              basePrice={149.99}
              discountedPrice={119.99}
              currency={selectedCurrency}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Price preview helper component
interface PricePreviewProps {
  label: string;
  basePrice: number;
  discountedPrice?: number;
  currency: Currency;
}

import { currencyConfig } from '../store/useSettingsStore';

function PricePreview({
  label,
  basePrice,
  discountedPrice,
  currency,
}: PricePreviewProps) {
  const config = currencyConfig[currency];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: currency,
    }).format(price * config.rate);
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-bold text-slate-900">
          {formatPrice(discountedPrice ?? basePrice)}
        </span>
        {discountedPrice && (
          <span className="text-sm text-slate-400 line-through">
            {formatPrice(basePrice)}
          </span>
        )}
      </div>
    </div>
  );
}
