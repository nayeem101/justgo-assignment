import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Currency = 'USD' | 'GBP' | 'EUR';

interface SettingsState {
  currency: Currency;
  setCurrency: (val: Currency) => void;
}

export const currencyConfig = {
  USD: { symbol: '$', rate: 1, locale: 'en-US' },
  GBP: { symbol: '£', rate: 0.79, locale: 'en-GB' },
  EUR: { symbol: '€', rate: 0.92, locale: 'de-DE' },
} as const;

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      currency: 'USD',
      setCurrency: (currency) => set({ currency }),
    }),
    { name: 'app-settings' },
  ),
);
