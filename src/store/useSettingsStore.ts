import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Currency = 'USD' | 'GBP' | 'EUR';

interface SettingsState {
  currency: Currency;
  setCurrency: (val: Currency) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      currency: 'USD',
      setCurrency: (currency) => set({ currency }),
    }),
    { name: 'app-settings' },
  ),
);
