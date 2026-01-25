import { Navigate, Route, Routes } from 'react-router';
import { ErrorBoundary } from './components/ErrorBoundary';
import { RootLayout } from './components/layout/RootLayout';
import { CategoriesPage } from './pages/CategoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProductsPage } from './pages/ProductsPage';
import { SearchPage } from './pages/SearchPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Root layout wraps all pages */}
        <Route element={<RootLayout />}>
          {/* Redirect root to products */}
          <Route index element={<Navigate to="/products" replace />} />

          {/* Products routes */}
          <Route path="products">
            {/* /products - Product list */}
            <Route index element={<ProductsPage />} />

            {/* /products/categories - Must be before :id */}
            <Route path="categories" element={<CategoriesPage />} />

            {/* /products/search - Must be before :id */}
            <Route path="search" element={<SearchPage />} />

            {/* /products/:id - Dynamic route last */}
            <Route path=":id" element={<ProductDetailPage />} />
          </Route>

          {/* Settings */}
          <Route path="settings" element={<SettingsPage />} />

          {/* 404 catch-all */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
