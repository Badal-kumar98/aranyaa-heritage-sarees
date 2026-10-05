import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="max-w-2xl mx-auto text-center py-24 lg:py-40 px-6">
    <p className="font-display text-clay text-[120px] lg:text-[180px] leading-none">404</p>
    <p className="eyebrow text-clay mb-3">A page you may not have meant</p>
    <h1 className="font-display text-4xl lg:text-6xl">We couldn’t find that.</h1>
    <p className="text-ink-soft mt-4 mb-8">The saree you’re looking for may have sold out, or the page moved. Let’s begin again.</p>
    <div className="flex justify-center gap-3 flex-wrap">
      <Link to="/" className="eyebrow bg-ink text-cream px-6 py-3">Return home</Link>
      <Link to="/shop" className="eyebrow border border-ink px-6 py-3">Browse all sarees</Link>
    </div>
  </div>
);

export default NotFound;
