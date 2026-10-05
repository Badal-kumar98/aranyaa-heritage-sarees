import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { catalogService } from '../services/catalog';
import type { Saree } from '../types';
import ProductCard from '../components/commerce/ProductCard';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import Breadcrumb from '../components/ui/Breadcrumb';

const SearchResults = () => {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const [results, setResults] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    catalogService.searchProducts(query).then((r) => { setResults(r); setLoading(false); });
  }, [query]);

  return (
    <div className="pb-24">
      <section className="bg-parchment-soft/40 border-b border-hairline py-10 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Search' }]} />
          <div className="mt-6">
            <p className="eyebrow text-clay mb-2">Search results</p>
            <h1 className="font-display text-4xl lg:text-6xl">“{query}”</h1>
            <p className="text-ink-soft mt-3">{loading ? 'Searching…' : `${results.length} ${results.length === 1 ? 'saree' : 'sarees'} found`}</p>
          </div>
        </div>
      </section>
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-12">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-10">
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : results.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            <h2 className="font-display text-4xl mb-4">Nothing matched “{query}”.</h2>
            <p className="text-ink-soft mb-8">Try a broader term — fabric, region, or occasion — or begin with our best sellers.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              {['Kanjivaram', 'Chanderi', 'Ivory Banarasi', 'Under ₹15,000'].map((q) => (
                <Link key={q} to={`/search?q=${encodeURIComponent(q)}`} className="eyebrow border border-hairline px-3 py-2 hover:bg-ink hover:text-cream">{q}</Link>
              ))}
            </div>
            <Link to="/best-sellers" className="block mt-10 eyebrow bg-ink text-cream px-6 py-3">Browse best sellers</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-10 lg:gap-y-14">
            {results.map((s, i) => <ProductCard key={s.id} saree={s} index={i} />)}
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchResults;
