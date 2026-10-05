import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Heart, Truck, RotateCcw, Award, Ruler, ChevronDown, Minus, Plus, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { catalogService } from '../services/catalog';
import type { Saree } from '../types';
import { useAppDispatch, useAppSelector } from '../store';
import { addItem } from '../store/cartSlice';
import { toggle as toggleWish } from '../store/wishlistSlice';
import { pushToast } from '../store/uiSlice';
import { formatINR, cn } from '../utils/format';
import ProductCard from '../components/commerce/ProductCard';
import PriceTag from '../components/commerce/PriceTag';
import Breadcrumb from '../components/ui/Breadcrumb';

const REVIEW_SAMPLES = [
  { id: 'r1', author: 'Ananya I.', rating: 5, title: 'A letter, more than a saree.', body: 'Arrived with a hand-written note from the weaver. Perfectly stitched. I have never been undone by a purchase this way.', date: 'Aug 2026', verified: true },
  { id: 'r2', author: 'Nikita R.', rating: 5, title: 'Weight, drape, everything.', body: 'The Kanjivaram falls like nothing else. Weightier than I expected — which is the compliment.', date: 'Jul 2026', verified: true },
  { id: 'r3', author: 'Meera S.', rating: 4, title: 'Beautiful, took a while.', body: 'Worth the wait — crafted to order. The pallu is exquisite. Would have loved faster shipping.', date: 'Jun 2026', verified: true },
];

const ProductDetail = () => {
  const { slug = '' } = useParams();
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const wished = useAppSelector((s) => s.wishlist.ids.includes(slug));
  const [saree, setSaree] = useState<Saree | undefined>();
  const [related, setRelated] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [qty, setQty] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    catalogService.getProductBySlug(slug).then((s) => {
      setSaree(s);
      if (s) setSelectedColor(s.primaryColor.name);
      setLoading(false);
    });
    catalogService.getRelated(slug).then(setRelated);
    setActiveImg(0);
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-10">
        <div className="bg-parchment-soft ratio-portrait animate-pulse" />
        <div className="space-y-4">
          <div className="h-3 w-24 bg-parchment-soft animate-pulse" />
          <div className="h-10 w-3/4 bg-parchment-soft animate-pulse" />
          <div className="h-6 w-32 bg-parchment-soft animate-pulse" />
          <div className="h-40 w-full bg-parchment-soft animate-pulse mt-6" />
        </div>
      </div>
    );
  }

  if (!saree) {
    return (
      <div className="max-w-3xl mx-auto text-center py-32 px-6">
        <h1 className="font-display text-4xl mb-4">We couldn't find that saree.</h1>
        <button onClick={() => nav('/shop')} className="eyebrow bg-ink text-cream px-6 py-3">Browse all sarees</button>
      </div>
    );
  }

  const currentColor = saree.colors.find((c) => c.name === selectedColor) ?? saree.primaryColor;

  const handleAdd = () => {
    dispatch(
      addItem({
        productId: saree.id, slug: saree.slug, name: saree.shortName, price: saree.price,
        image: saree.images[0], color: currentColor.name, colorHex: currentColor.hex,
        quantity: qty, fabric: saree.categoryLabel, addedAt: Date.now(),
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const galleryImages = [...saree.images];
  if (saree.detailImages.border) galleryImages.push(saree.detailImages.border);
  if (saree.detailImages.pallu) galleryImages.push(saree.detailImages.pallu);
  if (saree.detailImages.fabric) galleryImages.push(saree.detailImages.fabric);

  const hotspots = [
    { top: '18%', left: '48%', label: 'Pallu', desc: 'Extra-weft zari in a mango motif' },
    { top: '52%', left: '30%', label: 'Border', desc: '4-inch korvai border, hand-woven separately' },
    { top: '76%', left: '58%', label: 'Fabric', desc: 'Mulberry silk, 3-ply, 550 gsm' },
  ];

  return (
    <div className="pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-6">
        <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: saree.categoryLabel, to: `/sarees/${saree.category}` }, { label: saree.shortName }]} />
      </div>

      {/* ABOVE FOLD */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 lg:pt-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
          {/* GALLERY */}
          <div className="lg:col-span-7">
            <div className="grid lg:grid-cols-[80px_1fr] gap-4">
              {/* thumbs */}
              <div className="order-2 lg:order-1 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={cn('shrink-0 w-16 h-24 lg:w-full lg:h-24 border', activeImg === i ? 'border-ink' : 'border-hairline opacity-70 hover:opacity-100')}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
              {/* main */}
              <div className="order-1 lg:order-2 relative">
                <motion.div
                  key={activeImg}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
                  className="relative bg-parchment-soft ratio-4-5 lg:ratio-portrait overflow-hidden"
                >
                  <img src={galleryImages[activeImg]} alt={saree.name} className="absolute inset-0 h-full w-full object-cover" />
                  {activeImg === 0 && (
                    <div className="absolute inset-0 pointer-events-none">
                      {hotspots.map((h, i) => (
                        <div key={i} className="absolute pointer-events-auto" style={{ top: h.top, left: h.left }}>
                          <div className="relative group">
                            <span className="block h-5 w-5 rounded-full border-2 border-cream bg-clay/90 shadow-lg animate-pulse" />
                            <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-cream text-ink px-3 py-2 shadow-xl min-w-[180px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              <p className="eyebrow text-clay text-[10px]">{h.label}</p>
                              <p className="text-xs mt-1">{h.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
                <p className="eyebrow text-ink-soft text-center mt-3 text-[10px]">Hover the dots to explore this saree</p>
              </div>
            </div>
          </div>

          {/* INFO PANEL */}
          <div className="lg:col-span-5 lg:pl-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow text-clay">{saree.categoryLabel} · {saree.region}</p>
              <h1 className="font-display text-3xl lg:text-4xl mt-2 leading-tight">{saree.name}</h1>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex text-clay">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className={cn('fill-current', i >= Math.round(saree.rating) && 'opacity-30')} />)}
                </div>
                <span className="text-sm text-ink-soft">{saree.rating.toFixed(1)} · {saree.reviewCount} reviews</span>
              </div>

              <div className="mt-5">
                <PriceTag price={saree.price} compareAt={saree.compareAtPrice} size="lg" />
                <p className="text-xs text-ink-soft mt-1">Inclusive of all taxes · EMI available from ₹{Math.round(saree.price / 12).toLocaleString('en-IN')}/mo</p>
              </div>

              {/* colour swatch */}
              <div className="mt-8">
                <div className="flex items-baseline justify-between mb-3">
                  <p className="eyebrow text-clay">Colour: <span className="text-ink">{currentColor.name}</span></p>
                  <button className="text-xs text-ink-soft underline">Size guide</button>
                </div>
                <div className="flex gap-3">
                  {saree.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={cn('h-10 w-10 rounded-full border-2 transition-transform', c.name === selectedColor ? 'border-ink scale-110' : 'border-hairline')}
                      style={{ background: c.hex }}
                      title={c.name}
                      aria-label={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* stock */}
              <div className="mt-6 flex items-center gap-2 text-sm">
                <span className={cn('inline-block h-2 w-2 rounded-full', saree.stock > 5 ? 'bg-emerald-deep' : saree.stock > 0 ? 'bg-clay' : 'bg-crimson')} />
                {saree.stock > 5 ? 'In stock' : saree.stock > 0 ? `Only ${saree.stock} left` : 'Made-to-order (6-8 weeks)'}
              </div>

              {/* quantity + CTA */}
              <div className="mt-6 flex gap-3">
                <div className="flex items-center border border-ink">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-14 w-12 grid place-items-center hover:bg-ink hover:text-cream"><Minus size={14} /></button>
                  <span className="w-12 text-center text-lg">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="h-14 w-12 grid place-items-center hover:bg-ink hover:text-cream"><Plus size={14} /></button>
                </div>
                <button onClick={handleAdd} className={cn('flex-1 eyebrow bg-ink text-cream flex items-center justify-center gap-3 btn-shimmer transition-colors', added && 'bg-emerald-deep')}>
                  {added ? <><Sparkles size={16} /> Added to bag</> : `Add to bag · ${formatINR(saree.price * qty)}`}
                </button>
              </div>
              <button
                onClick={() => { dispatch(toggleWish(saree.id)); dispatch(pushToast({ title: wished ? 'Removed from wishlist' : 'Saved to wishlist' })); }}
                className="mt-3 eyebrow border border-ink py-4 flex items-center justify-center gap-2 w-full hover:bg-ink hover:text-cream transition-colors"
              >
                <Heart size={14} className={cn(wished && 'fill-crimson text-crimson')} /> {wished ? 'Saved to wishlist' : 'Add to wishlist'}
              </button>

              {/* trust */}
              <div className="mt-8 grid grid-cols-3 gap-3 border-y border-hairline py-6">
                {[
                  { i: Truck, l: 'Complimentary\nshipping in India' },
                  { i: RotateCcw, l: '7-day easy\nreturns' },
                  { i: Award, l: 'Signed &\ncertified by weaver' },
                ].map(({ i: Icon, l }, k) => (
                  <div key={k} className="text-center">
                    <Icon size={18} className="mx-auto text-clay" />
                    <p className="eyebrow text-[10px] mt-2 whitespace-pre-line">{l}</p>
                  </div>
                ))}
              </div>

              {/* Accordion */}
              <div className="mt-6">
                {[
                  { id: 'details', title: 'The details', content: (
                    <div className="text-sm text-ink-soft leading-relaxed space-y-3">
                      <div className="grid grid-cols-2 gap-y-2">
                        <span className="text-ink">Fabric</span><span>{saree.fabric[0].toUpperCase() + saree.fabric.slice(1)}</span>
                        <span className="text-ink">Weave</span><span>{saree.weave}</span>
                        <span className="text-ink">Origin</span><span>{saree.region}</span>
                        <span className="text-ink">Saree length</span><span>{saree.measurements.sareeLength}</span>
                        <span className="text-ink">Blouse piece</span><span>{saree.measurements.blousePiece}</span>
                        <span className="text-ink">Width</span><span>{saree.measurements.width}</span>
                      </div>
                    </div>
                  ) },
                  { id: 'story', title: 'The story', content: (
                    <div className="text-sm text-ink-soft leading-relaxed space-y-3">
                      <p>{saree.story}</p>
                      <p className="italic">{saree.craft}</p>
                    </div>
                  ) },
                  { id: 'care', title: 'Care & keeping', content: (
                    <ul className="text-sm text-ink-soft space-y-2">
                      {saree.care.map((c) => <li key={c} className="flex gap-3"><span className="text-clay">—</span>{c}</li>)}
                    </ul>
                  ) },
                  { id: 'shipping', title: 'Shipping & returns', content: (
                    <div className="text-sm text-ink-soft space-y-2">
                      <p>Complimentary shipping across India in 72 hours. International in 5-7 days.</p>
                      <p>Every saree ships in an archival cotton pouch inside a keepsake box.</p>
                      <p>7-day easy returns — the saree must be unworn, with tags intact.</p>
                    </div>
                  ) },
                ].map((row) => (
                  <div key={row.id} className="border-t border-hairline">
                    <button onClick={() => setOpenAccordion(openAccordion === row.id ? null : row.id)} className="w-full flex justify-between items-center py-4 text-left">
                      <span className="eyebrow">{row.title}</span>
                      <ChevronDown size={16} className={cn('transition-transform', openAccordion === row.id && 'rotate-180')} />
                    </button>
                    {openAccordion === row.id && <div className="pb-6">{row.content}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CRAFT STORY */}
      <section className="bg-ink text-cream mt-24 lg:mt-32 py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <img src={saree.detailImages.pallu || './images/detail-pallu.jpg'} alt="Craft detail" className="w-full ratio-4-5 object-cover" />
          <div>
            <p className="eyebrow text-gold-soft mb-4">The Craft</p>
            <h2 className="font-display text-3xl lg:text-5xl leading-tight">{saree.editorialBlurb || saree.craft}</h2>
            <p className="text-cream/70 mt-6 leading-relaxed">{saree.story}</p>
            <Link to="/craft" className="eyebrow mt-8 inline-block underline text-cream">Read the full craft story →</Link>
          </div>
        </div>
      </section>

      {/* MEASUREMENTS ART DIRECTED */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <p className="eyebrow text-clay mb-3">The saree, measured</p>
            <h2 className="font-display text-3xl lg:text-4xl leading-tight">Every centimetre, on record.</h2>
            <p className="text-ink-soft mt-4">Woven, cut, and finished to the exact measurements you'd expect from a bespoke atelier.</p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-3 gap-4">
            {[
              { l: 'Saree length', v: saree.measurements.sareeLength, i: Ruler },
              { l: 'Blouse piece', v: saree.measurements.blousePiece, i: Ruler },
              { l: 'Width', v: saree.measurements.width, i: Ruler },
            ].map((m, i) => (
              <div key={i} className="border border-hairline p-6 lg:p-8">
                <m.i size={20} className="text-clay mb-4" />
                <p className="font-display text-3xl lg:text-4xl">{m.v}</p>
                <p className="eyebrow text-clay mt-2">{m.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 border-t border-hairline">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow text-clay mb-3">Reviews</p>
            <h2 className="font-display text-4xl leading-tight">Worn, and written about.</h2>
            <div className="mt-8">
              <p className="font-display text-6xl">{saree.rating.toFixed(1)}</p>
              <div className="flex text-clay mt-2">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} className={cn('fill-current', i >= Math.round(saree.rating) && 'opacity-30')} />)}
              </div>
              <p className="text-sm text-ink-soft mt-1">Based on {saree.reviewCount} verified reviews</p>
            </div>
            <button className="eyebrow border border-ink px-5 py-3 mt-8">Write a review</button>
          </div>
          <div className="lg:col-span-8 divide-y divide-hairline">
            {REVIEW_SAMPLES.map((r) => (
              <div key={r.id} className="py-6 first:pt-0">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex text-clay mb-1">
                      {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className={cn('fill-current', i >= r.rating && 'opacity-30')} />)}
                    </div>
                    <p className="font-display text-lg">{r.title}</p>
                  </div>
                  <div className="text-right text-xs text-ink-soft">
                    <p>{r.author}</p>
                    <p>{r.date} · Verified</p>
                  </div>
                </div>
                <p className="text-sm text-ink-soft mt-3 leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-20 lg:py-24 border-t border-hairline">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-3">
            <h2 className="font-display text-4xl lg:text-5xl">You may also love</h2>
            <Link to={`/sarees/${saree.category}`} className="eyebrow underline">All {saree.categoryLabel} →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-10">
            {related.map((s, i) => <ProductCard key={s.id} saree={s} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
