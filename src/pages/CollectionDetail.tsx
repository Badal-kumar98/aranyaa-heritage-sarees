import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { catalogService } from '../services/catalog';
import type { Saree, Collection } from '../types';
import ProductCard from '../components/commerce/ProductCard';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import Breadcrumb from '../components/ui/Breadcrumb';

const CollectionDetail = () => {
  const { slug = '' } = useParams();
  const [collection, setCollection] = useState<Collection | undefined>();
  const [items, setItems] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([catalogService.getCollection(slug), catalogService.getCollectionProducts(slug)]).then(([c, ps]) => {
      setCollection(c); setItems(ps); setLoading(false);
    });
  }, [slug]);

  if (!collection && !loading) {
    return <div className="text-center py-32"><h1 className="font-display text-3xl">Collection not found</h1></div>;
  }

  return (
    <div className="pb-24">
      {collection && (
        <section className="relative min-h-[72vh] lg:min-h-[80vh] overflow-hidden bg-ink">
          <img src={collection.hero} alt={collection.title} className="absolute inset-0 h-full w-full object-cover opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/30" />
          <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-full min-h-[72vh] lg:min-h-[80vh] flex flex-col justify-end pb-16 lg:pb-24">
            <div className="text-cream">
              <div className="pt-24">
                <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Collections', to: '/collections' }, { label: collection.title }]} />
              </div>
              <p className="eyebrow text-gold-soft mt-8 mb-3">Collection · {collection.count} pieces</p>
              <h1 className="display-hero text-5xl md:text-6xl lg:text-[104px] max-w-3xl">{collection.title}</h1>
              <p className="font-display italic text-xl lg:text-2xl mt-6 text-cream/90 max-w-2xl">{collection.tagline}</p>
            </div>
          </div>
        </section>
      )}

      {collection && (
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 text-lg lg:text-xl text-ink-soft leading-relaxed max-w-2xl">
            {collection.description}
          </div>
          <div className="lg:text-right">
            <p className="eyebrow text-clay mb-2">Palette</p>
            <p className="font-display text-2xl">{collection.palette}</p>
          </div>
        </section>
      )}

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-10 lg:gap-y-14">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : items.map((s, i) => <ProductCard key={s.id} saree={s} index={i} />)}
        </div>
        <div className="text-center mt-16">
          <Link to="/collections" className="eyebrow underline">Explore other collections →</Link>
        </div>
      </section>
    </div>
  );
};

export default CollectionDetail;
