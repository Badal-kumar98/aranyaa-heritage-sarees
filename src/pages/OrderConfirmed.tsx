import { Link } from 'react-router-dom';
import { Check, Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderConfirmed = () => {
  const number = `ARN-2026-${Math.floor(Math.random() * 9000 + 1000)}`;
  return (
    <div className="max-w-3xl mx-auto text-center py-20 lg:py-32 px-6">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="h-20 w-20 rounded-full bg-emerald-deep grid place-items-center text-cream mx-auto mb-8"
      >
        <Check size={28} />
      </motion.div>
      <p className="eyebrow text-clay mb-3">Order placed</p>
      <h1 className="font-display text-5xl lg:text-7xl mb-4 leading-tight">Thank you.</h1>
      <p className="text-ink-soft max-w-lg mx-auto text-lg">
        Your order <span className="text-ink font-medium">{number}</span> is confirmed. A note is on its way to your inbox with delivery and tracking details.
      </p>

      <div className="border-y border-hairline mt-14 py-8 text-left grid sm:grid-cols-3 gap-6">
        {[
          { n: '01', t: 'We hand-check', b: 'Every saree is signed and inspected before it leaves our atelier.' },
          { n: '02', t: 'We stitch your blouse', b: 'Your blouse piece is tailored to your measurements (we\'ll email you).' },
          { n: '03', t: 'We ship, tracked', b: 'Your saree ships in 72 hours in an archival cotton pouch and keepsake box.' },
        ].map((s) => (
          <div key={s.n}>
            <p className="eyebrow text-clay">{s.n}</p>
            <p className="font-display text-xl mt-1">{s.t}</p>
            <p className="text-sm text-ink-soft mt-1.5">{s.b}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-12">
        <Link to="/account/orders" className="eyebrow bg-ink text-cream px-6 py-3 flex items-center justify-center gap-2">Track your order <ArrowRight size={14} /></Link>
        <button className="eyebrow border border-ink px-6 py-3 flex items-center justify-center gap-2"><Download size={14} /> Download invoice</button>
      </div>

      <Link to="/" className="eyebrow underline text-ink-soft mt-10 inline-block">Return home</Link>
    </div>
  );
};

export default OrderConfirmed;
