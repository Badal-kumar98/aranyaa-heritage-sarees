import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { openOverlay } from '../../store/searchSlice';
import { openDrawer } from '../../store/cartSlice';
import { openMobileNav } from '../../store/uiSlice';
import { useCartTotals } from '../../hooks/useCartTotals';
import { useEffect, useState } from 'react';
import { cn } from '../../utils/format';

const NAV = [
  { label: 'New Arrivals', to: '/new-arrivals' },
  { label: 'Shop', to: '/shop' },
  { label: 'Collections', to: '/collections' },
  { label: 'Craft', to: '/craft' },
  { label: 'Journal', to: '/journal' },
];

const Header = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { count } = useCartTotals();
  const wishlistCount = useAppSelector((s) => s.wishlist.ids.length);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-cream/95 backdrop-blur-md border-b border-hairline'
          : 'bg-transparent'
      )}
    >
      {/* announcement */}
      <div className="bg-ink text-cream text-[11px] tracking-[0.22em] uppercase">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-8 flex items-center justify-center gap-8 overflow-hidden">
          <span className="whitespace-nowrap">Complimentary blouse stitching · India-wide shipping in 72 hrs</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="h-16 lg:h-20 flex items-center justify-between gap-6">
          {/* left / mobile menu */}
          <div className="flex items-center gap-6 lg:w-1/3">
            <button
              onClick={() => dispatch(openMobileNav())}
              className="lg:hidden p-1 -ml-1 text-ink"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <nav className="hidden lg:flex items-center gap-7 text-[13px]">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    cn(
                      'link-underline py-1 tracking-wide text-ink-soft hover:text-ink transition-colors',
                      isActive && 'text-ink font-medium'
                    )
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* logo */}
          <Link
            to="/"
            className="flex-1 lg:flex-none lg:w-1/3 flex justify-center"
            aria-label="Aranyaa home"
          >
            <div className="font-display text-[26px] lg:text-[30px] tracking-[0.22em] text-ink leading-none">
              ARANYAA
            </div>
          </Link>

          {/* right actions */}
          <div className="flex items-center justify-end gap-4 lg:gap-5 lg:w-1/3 text-ink">
            <button onClick={() => dispatch(openOverlay())} aria-label="Search" className="p-1">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button onClick={() => nav('/wishlist')} aria-label="Wishlist" className="hidden sm:block p-1 relative">
              <Heart size={20} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[9px] font-medium bg-crimson text-cream rounded-full min-w-[16px] h-[16px] px-1 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button onClick={() => nav('/account')} aria-label="Account" className="hidden sm:block p-1">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button onClick={() => dispatch(openDrawer())} aria-label="Bag" className="p-1 relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 text-[9px] font-medium bg-ink text-cream rounded-full min-w-[16px] h-[16px] px-1 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
