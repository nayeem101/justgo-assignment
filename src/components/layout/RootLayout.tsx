import { Outlet } from 'react-router';
import { Footer } from './Footer';
import { Header } from './Header';

export function RootLayout() {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
