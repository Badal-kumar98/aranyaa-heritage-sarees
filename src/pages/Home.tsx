import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Award, Truck, Sparkles } from 'lucide-react';
import { catalogService } from '../services/catalog';
import { COLLECTIONS } from '../data/collections';
import { JOURNAL } from '../data/collections';
import ProductCard from '../components/commerce/ProductCard';
import { useEffect, useState } from 'react';
import type { Saree } from '../types';

const OCCASIONS = [
  { slug: 'bridal', label: 'Bridal', image: '/images/saree-1.jpg', copy: 'Once. Always.' },
  { slug: 'festive', label: 'Festive', image: '/images/saree-5.jpg', copy: 'Lamps & laddoos.' },
  { slug: 'reception', label: 'Reception', image: '/images/saree-8.jpg', copy: 'The second entrance.' },
  { slug: 'daily', label: 'Everyday', image: '/images/saree-11.jpg', copy: 'Weekday, well-worn.' },
  { slug: 'destination', label: 'Destination', image: '/images/saree-10.jpg', copy: 'Suitcase-ready.' },
];

const FABRICS = [
  { slug: 'silk', label: 'Silk', hint: 'Kanjivaram, Banarasi, Tussar' },
  { slug: 'cotton', label: 'Cotton', hint: 'Chanderi, handloom' },
  { slug: 'linen', label: 'Linen', hint: 'Everyday, honest' },
  { slug: 'organza', label: 'Organza', hint: 'Weightless drape' },
];

const Home = () => {
  const [bestsellers, setBestsellers] = useState<Saree[]>([]);
  const [arrivals, setArrivals] = useState<Saree[]>([]);

  useEffect(() => {
    catalogService.getBestsellers(6).then(setBestsellers);
    catalogService.getProducts({ limit: 8 }).then(setArrivals);
  }, []);

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative bg-cream overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-0 min-h-[92vh] lg:min-h-[86vh]">
          {/* left copy */}
          <div className="lg:col-span-5 flex flex-col justify-between px-6 sm:px-10 lg:px-16 pt-8 lg:pt-20 pb-10 order-2 lg:order-1">
            <div>
              <div className="eyebrow text-clay mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-clay" />
                Campaign · Autumn / Winter 2026
              </div>
              <h1 className="display-hero text-[54px] sm:text-[72px] lg:text-[92px] xl:text-[108px] text-ink">
                Woven
                <br />
                <em className="not-italic text-crimson">by hand.</em>
                <br />
                Worn for
                <br />
                <em className="not-italic italic font-normal">generations.</em>
              </h1>
              <p className="mt-8 max-w-md text-ink-soft leading-relaxed">
                Aranyaa works with the last living families of Kanjivaram, Banarasi and Patola weavers.
                Every saree is signed by its weaver, dated, and made to be worn for the next fifty years.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-10 lg:mt-16">
              <Link to="/collection/bridal-heirlooms" className="eyebrow bg-ink text-cream px-8 py-4 flex items-center justify-center gap-3 btn-shimmer">
                Explore the Heirlooms <ArrowRight size={16} />
              </Link>
              <Link to="/new-arrivals" className="eyebrow border border-ink text-ink px-8 py-4 flex items-center justify-center gap-3 hover:bg-ink hover:text-cream transition-colors">
                New This Season
              </Link>
            </div>
          </div>

          {/* right image */}
          <div className="lg:col-span-7 relative order-1 lg:order-2">
            <div className="relative h-[68vh] lg:h-full">
              <img
                src="/images/campaign-hero.jpg"
                alt="Aranyaa campaign — a woman in a crimson silk saree in a sunlit courtyard"
                className="absolute inset-0 h-full w-full object-cover reveal-mask"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent lg:from-transparent" />
              <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 bg-cream/90 backdrop-blur-sm px-5 py-4 max-w-[240px]">
                <p className="eyebrow text-clay mb-1">Featured</p>
                <p className="font-display text-lg leading-snug">Aranyaa Crimson · Kanjivaram in mulberry silk</p>
                <Link to="/product/aranyaa-crimson-kanjivaram" className="eyebrow underline text-ink mt-2 inline-block">Shop this saree</Link>
              </div>
            </div>
          </div>
        </div>

        {/* trust marquee */}
        <div className="border-y border-hairline bg-cream">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-4 flex flex-wrap justify-center items-center gap-x-10 gap-y-3 text-[11px] tracking-[0.22em] uppercase text-ink-soft">
            <span className="flex items-center gap-2"><Award size={14} className="text-clay" /> Signed by the weaver</span>
            <span className="hidden md:inline text-hairline">·</span>
            <span className="flex items-center gap-2"><Truck size={14} className="text-clay" /> 72-hour India shipping</span>
            <span className="hidden md:inline text-hairline">·</span>
            <span className="flex items-center gap-2"><Sparkles size={14} className="text-clay" /> Complimentary blouse stitching</span>
            <span className="hidden md:inline text-hairline">·</span>
            <span className="flex items-center gap-2"><Star size={14} className="text-clay" /> 12,400 rated 4.9★</span>
          </div>
        </div>
      </section>

      {/* ============ MANIFESTO ============ */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-10 py-24 lg:py-36">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-2">
            <div className="eyebrow text-clay">A note<br />from Aranyaa</div>
          </div>
          <div className="lg:col-span-8">
            <p className="font-display text-3xl md:text-4xl lg:text-[46px] leading-[1.15] text-ink">
              We do not think of a saree as a garment. We think of it as a <em className="text-crimson">letter</em>
              — from a weaver in Kanchipuram, or Varanasi, or Patan — passed through your hands, into the wardrobe of someone
              you may not have met yet.
            </p>
          </div>
          <div className="lg:col-span-2 text-right">
            <p className="font-display italic text-ink-soft">— The Founders</p>
          </div>
        </div>
      </section>

      {/* ============ FEATURED COLLECTIONS ============ */}
      <section className="bg-parchment-soft/40 py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="eyebrow text-clay mb-3">Featured Collections</p>
              <h2 className="display-h1 text-4xl md:text-5xl lg:text-[64px]">Four ways to begin.</h2>
            </div>
            <Link to="/collections" className="eyebrow text-ink link-underline">View all collections →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {COLLECTIONS.slice(0, 4).map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={`/collection/${c.slug}`} className="group block">
                  <div className="relative overflow-hidden ratio-3-2 bg-parchment">
                    <img src={c.hero} alt={c.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
                    <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end text-cream">
                      <p className="eyebrow text-gold-soft mb-2">{c.count} pieces · {c.palette}</p>
                      <h3 className="font-display text-3xl lg:text-4xl leading-tight">{c.title}</h3>
                      <p className="text-sm text-cream/85 mt-2 max-w-md">{c.tagline}</p>
                      <div className="eyebrow mt-5 flex items-center gap-3 text-cream link-underline">
                        Explore the collection <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SHOP BY OCCASION ============ */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-12 max-w-3xl">
            <p className="eyebrow text-clay mb-3">Shop by Occasion</p>
            <h2 className="display-h1 text-4xl md:text-5xl lg:text-[64px]">For the day it is.</h2>
            <p className="text-ink-soft mt-4">
              A saree suggests something before you've said a word. Find one for the room you are walking into.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-5">
            {OCCASIONS.map((o, i) => (
              <motion.div
                key={o.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <Link to={`/occasion/${o.slug}`} className="group block">
                  <div className="relative overflow-hidden ratio-portrait bg-parchment">
                    <img src={o.image} alt={o.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 lg:p-5 text-cream">
                      <p className="font-display text-xl lg:text-2xl">{o.label}</p>
                      <p className="text-xs text-cream/80 mt-0.5">{o.copy}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EDITORIAL SPLIT: CRAFT STORY ============ */}
      <section className="bg-ink text-cream py-24 lg:py-40 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src="/images/craft-hands.jpg" alt="A weaver's hands at the loom" className="w-full ratio-4-5 object-cover" />
            <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 bg-cream text-ink px-6 py-5 max-w-[220px] shadow-2xl">
              <p className="eyebrow text-clay mb-1">Chapter 01</p>
              <p className="font-display text-lg leading-snug">The eleven-day saree</p>
            </div>
          </motion.div>
          <div className="lg:col-span-6">
            <p className="eyebrow text-gold-soft mb-4">Inside the Loom</p>
            <h2 className="display-h1 text-4xl md:text-5xl lg:text-[68px]">
              A saree becomes a saree eleven days after it stops being a thread.
            </h2>
            <p className="mt-6 text-cream/70 leading-relaxed text-lg max-w-lg">
              Kumar is a third-generation weaver in Kanchipuram. His loom is 47 years old. He weaves eight
              Kanjivarams a year — no more, no less. This is the eleven-day story of one of them.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/craft" className="eyebrow bg-gold-soft text-ink px-8 py-4 btn-shimmer">Read the story</Link>
              <Link to="/collection/bridal-heirlooms" className="eyebrow underline text-cream underline-offset-4">Shop Kumar's Kanjivarams →</Link>
            </div>

            {/* mini-stats */}
            <div className="mt-16 grid grid-cols-3 gap-6 border-t border-cream/15 pt-8">
              {[
                { n: '84', l: 'Weaving families' },
                { n: '11', l: 'Days per saree' },
                { n: '5.5m', l: 'Woven, exactly' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-4xl lg:text-5xl text-gold-soft">{s.n}</p>
                  <p className="eyebrow text-cream/60 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ BESTSELLERS ============ */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="eyebrow text-clay mb-3">Loved and re-loved</p>
              <h2 className="display-h1 text-4xl md:text-5xl lg:text-[64px]">The most-worn.</h2>
            </div>
            <Link to="/best-sellers" className="eyebrow text-ink link-underline">All bestsellers →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-10 lg:gap-y-14">
            {bestsellers.map((s, i) => <ProductCard saree={s} key={s.id} index={i} />)}
          </div>
        </div>
      </section>

      {/* ============ IMMERSIVE COLLECTION ============ */}
      <section className="relative min-h-[85vh] lg:min-h-[95vh] overflow-hidden bg-ink">
        <img src="/images/campaign-secondary.jpg" alt="Two women in luxurious sarees in a heritage garden" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/30 to-transparent" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-10 h-full min-h-[85vh] lg:min-h-[95vh] flex flex-col justify-center py-20">
          <div className="max-w-2xl text-cream">
            <p className="eyebrow text-gold-soft mb-6">Campaign · The Second Entrance</p>
            <h2 className="display-hero text-5xl md:text-6xl lg:text-[92px]">
              For the reception<br />and every glance after.
            </h2>
            <p className="mt-6 text-cream/80 text-lg max-w-md leading-relaxed">
              An editorial of sixteen sarees, styled for the second night — velvets, silks, organzas.
              Photographed at Bagh Haveli, Jodhpur.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/lookbook" className="eyebrow bg-cream text-ink px-8 py-4 btn-shimmer">See the Lookbook</Link>
              <Link to="/collection/festive-light" className="eyebrow border border-cream/70 text-cream px-8 py-4 hover:bg-cream hover:text-ink transition-colors">Shop the Edit</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ NEW ARRIVALS ============ */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="eyebrow text-clay mb-3">Just off the loom</p>
              <h2 className="display-h1 text-4xl md:text-5xl lg:text-[64px]">New this fortnight.</h2>
            </div>
            <Link to="/new-arrivals" className="eyebrow text-ink link-underline">View all →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-10 lg:gap-y-14">
            {arrivals.slice(0, 8).map((s, i) => <ProductCard saree={s} key={s.id} index={i} />)}
          </div>
        </div>
      </section>

      {/* ============ SHOP BY FABRIC ============ */}
      <section className="bg-parchment-soft/50 py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="eyebrow text-clay mb-3">By Fabric</p>
              <h2 className="display-h1 text-4xl md:text-5xl lg:text-[64px]">How it will feel.</h2>
            </div>
            <Link to="/fabric-guide" className="eyebrow text-ink link-underline">Read the fabric guide →</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {FABRICS.map((f) => (
              <Link key={f.slug} to={`/fabric/${f.slug}`} className="group relative bg-cream border border-hairline p-6 lg:p-8 flex flex-col justify-between min-h-[220px] overflow-hidden">
                <div className="relative z-10">
                  <p className="font-display text-3xl lg:text-4xl">{f.label}</p>
                  <p className="text-xs text-ink-soft mt-2">{f.hint}</p>
                </div>
                <div className="eyebrow relative z-10 text-clay group-hover:text-ink transition-colors flex items-center gap-2">
                  Shop {f.label.toLowerCase()} <ArrowRight size={12} />
                </div>
                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-clay/10 group-hover:scale-150 transition-transform duration-700" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LOOKBOOK STRIP ============ */}
      <section className="py-20 lg:py-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mb-10">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="eyebrow text-clay mb-3">Lookbook</p>
              <h2 className="display-h1 text-4xl md:text-5xl lg:text-[64px]">Worn, in the world.</h2>
            </div>
            <Link to="/lookbook" className="eyebrow text-ink link-underline">Full lookbook →</Link>
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-4 lg:gap-6 marquee" style={{ width: 'max-content' }}>
            {[...Array(2)].flatMap((_, dup) =>
              ['/images/saree-8.jpg', '/images/saree-1.jpg', '/images/saree-10.jpg', '/images/saree-5.jpg', '/images/saree-9.jpg', '/images/saree-12.jpg', '/images/saree-3.jpg', '/images/saree-7.jpg'].map((src, i) => (
                <div key={`${dup}-${i}`} className="w-[280px] lg:w-[360px] shrink-0">
                  <img src={src} alt="" className="w-full ratio-portrait object-cover" />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <section className="bg-ink text-cream py-24 lg:py-32">
        <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <p className="eyebrow text-gold-soft mb-3">In their own words</p>
            <h2 className="display-h1 text-4xl md:text-5xl lg:text-[64px]">12,400 sarees, kept.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { name: 'Ananya, Bengaluru', body: 'My Kanjivaram arrived with a hand-written note from the weaver. I have been undone by no other purchase in my life.', product: 'Aranyaa Crimson' },
              { name: 'Neha, London', body: 'The Chanderi is a quiet, everyday miracle. It moves like water and holds a pleat like a book spine.', product: 'Ilaa Saffron Chanderi' },
              { name: 'Meera, Mumbai', body: 'Wore the Moonlight Ivory to my sister\'s wedding. Everyone asked. I told them where it was made and why.', product: 'Moonlight Ivory' },
            ].map((r) => (
              <div key={r.name} className="border border-cream/15 p-8">
                <div className="flex gap-1 mb-4 text-gold-soft">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="fill-current" />)}
                </div>
                <p className="font-display text-xl leading-snug italic text-cream">"{r.body}"</p>
                <div className="mt-6 pt-4 border-t border-cream/15">
                  <p className="text-sm">{r.name}</p>
                  <p className="eyebrow text-gold-soft/80 mt-1">on {r.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ JOURNAL PREVIEW ============ */}
      <section className="py-20 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="eyebrow text-clay mb-3">The Aranyaa Journal</p>
              <h2 className="display-h1 text-4xl md:text-5xl lg:text-[64px]">Reading room.</h2>
            </div>
            <Link to="/journal" className="eyebrow text-ink link-underline">All essays →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {JOURNAL.slice(0, 3).map((post, i) => (
              <Link key={post.slug} to={`/journal/${post.slug}`} className="group block">
                <div className="overflow-hidden ratio-4-5 bg-parchment mb-5">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                </div>
                <p className="eyebrow text-clay">{post.category} · {post.readTime}</p>
                <h3 className="font-display text-2xl mt-2 leading-snug">{post.title}</h3>
                <p className="text-sm text-ink-soft mt-2">{post.excerpt}</p>
                {void i}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
