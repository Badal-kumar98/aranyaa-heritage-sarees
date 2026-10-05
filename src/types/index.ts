export type SareeCategory =
  | 'kanjivaram'
  | 'banarasi'
  | 'chanderi'
  | 'linen'
  | 'organza'
  | 'tussar'
  | 'chikankari'
  | 'patola';

export type SareeOccasion =
  | 'bridal'
  | 'festive'
  | 'reception'
  | 'daily'
  | 'workwear'
  | 'destination';

export type Fabric = 'silk' | 'cotton' | 'linen' | 'organza' | 'chiffon' | 'georgette' | 'velvet';

export interface Swatch {
  name: string;
  hex: string;
}

export interface SareeVariant {
  id: string;
  color: Swatch;
  stock: number;
  images: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export interface Saree {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: SareeCategory;
  categoryLabel: string;
  occasions: SareeOccasion[];
  fabric: Fabric;
  weave: string;
  region: string;
  price: number;
  compareAtPrice?: number;
  currency: 'INR';
  images: string[];
  primaryImage: string;
  detailImages: {
    border?: string;
    pallu?: string;
    fabric?: string;
    blouse?: string;
  };
  colors: Swatch[];
  primaryColor: Swatch;
  story: string;
  craft: string;
  measurements: {
    sareeLength: string; // meters
    blousePiece: string;
    width: string;
  };
  care: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  badges: string[]; // 'new', 'bestseller', 'limited', 'handloom'
  tags: string[];
  editorialBlurb?: string;
  assetSource: 'stock' | 'generated' | 'brand';
  assetRoles: string[]; // ['model','pallu','border']
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  colorHex: string;
  quantity: number;
  fabric: string;
  addedAt: number;
}

export interface Address {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  number: string;
  placedAt: string;
  status: 'placed' | 'crafting' | 'quality' | 'dispatched' | 'in-transit' | 'delivered';
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    color: string;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  timeline: Array<{ status: string; label: string; date: string; done: boolean; note?: string }>;
}

export interface Collection {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  hero: string;
  count: number;
  palette: string;
  productIds: string[];
}

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  date: string;
}
