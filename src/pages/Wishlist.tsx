import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAppSelector } from '../store';
import { catalogService } from '../services/catalog';
import type { Saree } from '../types';
import ProductCard from '../components/commerce/ProductCard';
import Breadcrumb from '../components/ui/Breadcrumb';

const Wishlist = () => {
  const ids = useAppSelector((s) => s.wishlist.ids);
  const [items, setItems] = useState<Saree[]>([]);
  useEffect(() => {
    catalogService.getProducts().then((all) => setItems(all.filter((s) => ids.includes(s.id))));
  }, [ids]);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-24">
      <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
      <div className="my-8">
        <p className="eyebrow text-clay mb-2">Saved for later</p>
        <h1 className="font-display text-5xl lg:text-6xl">Your Wishlist</h1>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-16 border border-hairline">
          <div className="h-16 w-16 grid place-items-center bg-parchment-soft mx-auto mb-6">
            <Heart size={22} className="text-clay" />
          </div>
          <h2 className="font-display text-3xl mb-2">No sarees saved, yet.</h2>
          <p className="text-ink-soft mb-6">Tap the heart on any saree to keep it here.</p>
          <Link to="/shop" className="eyebrow bg-ink text-cream px-6 py-3">Discover Sarees</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-10 lg:gap-y-14">
          {items.map((s, i) => <ProductCard key={s.id} saree={s} index={i} />)}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
