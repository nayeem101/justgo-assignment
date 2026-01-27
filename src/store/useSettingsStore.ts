import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Currency = 'USD' | 'GBP' | 'EUR';
export type ViewMode = 'grid' | 'list';

interface SettingsState {
  // Currency settings
  currency: Currency;
  setCurrency: (val: Currency) => void;

  // View mode settings
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
}

export const currencyConfig: Record<
  Currency,
  { symbol: string; rate: number; locale: string }
> = {
  USD: { symbol: '$', rate: 1, locale: 'en-US' },
  GBP: { symbol: '£', rate: 0.79, locale: 'en-GB' },
  EUR: { symbol: '€', rate: 0.92, locale: 'de-DE' },
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Currency settings
      currency: 'USD',
      setCurrency: (currency) => set({ currency }),

      // View mode settings
      viewMode: 'grid',
      setViewMode: (viewMode) => set({ viewMode }),
      toggleViewMode: () =>
        set((state) => ({
          viewMode: state.viewMode === 'grid' ? 'list' : 'grid',
        })),
    }),
    { name: 'app-settings' },
  ),
);
