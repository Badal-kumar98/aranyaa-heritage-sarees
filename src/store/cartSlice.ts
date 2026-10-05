import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../types';

const STORAGE_KEY = 'aranyaa:cart:v1';

const load = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch { return []; }
};

const save = (items: CartItem[]) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* noop */ }
};

interface CartState {
  items: CartItem[];
  drawerOpen: boolean;
  lastAddedId?: string;
  couponCode?: string;
  couponDiscount: number;
}

const initialState: CartState = {
  items: load(),
  drawerOpen: false,
  couponDiscount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(
        (i) => i.productId === action.payload.productId && i.color === action.payload.color
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.lastAddedId = action.payload.productId;
      state.drawerOpen = true;
      save(state.items);
    },
    removeItem(state, action: PayloadAction<{ productId: string; color: string }>) {
      state.items = state.items.filter(
        (i) => !(i.productId === action.payload.productId && i.color === action.payload.color)
      );
      save(state.items);
    },
    updateQuantity(state, action: PayloadAction<{ productId: string; color: string; quantity: number }>) {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId && i.color === action.payload.color
      );
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
        save(state.items);
      }
    },
    openDrawer(state) { state.drawerOpen = true; },
    closeDrawer(state) { state.drawerOpen = false; },
    clearCart(state) {
      state.items = [];
      state.couponCode = undefined;
      state.couponDiscount = 0;
      save(state.items);
    },
    applyCoupon(state, action: PayloadAction<string>) {
      const code = action.payload.toUpperCase().trim();
      // Demo coupons
      const table: Record<string, number> = {
        WELCOME10: 0.10,
        FESTIVE15: 0.15,
        HEIRLOOM: 0.05,
      };
      if (table[code]) {
        state.couponCode = code;
        state.couponDiscount = table[code];
      } else {
        state.couponCode = undefined;
        state.couponDiscount = 0;
      }
    },
  },
});

export const {
  addItem, removeItem, updateQuantity, openDrawer, closeDrawer, clearCart, applyCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;
