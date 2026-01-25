import { Package, Settings } from 'lucide-react';
import { Link, NavLink } from 'react-router';

export function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 bg-card border-b border-border shadow-sm">
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/products"
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
        >
          <Package className="h-6 w-6" />
          <span className="text-lg font-bold">Product Explorer</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink
            to="/products"
            end
            className={({ isActive }) =>
              `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/products/categories"
            className={({ isActive }) =>
              `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/products/search"
            className={({ isActive }) =>
              `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`
            }
          >
            Search
          </NavLink>
        </nav>

        {/* Settings */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `p-2 rounded-md transition-colors ${
              isActive
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`
          }
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </NavLink>
      </div>
    </header>
  );
}
