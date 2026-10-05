import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';

const COLS: Array<{ title: string; links: Array<{ label: string; to: string }> }> = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', to: '/new-arrivals' },
      { label: 'Best Sellers', to: '/best-sellers' },
      { label: 'Bridal', to: '/occasion/bridal' },
      { label: 'Festive', to: '/occasion/festive' },
      { label: 'Everyday', to: '/occasion/daily' },
      { label: 'Under ₹15,000', to: '/shop/under-15000' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Collections', to: '/collections' },
      { label: 'The Craft', to: '/craft' },
      { label: 'Lookbook', to: '/lookbook' },
      { label: 'Journal', to: '/journal' },
      { label: 'Find Your Saree', to: '/find-your-saree' },
      { label: 'Book an Appointment', to: '/book-appointment' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { label: 'Saree Guide', to: '/saree-guide' },
      { label: 'Fabric Guide', to: '/fabric-guide' },
      { label: 'How to Drape', to: '/how-to-drape' },
      { label: 'Care', to: '/care' },
    ],
  },
  {
    title: 'Care',
    links: [
      { label: 'Contact', to: '/contact' },
      { label: 'Shipping', to: '/shipping' },
      { label: 'Returns', to: '/returns-policy' },
      { label: 'Payments', to: '/payment-information' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
];

const Footer = () => (
  <footer className="bg-ink text-cream mt-24">
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24">
      {/* newsletter */}
      <div className="grid lg:grid-cols-2 gap-10 pb-16 border-b border-cream/10">
        <div>
          <p className="eyebrow text-gold-soft mb-4">The Aranyaa Letter</p>
          <h3 className="font-display text-3xl lg:text-5xl font-light leading-[1.05] max-w-xl">
            A letter, once a fortnight, about weavers, launches and the odd folded corner of India.
          </h3>
        </div>
        <form
          className="flex flex-col justify-end"
          onSubmit={(e) => { e.preventDefault(); }}
        >
          <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
            <div className="flex-1">
              <label className="eyebrow text-cream/60 block mb-2">Email address</label>
              <input
                type="email"
                required
                placeholder="you@somewhere.in"
                className="w-full bg-transparent border-b border-cream/30 focus:border-gold-soft outline-none py-3 text-cream placeholder:text-cream/30"
              />
            </div>
            <button
              type="submit"
              className="eyebrow text-ink bg-gold-soft hover:bg-cream transition-colors px-8 py-3 whitespace-nowrap btn-shimmer"
            >
              Subscribe
            </button>
          </div>
          <p className="text-xs text-cream/40 mt-3">You can unsubscribe at any moment.</p>
        </form>
      </div>

      {/* columns */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 py-16">
        <div className="col-span-2">
          <div className="font-display text-2xl tracking-[0.22em] mb-5">ARANYAA</div>
          <p className="text-sm text-cream/60 leading-relaxed max-w-xs">
            Handwoven heritage sarees, sourced directly from master weaving families across India. Signed, dated, and made to be worn for decades.
          </p>
          <div className="flex gap-4 mt-6 text-cream/70">
            <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
          </div>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <p className="eyebrow text-gold-soft mb-4">{col.title}</p>
            <ul className="space-y-2.5 text-sm text-cream/70">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-cream transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-cream/10 flex flex-col lg:flex-row justify-between gap-4 text-xs text-cream/50">
        <p>© 2026 Aranyaa Textiles Pvt. Ltd. · Bengaluru · Kanchipuram · Varanasi</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/accessibility">Accessibility</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
