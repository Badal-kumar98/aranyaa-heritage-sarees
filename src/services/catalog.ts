// API adapter surface. Screens import from here — later, swap the mock
// repositories for real fetch calls without touching pages.
import { SAREES } from '../data/sarees';
import { COLLECTIONS, JOURNAL } from '../data/collections';
import { MOCK_ORDERS, MOCK_ADDRESSES } from '../data/mockOrders';
import type { Saree } from '../types';

const simulate = <T,>(v: T, ms = 0): Promise<T> => new Promise((r) => setTimeout(() => r(v), ms));

export const catalogService = {
  getProducts: (opts?: { limit?: number; badge?: string }) => {
    let items = [...SAREES];
    if (opts?.badge) items = items.filter((s) => s.badges.includes(opts.badge!));
    if (opts?.limit) items = items.slice(0, opts.limit);
    return simulate(items);
  },
  getNewArrivals: (limit = 8) => simulate(SAREES.filter((s) => s.badges.includes('new')).slice(0, limit)),
  getBestsellers: (limit = 8) => simulate(SAREES.filter((s) => s.badges.includes('bestseller')).slice(0, limit)),
  getProductBySlug: (slug: string): Promise<Saree | undefined> =>
    simulate(SAREES.find((s) => s.slug === slug)),
  searchProducts: (q: string) => {
    const query = q.toLowerCase().trim();
    if (!query) return simulate([] as Saree[]);
    const scored = SAREES.map((s) => {
      const hay = `${s.name} ${s.category} ${s.fabric} ${s.tags.join(' ')} ${s.primaryColor.name}`.toLowerCase();
      const score = hay.includes(query) ? 1 : 0;
      return { s, score };
    })
      .filter((r) => r.score > 0)
      .map((r) => r.s);
    return simulate(scored);
  },
  getCollections: () => simulate(COLLECTIONS),
  getCollection: (slug: string) => simulate(COLLECTIONS.find((c) => c.slug === slug)),
  getCollectionProducts: (slug: string) => {
    const col = COLLECTIONS.find((c) => c.slug === slug);
    if (!col) return simulate([] as Saree[]);
    return simulate(SAREES.filter((s) => col.productIds.includes(s.id)));
  },
  getRelated: (slug: string, take = 4) => {
    const cur = SAREES.find((s) => s.slug === slug);
    if (!cur) return simulate([] as Saree[]);
    const others = SAREES.filter((s) => s.slug !== slug && s.category === cur.category).slice(0, take);
    return simulate(others);
  },
  getJournal: () => simulate(JOURNAL),
};

export const accountService = {
  getOrders: () => simulate(MOCK_ORDERS),
  getOrder: (id: string) => simulate(MOCK_ORDERS.find((o) => o.id === id)),
  getAddresses: () => simulate(MOCK_ADDRESSES),
};
