import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { closeMobileNav } from '../../store/uiSlice';

const SECTIONS = [
  {
    title: 'Shop',
    items: [
      { label: 'New Arrivals', to: '/new-arrivals' },
      { label: 'Best Sellers', to: '/best-sellers' },
      { label: 'All Sarees', to: '/shop' },
      { label: 'Bridal', to: '/occasion/bridal' },
      { label: 'Festive', to: '/occasion/festive' },
      { label: 'Everyday', to: '/occasion/daily' },
    ],
  },
  {
    title: 'By Fabric',
    items: [
      { label: 'Silk', to: '/fabric/silk' },
      { label: 'Cotton', to: '/fabric/cotton' },
      { label: 'Linen', to: '/fabric/linen' },
      { label: 'Organza', to: '/fabric/organza' },
    ],
  },
  {
    title: 'Discover',
    items: [
      { label: 'Collections', to: '/collections' },
      { label: 'The Craft', to: '/craft' },
      { label: 'Lookbook', to: '/lookbook' },
      { label: 'Journal', to: '/journal' },
      { label: 'Find Your Saree', to: '/find-your-saree' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Sign in', to: '/login' },
      { label: 'Wishlist', to: '/wishlist' },
      { label: 'Orders', to: '/account/orders' },
    ],
  },
];

const MobileNav = () => {
  const open = useAppSelector((s) => s.ui.mobileNavOpen);
  const dispatch = useAppDispatch();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => dispatch(closeMobileNav())}
            className="fixed inset-0 bg-ink/40 z-50"
          />
          <motion.div
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.65, 0.05, 0.36, 1] }}
            className="fixed inset-y-0 left-0 w-[86%] max-w-sm bg-cream z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-between p-5 border-b border-hairline">
              <span className="font-display text-xl tracking-[0.22em]">ARANYAA</span>
              <button onClick={() => dispatch(closeMobileNav())} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <div className="p-6 space-y-8">
              {SECTIONS.map((sec) => (
                <div key={sec.title}>
                  <p className="eyebrow text-clay mb-3">{sec.title}</p>
                  <ul className="space-y-3">
                    {sec.items.map((it) => (
                      <li key={it.to}>
                        <Link
                          to={it.to}
                          onClick={() => dispatch(closeMobileNav())}
                          className="block font-display text-2xl text-ink"
                        >
                          {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="pt-4 border-t border-hairline text-sm text-ink-soft">
                Complimentary blouse stitching · 72-hour shipping across India.
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
