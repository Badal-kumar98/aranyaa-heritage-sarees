import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumb from '../components/ui/Breadcrumb';
import ProductCard from '../components/commerce/ProductCard';
import { SAREES } from '../data/sarees';

const QUESTIONS = [
  { q: 'What is the occasion?', opts: ['Bridal', 'Reception', 'Festive', 'Everyday', 'Destination'] },
  { q: 'Which fabric feels right?', opts: ['Silk', 'Cotton', 'Linen', 'Organza', 'I\u2019m open'] },
  { q: 'Your comfortable price?', opts: ['Under ₹15,000', '₹15k — ₹40k', '₹40k — ₹1L', 'Above ₹1L'] },
  { q: 'A colour you love?', opts: ['Reds', 'Ivory & neutrals', 'Jewel tones', 'Earthy', 'Anything'] },
];

const FindYourSaree = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const pick = (o: string) => {
    const next = [...answers]; next[step] = o; setAnswers(next);
    setTimeout(() => setStep((s) => s + 1), 250);
  };

  if (step >= QUESTIONS.length) {
    const recs = SAREES.slice(0, 4);
    return (
      <div className="pb-24">
        <section className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-6">
          <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Find your Saree' }]} />
          <div className="my-10 text-center">
            <p className="eyebrow text-clay mb-3">Curated for you</p>
            <h1 className="font-display text-5xl lg:text-6xl">Four sarees for the day it is.</h1>
            <p className="text-ink-soft mt-4 max-w-md mx-auto">Based on your answers, our stylist thinks these are worth a longer look.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-10">
            {recs.map((s, i) => <ProductCard key={s.id} saree={s} index={i} />)}
          </div>
          <div className="text-center mt-12">
            <button onClick={() => { setStep(0); setAnswers([]); }} className="eyebrow underline mr-4">Start over</button>
            <Link to="/book-appointment" className="eyebrow bg-ink text-cream px-6 py-3">Book a stylist</Link>
          </div>
        </section>
      </div>
    );
  }

  const q = QUESTIONS[step];

  return (
    <div className="min-h-[80vh] flex flex-col justify-center pb-24">
      <div className="max-w-3xl mx-auto px-6 w-full">
        <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Find your Saree' }]} />
        <div className="mt-6 mb-8 flex items-center gap-2">
          {QUESTIONS.map((_, i) => (
            <div key={i} className={`h-0.5 flex-1 ${i <= step ? 'bg-ink' : 'bg-hairline'}`} />
          ))}
        </div>
        <p className="eyebrow text-clay mb-3">Question {step + 1} of {QUESTIONS.length}</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            <h1 className="font-display text-4xl lg:text-6xl">{q.q}</h1>
            <div className="grid sm:grid-cols-2 gap-3 mt-10">
              {q.opts.map((o) => (
                <button
                  key={o}
                  onClick={() => pick(o)}
                  className="text-left p-5 border border-hairline hover:border-ink hover:bg-parchment-soft transition-all font-display text-xl"
                >{o}</button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        {step > 0 && <button onClick={() => setStep(step - 1)} className="eyebrow underline mt-8">← Back</button>}
      </div>
    </div>
  );
};

export default FindYourSaree;
