import { Link } from 'react-router-dom';
import { JOURNAL } from '../data/collections';
import Breadcrumb from '../components/ui/Breadcrumb';

const Journal = () => (
  <div className="pb-24">
    <section className="bg-parchment-soft/40 border-b border-hairline py-12 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Journal' }]} />
        <div className="mt-6 max-w-2xl">
          <p className="eyebrow text-clay mb-3">The Aranyaa Journal</p>
          <h1 className="display-h1 text-5xl md:text-6xl lg:text-[88px]">Reading room.</h1>
          <p className="text-ink-soft mt-4 text-lg">Essays on craft, weavers, drapes and the small, insistent world of Indian textiles.</p>
        </div>
      </div>
    </section>
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
      <Link to={`/journal/${JOURNAL[0].slug}`} className="group block mb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="overflow-hidden ratio-3-2 bg-parchment">
            <img src={JOURNAL[0].image} alt={JOURNAL[0].title} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
          </div>
          <div>
            <p className="eyebrow text-clay">Featured · {JOURNAL[0].category} · {JOURNAL[0].readTime}</p>
            <h2 className="font-display text-4xl lg:text-6xl mt-3 leading-tight">{JOURNAL[0].title}</h2>
            <p className="text-ink-soft mt-4 text-lg">{JOURNAL[0].excerpt}</p>
            <p className="eyebrow underline mt-6 inline-block">Read the essay →</p>
          </div>
        </div>
      </Link>
      <div className="grid md:grid-cols-3 gap-8">
        {JOURNAL.slice(1).map((p) => (
          <Link key={p.slug} to={`/journal/${p.slug}`} className="group block">
            <div className="overflow-hidden ratio-4-5 bg-parchment mb-4">
              <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            </div>
            <p className="eyebrow text-clay">{p.category} · {p.readTime}</p>
            <h3 className="font-display text-xl mt-2 leading-snug">{p.title}</h3>
            <p className="text-sm text-ink-soft mt-2">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  </div>
);

export default Journal;
