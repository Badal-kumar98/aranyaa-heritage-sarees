import Breadcrumb from '../components/ui/Breadcrumb';
import { Link } from 'react-router-dom';

const CONTENT: Record<string, { title: string; eyebrow: string; blurb: string; sections: Array<{ h: string; p: string | string[] }> }> = {
  'saree-guide': {
    eyebrow: 'A guide', title: 'The Saree Guide',
    blurb: 'From Kanjivaram to Chanderi — the vocabulary of Indian handwoven sarees, in one place.',
    sections: [
      { h: 'Kanjivaram', p: 'A silk saree from Kanchipuram, Tamil Nadu. Known for its weight, its lustre and its wide, contrasting borders joined by the korvai technique.' },
      { h: 'Banarasi', p: 'A silk saree from Varanasi, Uttar Pradesh. Woven with gold or silver zari in kadhwa (individual motifs) or jamdani (interlaced) styles.' },
      { h: 'Chanderi', p: 'A light, translucent saree from Madhya Pradesh. Silk warp, cotton weft, and a signature “glass finish”.' },
      { h: 'Patola', p: 'A double-ikat saree from Patan, Gujarat. Both warp and weft are resist-dyed before weaving — six months of work for a single saree.' },
    ],
  },
  'fabric-guide': {
    eyebrow: 'A guide', title: 'The Fabric Guide',
    blurb: 'Silk, cotton, linen, organza — how to tell them apart, and when to wear them.',
    sections: [
      { h: 'Silk', p: 'Made from the mulberry silk cocoon. Heavy, lustrous, holds a pleat forever. Wear for weddings, receptions and cold-weather festivities.' },
      { h: 'Cotton', p: 'Airy, breathable, forgiving. The everyday saree — hand-loomed in chanderi, jamdani or khadi.' },
      { h: 'Linen', p: 'Structured, cool, honest. Ideal for hot weather and workwear.' },
      { h: 'Organza', p: 'Weightless, translucent. Meant for garden weddings and sunset ceremonies.' },
    ],
  },
  'drape-guide': {
    eyebrow: 'A guide', title: 'How to Drape',
    blurb: 'The nivi drape, decoded — in seven steps, in under four minutes.',
    sections: [
      { h: '01. Start at the waist', p: 'Tuck one end of the saree into the right side of your petticoat, at the waist.' },
      { h: '02. Wrap once, tuck', p: 'Wrap the saree once around your waist and tuck it in at the front.' },
      { h: '03. Make the pleats', p: 'Bring the pallu to your left shoulder and pin. Then make 6–8 pleats from the remaining fabric at your front.' },
      { h: '04. Tuck the pleats', p: 'Tuck the pleats into your petticoat, slightly to the left of centre.' },
      { h: '05. Adjust the pallu', p: 'Even out the pallu on your shoulder — it should fall to the back of your knee, more or less.' },
    ],
  },
  care: {
    eyebrow: 'Care', title: 'Caring for Your Sarees',
    blurb: 'How to fold, store, iron and clean a saree so it lasts for decades.',
    sections: [
      { h: 'Storage', p: ['Store folded, wrapped in muslin. Refold every three months to prevent crease lines.', 'Never store in plastic — silk needs to breathe.'] },
      { h: 'Cleaning', p: 'Dry clean only, for silks. Cottons and linens can be gently hand-washed.' },
      { h: 'Ironing', p: 'Iron on reverse, on a silk setting. Never iron over zari.' },
    ],
  },
  faq: {
    eyebrow: 'FAQ', title: 'Frequently Asked',
    blurb: 'The questions we hear most often.',
    sections: [
      { h: 'Are your sarees really handwoven?', p: 'Yes. Every saree from our atelier is handwoven by a named weaver, and signed on the pallu.' },
      { h: 'How long does shipping take?', p: '72 hours across India, 5–7 days internationally.' },
      { h: 'Do you stitch the blouse?', p: 'Yes — complimentary blouse stitching to your measurements is included.' },
      { h: 'Can I return a saree?', p: 'Yes, within 7 days of delivery. The saree must be unworn, with tags intact.' },
    ],
  },
  shipping: {
    eyebrow: 'Care', title: 'Shipping',
    blurb: 'Complimentary across India in 72 hours. International in 5–7 days.',
    sections: [
      { h: 'India', p: 'Complimentary shipping across India, tracked, delivered in 72 hours by our courier partner.' },
      { h: 'International', p: 'DHL Express, 5–7 working days. Charges calculated at checkout.' },
      { h: 'Packaging', p: 'Every saree ships in an archival cotton pouch inside a keepsake box.' },
    ],
  },
  returns: {
    eyebrow: 'Care', title: 'Returns & Exchanges',
    blurb: '7-day easy returns — no questions asked.',
    sections: [
      { h: 'Eligibility', p: 'Sarees must be returned unworn, with all tags intact, in original packaging, within 7 days of delivery.' },
      { h: 'How', p: 'Request a return from your account, or WhatsApp us. We arrange the courier at no charge.' },
      { h: 'Refunds', p: 'Refunds are processed within 5 working days of receipt.' },
    ],
  },
  payments: {
    eyebrow: 'Care', title: 'Payment Information',
    blurb: 'Card, UPI, netbanking, or cash on delivery.',
    sections: [
      { h: 'What we accept', p: 'All major credit and debit cards, UPI, netbanking, wallets, and cash on delivery in India.' },
      { h: 'EMI', p: 'No-cost EMI available on all purchases above ₹15,000, for select banks.' },
      { h: 'Security', p: 'Payments are handled by our PCI-DSS Level 1 certified processor. Aranyaa never stores your card details.' },
    ],
  },
  privacy: {
    eyebrow: 'Policies', title: 'Privacy Policy',
    blurb: 'What we collect, why, and how we protect it.',
    sections: [
      { h: 'What we collect', p: 'Only what we need to send you sarees: your name, email, phone, address, and order history.' },
      { h: 'Analytics', p: 'We use anonymised analytics to understand what pages our customers love — never to profile you personally.' },
      { h: 'Your rights', p: 'You can request your data, export it, or delete it — write to privacy@aranyaa.co.' },
    ],
  },
  terms: {
    eyebrow: 'Policies', title: 'Terms of Service',
    blurb: 'The formal terms of use, in plain-ish English.',
    sections: [
      { h: 'Prices', p: 'All prices are in INR and inclusive of taxes.' },
      { h: 'Availability', p: 'We commission in small batches. When a saree sells out, it stays sold out.' },
      { h: 'Governing law', p: 'These terms are governed by the laws of India, in the courts of Bengaluru.' },
    ],
  },
  accessibility: {
    eyebrow: 'Policies', title: 'Accessibility',
    blurb: 'We build for everyone. Here is what we do, and how to tell us where we fall short.',
    sections: [
      { h: 'Our standards', p: 'We build to WCAG 2.1 AA. Every image has alt text; every interaction is keyboard-accessible.' },
      { h: 'Reduced motion', p: 'If you have prefers-reduced-motion set, our animations will respect it.' },
      { h: 'Contact', p: 'Found something we could do better? Write to accessibility@aranyaa.co and we\'ll fix it.' },
    ],
  },
  appointment: {
    eyebrow: 'Coming soon', title: 'Book an Appointment',
    blurb: 'A thirty-minute video call, or a visit to our Bengaluru studio, with one of our stylists.',
    sections: [
      { h: 'How it works', p: 'Pick a time; we send a Google Meet or a studio visit confirmation. We ask about the occasion beforehand so we come prepared.' },
      { h: 'The stylist', p: 'You\'ll speak with one of two people: Meera, our co-founder, or Ananya, our head of styling.' },
      { h: 'What it costs', p: 'Nothing. Consultations are complimentary; there is no obligation to purchase.' },
    ],
  },
};

const StaticPage = ({ slug }: { slug: string }) => {
  const c = CONTENT[slug];
  if (!c) return <div className="text-center py-32"><h1 className="font-display text-3xl">Page not found</h1></div>;

  return (
    <div className="pb-24">
      <section className="bg-parchment-soft/40 border-b border-hairline py-12 lg:py-24">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-10">
          <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: c.title }]} />
          <div className="mt-6">
            <p className="eyebrow text-clay mb-3">{c.eyebrow}</p>
            <h1 className="display-h1 text-5xl md:text-6xl lg:text-[76px]">{c.title}</h1>
            <p className="text-ink-soft mt-4 text-lg max-w-2xl">{c.blurb}</p>
          </div>
        </div>
      </section>
      <section className="max-w-[900px] mx-auto px-6 lg:px-10 py-16 divide-y divide-hairline">
        {c.sections.map((s) => (
          <div key={s.h} className="py-8 first:pt-0 grid lg:grid-cols-4 gap-6">
            <h2 className="font-display text-2xl lg:col-span-1">{s.h}</h2>
            <div className="lg:col-span-3 text-ink-soft leading-relaxed">
              {Array.isArray(s.p) ? s.p.map((p, i) => <p key={i} className="mb-3 last:mb-0">{p}</p>) : <p>{s.p}</p>}
            </div>
          </div>
        ))}
      </section>
      <section className="text-center py-12 border-t border-hairline">
        <Link to="/contact" className="eyebrow underline">Have a different question? Contact us →</Link>
      </section>
    </div>
  );
};

export default StaticPage;
