import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/ui/Breadcrumb';

const SHOTS = [
  { src: '/images/campaign-hero.jpg', span: 'lg:col-span-8 lg:row-span-2', title: '01 · The Courtyard', copy: 'Aranyaa Crimson Kanjivaram · Chettinad' },
  { src: '/images/saree-8.jpg', span: 'lg:col-span-4', title: '02 · Emerald Hallway' },
  { src: '/images/saree-10.jpg', span: 'lg:col-span-4', title: '03 · Blush Step' },
  { src: '/images/campaign-secondary.jpg', span: 'lg:col-span-12', title: '04 · Two Sisters' },
  { src: '/images/saree-1.jpg', span: 'lg:col-span-4' },
  { src: '/images/saree-9.jpg', span: 'lg:col-span-4' },
  { src: '/images/saree-12.jpg', span: 'lg:col-span-4' },
  { src: '/images/lookbook-courtyard.jpg', span: 'lg:col-span-8', title: '08 · The Garden' },
  { src: '/images/saree-11.jpg', span: 'lg:col-span-4', title: '09 · Terracotta Morning' },
];

const Lookbook = () => (
  <div className="pb-24">
    <section className="bg-ink text-cream py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Lookbook' }]} />
        <div className="mt-8 max-w-3xl">
          <p className="eyebrow text-gold-soft mb-3">Lookbook · Autumn / Winter 2026</p>
          <h1 className="display-hero text-5xl md:text-6xl lg:text-[104px]">The Second Entrance.</h1>
          <p className="text-cream/70 mt-6 text-lg">Sixteen sarees, photographed at Bagh Haveli, Jodhpur. Styled for the reception, the second night, and every glance thereafter.</p>
        </div>
      </div>
    </section>

    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
      <div className="grid lg:grid-cols-12 gap-3 lg:gap-4 auto-rows-[320px] lg:auto-rows-[380px]">
        {SHOTS.map((shot, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.06 }}
            className={`relative overflow-hidden ${shot.span || 'lg:col-span-4'}`}
          >
            <img src={shot.src} alt="" className="h-full w-full object-cover" />
            {shot.title && (
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-ink/80 to-transparent text-cream">
                <p className="eyebrow text-gold-soft">{shot.title}</p>
                {shot.copy && <p className="font-display text-lg mt-1">{shot.copy}</p>}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-16">
        <Link to="/collection/festive-light" className="eyebrow bg-ink text-cream px-6 py-3">Shop the Edit</Link>
      </div>
    </section>
  </div>
);

export default Lookbook;
