import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { COLLECTIONS } from '../data/collections';
import Breadcrumb from '../components/ui/Breadcrumb';

const CollectionsIndex = () => (
  <div className="pb-24">
    <section className="bg-parchment-soft/40 border-b border-hairline py-12 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Collections' }]} />
        <div className="mt-6 max-w-3xl">
          <p className="eyebrow text-clay mb-3">The Collections</p>
          <h1 className="display-h1 text-5xl md:text-6xl lg:text-[92px]">Curated in chapters.</h1>
          <p className="text-ink-soft mt-6 text-lg">Every season, our studio releases four small collections — each with its own voice, weavers and story.</p>
        </div>
      </div>
    </section>
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 space-y-24">
      {COLLECTIONS.map((c, i) => (
        <motion.div
          key={c.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className={`grid lg:grid-cols-12 gap-8 lg:gap-14 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
        >
          <div className="lg:col-span-7 [direction:ltr]">
            <Link to={`/collection/${c.slug}`} className="block group overflow-hidden">
              <img src={c.hero} alt={c.title} className="w-full ratio-3-2 object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            </Link>
          </div>
          <div className="lg:col-span-5 [direction:ltr]">
            <p className="eyebrow text-clay mb-3">Chapter 0{i + 1} · {c.count} pieces</p>
            <h2 className="display-h1 text-4xl lg:text-6xl leading-[1.05]">{c.title}</h2>
            <p className="font-display italic text-xl text-ink-soft mt-4">{c.tagline}</p>
            <p className="text-ink-soft mt-6 leading-relaxed">{c.description}</p>
            <p className="eyebrow text-clay mt-6">Palette · {c.palette}</p>
            <Link to={`/collection/${c.slug}`} className="eyebrow bg-ink text-cream px-6 py-3 mt-8 inline-block btn-shimmer">Explore the collection</Link>
          </div>
        </motion.div>
      ))}
    </section>
  </div>
);

export default CollectionsIndex;
