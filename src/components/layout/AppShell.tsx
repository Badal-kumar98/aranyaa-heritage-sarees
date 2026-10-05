import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';
import Toaster from './Toaster';
import CartDrawer from '../commerce/CartDrawer';
import SearchOverlay from '../commerce/SearchOverlay';

const AppShell = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <CartDrawer />
      <SearchOverlay />
      <Toaster />
    </div>
  );
};

export default AppShell;
