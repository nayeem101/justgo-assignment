import { Grid, Package, Search, Settings, ShoppingBag } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router';
import { currencyConfig, useSettingsStore } from '../../store/useSettingsStore';
import { Badge } from '../ui/Badge';

interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
  end?: boolean;
}

const navItems: NavItem[] = [
  {
    to: '/products',
    label: 'Products',
    icon: <ShoppingBag className="w-4 h-4" />,
    end: true,
  },
  {
    to: '/products/categories',
    label: 'Categories',
    icon: <Grid className="w-4 h-4" />,
  },
  {
    to: '/products/search',
    label: 'Search',
    icon: <Search className="w-4 h-4" />,
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: <Settings className="w-4 h-4" />,
  },
];

export function Header() {
  // Get current currency from Zustand
  const currency = useSettingsStore((state) => state.currency);
  const { symbol } = currencyConfig[currency];

  return (
    <header className="sticky top-0 z-50 h-16 bg-white border-b border-slate-200 shadow-sm">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/products"
          className="flex items-center gap-2 text-slate-900 hover:text-indigo-600 transition-colors"
        >
          <div className="p-1.5 bg-indigo-100 rounded-lg">
            <Package className="h-5 w-5 text-indigo-600" />
          </div>
          <span className="text-lg font-bold hidden sm:block">
            Product Explorer
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right Side - Currency Display */}
        <div className="flex items-center gap-3">
          {/* Currency Badge */}
          <span title={`Currency: ${symbol} ${currency}`}>
            <Badge variant="default" size="lg">
              {symbol} {currency}
            </Badge>
          </span>

          {/* Mobile Menu Button */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

// Mobile Navigation Component
function MobileNav() {
  const currency = useSettingsStore((state) => state.currency);
  const { symbol } = currencyConfig[currency];

  return (
    <div className="md:hidden relative">
      {/* Mobile menu using details/summary for no-JS support */}
      <details className="group">
        <summary className="flex items-center justify-center w-10 h-10 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer list-none transition-colors">
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6 group-open:hidden"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          {/* Close icon */}
          <svg
            className="w-6 h-6 hidden group-open:block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </summary>

        {/* Mobile Menu Dropdown */}
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-lg py-2 z-50">
          {/* Currency Display */}
          <div className="px-4 py-2 border-b border-slate-100 mb-2">
            <p className="text-xs text-slate-500 mb-1">Current Currency</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-indigo-600">
                {symbol}
              </span>
              <span className="text-sm font-medium text-slate-700">
                {currency}
              </span>
            </div>
          </div>

          {/* Nav Links */}
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
              onClick={(e) => {
                // Close menu on click
                const details = e.currentTarget.closest('details');
                if (details) details.removeAttribute('open');
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </details>
    </div>
  );
}
