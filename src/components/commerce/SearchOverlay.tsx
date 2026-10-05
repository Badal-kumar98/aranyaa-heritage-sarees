import { AnimatePresence, motion } from 'framer-motion';
import { Search, X, ArrowRight, Clock } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { closeOverlay, recordSearch, setQuery, clearRecent } from '../../store/searchSlice';
import { catalogService } from '../../services/catalog';
import type { Saree } from '../../types';
import { formatINR } from '../../utils/format';

const POPULAR = ['Kanjivaram', 'Bridal reds', 'Chanderi', 'Ivory Banarasi', 'Under ₹15,000', 'Everyday linen'];

const SearchOverlay = () => {
  const open = useAppSelector((s) => s.search.overlayOpen);
  const query = useAppSelector((s) => s.search.query);
  const recent = useAppSelector((s) => s.search.recent);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [results, setResults] = useState<Saree[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(async () => {
      if (!query.trim()) { setResults([]); return; }
      setLoading(true);
      const r = await catalogService.searchProducts(query);
      setResults(r);
      setLoading(false);
    }, 160);
    return () => clearTimeout(t);
  }, [query, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(closeOverlay());
    };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, dispatch]);

  const submit = () => {
    if (!query.trim()) return;
    dispatch(recordSearch(query));
    dispatch(closeOverlay());
    nav(`/search?q=${encodeURIComponent(query)}`);
  };

  const suggestions = useMemo(() => results.slice(0, 5), [results]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => dispatch(closeOverlay())}
            className="fixed inset-0 bg-ink/50 z-50"
          />
          <motion.div
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 inset-x-0 bg-cream z-50 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="border-b border-hairline">
              <div className="max-w-[1200px] mx-auto px-6 lg:px-10 flex items-center gap-4 py-5">
                <Search size={22} className="text-clay shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => dispatch(setQuery(e.target.value))}
                  onKeyDown={(e) => e.key === 'Enter' && submit()}
                  placeholder="Search sarees, occasions, weaves…"
                  className="flex-1 bg-transparent outline-none font-display text-2xl lg:text-3xl font-light placeholder:text-ink-soft/40"
                />
                <button onClick={() => dispatch(closeOverlay())} className="shrink-0 eyebrow text-ink-soft flex items-center gap-2">
                  <X size={18} /> Close
                </button>
              </div>
            </div>

            <div className="overflow-y-auto">
              <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-8 grid lg:grid-cols-2 gap-12">
                <div>
                  {recent.length > 0 && (
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-3">
                        <p className="eyebrow text-clay">Recent searches</p>
                        <button onClick={() => dispatch(clearRecent())} className="text-xs text-ink-soft underline">Clear</button>
                      </div>
                      <ul className="space-y-1.5">
                        {recent.map((r) => (
                          <li key={r}>
                            <button
                              onClick={() => { dispatch(setQuery(r)); }}
                              className="flex items-center gap-3 text-ink hover:text-crimson"
                            ><Clock size={14} className="text-clay" /> {r}</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <p className="eyebrow text-clay mb-3">Popular searches</p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR.map((p) => (
                      <button
                        key={p}
                        onClick={() => dispatch(setQuery(p))}
                        className="eyebrow border border-hairline px-3 py-1.5 hover:bg-ink hover:text-cream transition-colors"
                      >{p}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="eyebrow text-clay mb-3">
                    {query.trim()
                      ? loading ? 'Searching…' : `${results.length} suggestions`
                      : 'Suggested for you'}
                  </p>
                  {(query.trim() ? suggestions : []).length === 0 && query.trim() && !loading && (
                    <div className="border border-hairline p-6">
                      <p className="font-display text-xl mb-2">No matches, yet.</p>
                      <p className="text-sm text-ink-soft mb-4">Try ‘Kanjivaram’ or ‘Chanderi’, or browse everyday linens.</p>
                      <button onClick={() => { dispatch(closeOverlay()); nav('/shop'); }} className="eyebrow underline">Browse everything</button>
                    </div>
                  )}
                  <ul className="divide-y divide-hairline">
                    {suggestions.map((s) => (
                      <li key={s.id}>
                        <button
                          className="w-full text-left py-3 flex items-center gap-4 hover:bg-parchment-soft/50 px-2 -mx-2"
                          onClick={() => { dispatch(closeOverlay()); nav(`/product/${s.slug}`); }}
                        >
                          <img src={s.images[0]} alt="" className="h-14 w-11 object-cover" />
                          <div className="flex-1">
                            <p className="eyebrow text-[10px] text-clay">{s.categoryLabel}</p>
                            <p className="font-display text-[15px] leading-snug">{s.shortName}</p>
                            <p className="text-xs text-ink-soft">{formatINR(s.price)}</p>
                          </div>
                          <ArrowRight size={16} className="text-ink-soft" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  {results.length > 5 && (
                    <button onClick={submit} className="mt-4 eyebrow text-clay underline">
                      See all {results.length} results →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
