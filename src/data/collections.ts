import type { Collection, JournalPost } from '../types';
import { SAREES } from './sarees';

const pickIds = (predicate: (id: string) => boolean, take = 8) =>
  SAREES.filter((s) => predicate(s.slug)).slice(0, take).map((s) => s.id);

export const COLLECTIONS: Collection[] = [
  {
    slug: 'bridal-heirlooms',
    title: 'The Bridal Heirlooms',
    tagline: 'Sarees to be worn once, then remembered forever.',
    description:
      'Kanjivarams, Banarasis and Patolas woven over months by master families. Each piece is signed by its weaver and comes with a certificate of provenance.',
    hero: '/images/hero-1.jpg',
    count: 24,
    palette: 'Crimson, Ivory, Emerald',
    productIds: SAREES.filter((s) => s.occasions.includes('bridal')).slice(0, 8).map((s) => s.id),
  },
  {
    slug: 'the-quiet-everyday',
    title: 'The Quiet Everyday',
    tagline: 'Linens and chanderis for the days that hold the year together.',
    description:
      'A soft-spoken collection of everyday sarees — handwoven, easy to wear, honest in price. For weekday desks, weekend mornings, temple visits and quiet dinners.',
    hero: '/images/saree-11.jpg',
    count: 18,
    palette: 'Terracotta, Olive, Ochre',
    productIds: SAREES.filter((s) => s.occasions.includes('daily')).slice(0, 8).map((s) => s.id),
  },
  {
    slug: 'festive-light',
    title: 'Festive Light',
    tagline: 'For the lamps, the laddoos and everyone who stopped by.',
    description: 'Silks and organzas that carry themselves from dusk aarti to midnight card table.',
    hero: '/images/saree-5.jpg',
    count: 22,
    palette: 'Saffron, Rose, Blush',
    productIds: SAREES.filter((s) => s.occasions.includes('festive')).slice(0, 8).map((s) => s.id),
  },
  {
    slug: 'destination-drape',
    title: 'Destination Drape',
    tagline: 'Organzas and georgettes for weddings you had to fly to.',
    description:
      'Weightless drapes engineered for suitcases, sea salt and sunset ceremonies. Every piece packs into a shoebox.',
    hero: '/images/saree-10.jpg',
    count: 16,
    palette: 'Blush, Champagne, Sky',
    productIds: SAREES.filter((s) => s.occasions.includes('destination') || s.fabric === 'organza').slice(0, 8).map((s) => s.id),
  },
];

export const JOURNAL: JournalPost[] = [
  {
    slug: 'the-eleven-day-saree',
    title: 'The eleven-day saree: inside a Kanchipuram atelier',
    excerpt: 'What it takes to weave a bridal Kanjivaram, told through Kumar’s loom in Kanchipuram.',
    category: 'Craft',
    readTime: '7 min read',
    image: '/images/craft-hands.jpg',
    date: 'August 2026',
  },
  {
    slug: 'how-to-drape-nivi-style',
    title: 'How to drape a saree, nivi-style, in under four minutes',
    excerpt: 'The classic drape, decoded. Photographs, pin placements, and the honest bits nobody tells you.',
    category: 'Guide',
    readTime: '4 min read',
    image: '/images/hero-2.jpg',
    date: 'July 2026',
  },
  {
    slug: 'a-field-guide-to-silk',
    title: 'A field guide to silk: mulberry, tussar, muga and eri',
    excerpt: 'Not all silk is the same. A grower’s glossary, and how to tell them apart in your hand.',
    category: 'Guide',
    readTime: '9 min read',
    image: '/images/detail-fabric.jpg',
    date: 'July 2026',
  },
  {
    slug: 'the-mango-motif',
    title: 'The mango motif: why it appears on every Indian textile',
    excerpt: 'A short cultural history of the paisley — from Persian gardens to Kancheepuram pallus.',
    category: 'Story',
    readTime: '6 min read',
    image: '/images/detail-border.jpg',
    date: 'June 2026',
  },
];

// Silence unused warning for pickIds during future expansion
void pickIds;
