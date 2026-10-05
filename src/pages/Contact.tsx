import { Mail, Phone, Instagram, MapPin } from 'lucide-react';
import Breadcrumb from '../components/ui/Breadcrumb';

const Contact = () => (
  <div className="pb-24">
    <section className="bg-parchment-soft/40 py-12 lg:py-24 border-b border-hairline">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
        <h1 className="display-h1 text-5xl lg:text-7xl mt-6">Say hello.</h1>
        <p className="text-ink-soft mt-4 max-w-xl text-lg">We reply within a working day. For urgent orders, WhatsApp is fastest.</p>
      </div>
    </section>
    <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-12">
      <div>
        <form className="space-y-4">
          {['Full name', 'Email', 'Subject'].map((l) => (
            <div key={l}>
              <label className="eyebrow text-clay text-[10px]">{l}</label>
              <input className="w-full border-b border-hairline focus:border-ink outline-none py-2.5" />
            </div>
          ))}
          <div>
            <label className="eyebrow text-clay text-[10px]">Message</label>
            <textarea rows={5} className="w-full border-b border-hairline focus:border-ink outline-none py-2.5 resize-none" />
          </div>
          <button className="eyebrow bg-ink text-cream px-6 py-3 btn-shimmer">Send</button>
        </form>
      </div>
      <div className="space-y-8">
        <div>
          <p className="eyebrow text-clay mb-3">Get in touch</p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3"><Mail size={16} className="text-clay" /> care@aranyaa.co</li>
            <li className="flex items-center gap-3"><Phone size={16} className="text-clay" /> +91 80 2670 4200</li>
            <li className="flex items-center gap-3"><Instagram size={16} className="text-clay" /> @aranyaa.co</li>
            <li className="flex items-center gap-3"><MapPin size={16} className="text-clay" /> Bengaluru · Kanchipuram · Varanasi</li>
          </ul>
        </div>
        <div className="border border-hairline p-6">
          <p className="eyebrow text-clay mb-2">Studio hours</p>
          <p className="font-display text-xl">Mon — Sat, 11:00 to 19:00 IST</p>
          <p className="text-sm text-ink-soft mt-2">By appointment, at our Bengaluru studio.</p>
        </div>
      </div>
    </section>
  </div>
);

export default Contact;
