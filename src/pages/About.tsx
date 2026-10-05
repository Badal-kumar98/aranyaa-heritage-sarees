import { Link } from 'react-router-dom';
import Breadcrumb from '../components/ui/Breadcrumb';

const About = () => (
  <div className="pb-24">
    <section className="grid lg:grid-cols-2 min-h-[80vh]">
      <div className="relative order-2 lg:order-1">
        <img src="./images/campaign-hero.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>
      <div className="px-6 lg:px-16 py-16 lg:py-24 flex flex-col justify-center bg-cream order-1 lg:order-2">
        <div>
          <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Our Story' }]} />
        </div>
        <p className="eyebrow text-clay mt-8 mb-3">Est. 2016 · Bengaluru, Kanchipuram, Varanasi</p>
        <h1 className="display-h1 text-5xl lg:text-7xl leading-[1.02]">Our story is a saree.</h1>
        <p className="text-ink-soft mt-6 text-lg leading-relaxed max-w-lg">
          Aranyaa began in 2016 with a single decision: that we would only sell sarees that were signed by the person who wove them. Ten years later, we work with 84 weaving families across India — and the promise still holds.
        </p>
      </div>
    </section>

    <section className="max-w-[1200px] mx-auto px-6 lg:px-10 py-24 grid lg:grid-cols-3 gap-12">
      {[
        { n: '01', t: 'The weaver is the maker', d: 'Every saree carries the signature of the weaver who made it. We publish their names, their villages, and their looms.' },
        { n: '02', t: 'One saree at a time', d: 'We commission in small batches — no more than eight of any single design. When a saree sells out, it stays sold out.' },
        { n: '03', t: 'Made to be kept', d: 'We design sarees to be worn in decades, not seasons. Every piece includes a care guide and a return-to-us cleaning service.' },
      ].map((s) => (
        <div key={s.n}>
          <p className="font-display text-6xl text-clay">{s.n}</p>
          <p className="font-display text-2xl mt-3">{s.t}</p>
          <p className="text-ink-soft mt-3">{s.d}</p>
        </div>
      ))}
    </section>

    <section className="bg-ink text-cream py-24">
      <div className="max-w-3xl mx-auto text-center px-6">
        <p className="eyebrow text-gold-soft mb-4">A note from the founders</p>
        <p className="font-display text-3xl lg:text-4xl leading-snug italic">
          “We do not think of a saree as a garment. We think of it as a letter — from a weaver in Kanchipuram, passed through your hands, into the wardrobe of someone you may not have met yet.”
        </p>
        <p className="eyebrow text-gold-soft mt-8">Aranyaa & Meera · Founders</p>
        <Link to="/craft" className="eyebrow bg-gold-soft text-ink px-6 py-3 mt-10 inline-block">Read The Craft</Link>
      </div>
    </section>
  </div>
);

export default About;
