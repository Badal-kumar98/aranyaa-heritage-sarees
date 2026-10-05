import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { catalogService } from '../services/catalog';
import type { Saree } from '../types';
import ProductCard from '../components/commerce/ProductCard';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import { useAppDispatch, useAppSelector } from '../store';
import { toggleFilter, setSort, clearAll, setInStock } from '../store/catalogSlice';
import Breadcrumb from '../components/ui/Breadcrumb';
import { formatINR, cn } from '../utils/format';
import { AnimatePresence, motion } from 'framer-motion';

const FABRIC_OPTIONS = ['silk', 'cotton', 'linen', 'organza', 'georgette', 'velvet', 'chiffon'];
const OCCASION_OPTIONS = ['bridal', 'reception', 'festive', 'daily', 'workwear', 'destination'];
const CATEGORY_OPTIONS = ['kanjivaram', 'banarasi', 'chanderi', 'linen', 'organza', 'tussar', 'chikankari', 'patola'];
const COLOR_OPTIONS = [
  { name: 'Crimson', hex: '#7a1e2b' }, { name: 'Ivory', hex: '#efe7d0' }, { name: 'Emerald', hex: '#1f4a3a' },
  { name: 'Indigo', hex: '#1c2c4c' }, { name: 'Blush', hex: '#e7c9be' }, { name: 'Saffron', hex: '#c8791f' },
  { name: 'Terracotta', hex: '#b45327' }, { name: 'Wine', hex: '#5a1a2b' }, { name: 'Olive', hex: '#5c5a2b' },
  { name: 'Rose', hex: '#c47a7a' },
];

const SORT_OPTIONS: Array<{ v: 'featured' | 'new' | 'price-asc' | 'price-desc' | 'rating'; l: string }> = [
  { v: 'featured', l: 'Featured' }, { v: 'new', l: 'New arrivals' },
  { v: 'price-asc', l: 'Price: low to high' }, { v: 'price-desc', l: 'Price: high to low' },
  { v: 'rating', l: 'Top rated' },
];

interface Props { mode?: 'new' | 'bestseller' | 'occasion' | 'fabric' | 'color' | 'price'; }

const titleFor = (mode: Props['mode'], slug?: string, category?: string) => {
  if (mode === 'new') return { eyebrow: 'Just off the loom', title: 'New Arrivals', desc: 'Fresh from the ateliers of Kanchipuram, Varanasi and Chanderi.' };
  if (mode === 'bestseller') return { eyebrow: 'Loved and re-loved', title: 'Best Sellers', desc: 'Sarees our women return to — for weddings, workdays and everything between.' };
  if (mode === 'occasion' && slug) return { eyebrow: 'Shop by occasion', title: slug[0].toUpperCase() + slug.slice(1), desc: `Sarees curated for ${slug} moments.` };
  if (mode === 'fabric' && slug) return { eyebrow: 'Shop by fabric', title: slug[0].toUpperCase() + slug.slice(1), desc: `Every drape, every weight, in one place.` };
  if (mode === 'color' && slug) return { eyebrow: 'Shop by colour', title: slug[0].toUpperCase() + slug.slice(1), desc: 'A palette lifted from the archives.' };
  if (mode === 'price') return { eyebrow: 'By price', title: (slug || '').replace('-', ' — '), desc: 'Beauty at every threshold.' };
  if (category) return { eyebrow: 'Shop', title: category[0].toUpperCase() + category.slice(1), desc: '' };
  return { eyebrow: 'The full atelier', title: 'All Sarees', desc: 'Every handwoven saree, in one place.' };
};

const Shop = ({ mode }: Props) => {
  const { slug, category, priceRange } = useParams();
  const usedSlug = slug || priceRange;
  const [products, setProducts] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const filters = useAppSelector((s) => s.catalog.filters);
  const sort = useAppSelector((s) => s.catalog.sort);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    catalogService.getProducts().then((all) => {
      let items = all;
      if (mode === 'new') items = items.filter((s) => s.badges.includes('new'));
      if (mode === 'bestseller') items = items.filter((s) => s.badges.includes('bestseller'));
      if (mode === 'occasion' && slug) items = items.filter((s) => s.occasions.includes(slug as never));
      if (mode === 'fabric' && slug) items = items.filter((s) => s.fabric === slug);
      if (mode === 'color' && slug) items = items.filter((s) => s.colors.some((c) => c.name.toLowerCase() === slug.toLowerCase()));
      if (mode === 'price' && priceRange) {
        const m = priceRange.match(/under-(\d+)/); const max = m ? parseInt(m[1]) : Infinity;
        items = items.filter((s) => s.price <= max);
      }
      if (category) items = items.filter((s) => s.category === category);
      setProducts(items);
      setLoading(false);
    });
  }, [mode, slug, category, priceRange]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (filters.fabrics.length) list = list.filter((s) => filters.fabrics.includes(s.fabric));
    if (filters.occasions.length) list = list.filter((s) => s.occasions.some((o) => filters.occasions.includes(o)));
    if (filters.categories.length) list = list.filter((s) => filters.categories.includes(s.category));
    if (filters.colors.length) list = list.filter((s) => s.colors.some((c) => filters.colors.includes(c.name)));
    if (filters.priceMin !== undefined) list = list.filter((s) => s.price >= filters.priceMin!);
    if (filters.priceMax !== undefined) list = list.filter((s) => s.price <= filters.priceMax!);
    if (filters.inStockOnly) list = list.filter((s) => s.stock > 0);

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'new') list.sort((a, b) => Number(b.badges.includes('new')) - Number(a.badges.includes('new')));
    return list;
  }, [products, filters, sort]);

  const activeChips: Array<{ group: keyof typeof filters; value: string }> = [
    ...filters.fabrics.map((v) => ({ group: 'fabrics' as const, value: v })),
    ...filters.occasions.map((v) => ({ group: 'occasions' as const, value: v })),
    ...filters.categories.map((v) => ({ group: 'categories' as const, value: v })),
    ...filters.colors.map((v) => ({ group: 'colors' as const, value: v })),
  ];

  const heading = titleFor(mode, usedSlug, category);

  return (
    <div className="pb-24">
      {/* HEADER */}
      <section className="bg-parchment-soft/40 border-b border-hairline">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-20">
          <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: heading.title }]} />
          <div className="mt-6 grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow text-clay mb-3">{heading.eyebrow}</p>
              <h1 className="display-h1 text-5xl md:text-6xl lg:text-[88px] capitalize">{heading.title}</h1>
              {heading.desc && <p className="text-ink-soft mt-4 max-w-xl text-lg">{heading.desc}</p>}
            </div>
            <div className="lg:col-span-4 lg:text-right text-sm text-ink-soft">
              <p>{loading ? 'Loading…' : `${filtered.length} sarees`}</p>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLBAR */}
      <section className="sticky top-16 lg:top-20 z-20 bg-cream/95 backdrop-blur border-b border-hairline">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-3">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="eyebrow flex items-center gap-2 lg:hidden"
          >
            <SlidersHorizontal size={14} /> Filters ({activeChips.length})
          </button>
          <div className="hidden lg:flex items-center gap-2 flex-wrap">
            {activeChips.length === 0 && <span className="text-xs text-ink-soft">All sarees shown</span>}
            {activeChips.map((c) => (
              <button
                key={`${c.group}-${c.value}`}
                onClick={() => dispatch(toggleFilter({ group: c.group, value: c.value }))}
                className="eyebrow bg-parchment-soft px-3 py-1.5 hover:bg-ink hover:text-cream transition-colors flex items-center gap-2"
              >
                {c.value} <X size={11} />
              </button>
            ))}
            {activeChips.length > 0 && (
              <button onClick={() => dispatch(clearAll())} className="eyebrow text-crimson underline underline-offset-4">Clear all</button>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="eyebrow flex items-center gap-2"
            >
              Sort: {SORT_OPTIONS.find((s) => s.v === sort)?.l} <ChevronDown size={12} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 mt-2 bg-cream border border-hairline shadow-xl min-w-[200px] z-10">
                {SORT_OPTIONS.map((o) => (
                  <button
                    key={o.v}
                    onClick={() => { dispatch(setSort(o.v)); setSortOpen(false); }}
                    className={cn('block w-full text-left px-4 py-2.5 text-sm hover:bg-parchment-soft', sort === o.v && 'bg-parchment-soft font-medium')}
                  >{o.l}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-10">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-40 self-start">
            <FiltersPanel />
          </aside>

          {/* Grid */}
          <div className="lg:col-span-9">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 lg:gap-x-6 gap-y-10">
                {Array.from({ length: 9 }).map((_, i) => <ProductCardSkeleton key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="border border-hairline py-24 text-center">
                <p className="font-display text-4xl mb-3">Nothing here, for now.</p>
                <p className="text-ink-soft mb-6">Try broadening your filters, or browse the full atelier.</p>
                <button onClick={() => dispatch(clearAll())} className="eyebrow bg-ink text-cream px-6 py-3">Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 lg:gap-x-6 gap-y-10 lg:gap-y-14">
                {filtered.map((s, i) => <ProductCard key={s.id} saree={s} index={i} />)}
              </div>
            )}

            {/* editorial insert */}
            {!loading && filtered.length > 6 && (
              <div className="mt-16 relative overflow-hidden bg-ink text-cream">
                <div className="grid md:grid-cols-2 items-center">
                  <img src="/images/detail-pallu.jpg" alt="" className="h-full w-full object-cover ratio-4-5 md:ratio-3-2" />
                  <div className="p-8 lg:p-12">
                    <p className="eyebrow text-gold-soft mb-3">Not sure where to begin?</p>
                    <h3 className="font-display text-3xl lg:text-4xl leading-snug">Book a virtual saree consultation, on us.</h3>
                    <p className="text-cream/70 mt-4 max-w-md">Thirty minutes with a stylist — for a wedding, a season, or just a nudge in the right direction.</p>
                    <Link to="/book-appointment" className="eyebrow bg-gold-soft text-ink px-6 py-3 mt-6 inline-block">Book a consultation</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MOBILE FILTERS DRAWER */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileFiltersOpen(false)} className="fixed inset-0 bg-ink/50 z-50" />
            <motion.aside
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="fixed inset-x-0 bottom-0 bg-cream z-50 rounded-t-3xl max-h-[85vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-cream px-6 py-4 border-b border-hairline flex justify-between items-center">
                <p className="font-display text-2xl">Filters</p>
                <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close"><X size={22} /></button>
              </div>
              <div className="p-6"><FiltersPanel /></div>
              <div className="sticky bottom-0 bg-cream border-t border-hairline p-4 grid grid-cols-2 gap-2">
                <button onClick={() => dispatch(clearAll())} className="eyebrow border border-ink py-3">Clear</button>
                <button onClick={() => setMobileFiltersOpen(false)} className="eyebrow bg-ink text-cream py-3">Show {filtered.length}</button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const FiltersPanel = () => {
  const filters = useAppSelector((s) => s.catalog.filters);
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-8">
      <FilterGroup title="Category">
        {CATEGORY_OPTIONS.map((v) => (
          <label key={v} className="flex items-center gap-3 cursor-pointer text-sm capitalize">
            <input
              type="checkbox"
              checked={filters.categories.includes(v)}
              onChange={() => dispatch(toggleFilter({ group: 'categories', value: v }))}
              className="h-4 w-4 accent-ink"
            />
            {v}
          </label>
        ))}
      </FilterGroup>
      <FilterGroup title="Fabric">
        {FABRIC_OPTIONS.map((v) => (
          <label key={v} className="flex items-center gap-3 cursor-pointer text-sm capitalize">
            <input
              type="checkbox"
              checked={filters.fabrics.includes(v)}
              onChange={() => dispatch(toggleFilter({ group: 'fabrics', value: v }))}
              className="h-4 w-4 accent-ink"
            />
            {v}
          </label>
        ))}
      </FilterGroup>
      <FilterGroup title="Occasion">
        {OCCASION_OPTIONS.map((v) => (
          <label key={v} className="flex items-center gap-3 cursor-pointer text-sm capitalize">
            <input
              type="checkbox"
              checked={filters.occasions.includes(v)}
              onChange={() => dispatch(toggleFilter({ group: 'occasions', value: v }))}
              className="h-4 w-4 accent-ink"
            />
            {v}
          </label>
        ))}
      </FilterGroup>
      <FilterGroup title="Colour">
        <div className="grid grid-cols-5 gap-2">
          {COLOR_OPTIONS.map((c) => {
            const active = filters.colors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => dispatch(toggleFilter({ group: 'colors', value: c.name }))}
                className={cn('h-8 w-8 rounded-full border-2 transition-all', active ? 'border-ink scale-110' : 'border-hairline')}
                style={{ background: c.hex }}
                title={c.name}
                aria-label={c.name}
              />
            );
          })}
        </div>
      </FilterGroup>
      <FilterGroup title="Price">
        <div className="space-y-2">
          {[[0, 10000, 'Under ₹10,000'], [10000, 25000, '₹10k — ₹25k'], [25000, 50000, '₹25k — ₹50k'], [50000, 100000, '₹50k — ₹1L'], [100000, 999999, 'Above ₹1L']].map(([min, max, label]) => (
            <label key={label as string} className="flex items-center gap-3 cursor-pointer text-sm">
              <input
                type="radio"
                name="price"
                checked={filters.priceMin === min && filters.priceMax === max}
                onChange={() => dispatch({ type: 'catalog/setPrice', payload: { min, max } })}
                className="h-4 w-4 accent-ink"
              />
              {label as string}
              {typeof min === 'number' && <span className="text-ink-soft text-xs ml-auto">{formatINR(min as number)}+</span>}
            </label>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Availability">
        <label className="flex items-center gap-3 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => dispatch(setInStock(e.target.checked))}
            className="h-4 w-4 accent-ink"
          />
          In stock only
        </label>
      </FilterGroup>
    </div>
  );
};

const FilterGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p className="eyebrow text-clay mb-3 flex items-center gap-2"><Filter size={12} /> {title}</p>
    <div className="space-y-2">{children}</div>
  </div>
);

export default Shop;
