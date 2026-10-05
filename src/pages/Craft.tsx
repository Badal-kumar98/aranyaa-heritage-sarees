import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/ui/Breadcrumb';

const STEPS = [
  { n: '01', t: 'The yarn arrives', d: 'Mulberry silk from Karnataka, dyed by hand in indigo-fermented iron pots. Each hank is checked, weighed and tagged.', img: '/images/craft-hands.jpg' },
  { n: '02', t: 'The warp is set', d: '5,300 parallel threads are laid across the frame — a five-day exercise in tension. This is where a Kanjivaram begins.', img: '/images/craft-loom.jpg' },
  { n: '03', t: 'The pallu, first', d: 'The most technical section is woven first: extra-weft zari threaded through mango motifs held only in memory.', img: '/images/detail-pallu.jpg' },
  { n: '04', t: 'Border and body', d: 'A separate weaver joins the border to the body using the korvai three-shuttle technique. Two colours, one loom.', img: '/images/detail-border.jpg' },
  { n: '05', t: 'Cut, signed, sent', d: 'On the eleventh day the saree is cut, folded, signed with a needle-and-thread mark, and photographed for our archive.', img: '/images/craft-block.jpg' },
];

const Craft = () => (
  <div className="pb-24">
    <section className="relative min-h-[70vh] bg-ink text-cream overflow-hidden">
      <img src="/images/craft-hands.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink to-ink/20" />
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-16 min-h-[70vh] flex flex-col justify-end">
        <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'The Craft' }]} />
        <div className="mt-8 max-w-3xl">
          <p className="eyebrow text-gold-soft mb-4">The Craft</p>
          <h1 className="display-hero text-5xl md:text-7xl lg:text-[104px]">The eleven-day saree.</h1>
          <p className="text-cream/80 mt-6 text-lg max-w-2xl">Eleven days on a 47-year-old loom, in a single room in Kanchipuram — the making of one of our bridal Kanjivarams, told in five chapters.</p>
        </div>
      </div>
    </section>

    {STEPS.map((s, i) => (
      <motion.section
        key={s.n}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-12 gap-8 lg:gap-16 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
      >
        <div className="lg:col-span-7 [direction:ltr]">
          <img src={s.img} alt={s.t} className="w-full ratio-3-2 object-cover" />
        </div>
        <div className="lg:col-span-5 [direction:ltr]">
          <p className="font-display text-8xl lg:text-9xl text-clay/40">{s.n}</p>
          <h2 className="font-display text-4xl lg:text-5xl mt-4 leading-tight">{s.t}</h2>
          <p className="text-ink-soft mt-6 text-lg leading-relaxed">{s.d}</p>
        </div>
      </motion.section>
    ))}

    <section className="bg-parchment-soft/50 py-24 text-center">
      <div className="max-w-2xl mx-auto px-6">
        <p className="eyebrow text-clay mb-4">To be worn, to be kept</p>
        <h2 className="font-display text-4xl lg:text-5xl leading-tight">Every saree from our atelier carries a signature. Yours will too.</h2>
        <Link to="/collection/bridal-heirlooms" className="eyebrow bg-ink text-cream px-6 py-3 mt-8 inline-block">Explore the Heirlooms</Link>
      </div>
    </section>
  </div>
);

export default Craft;
