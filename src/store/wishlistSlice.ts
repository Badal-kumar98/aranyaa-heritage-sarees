import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const STORAGE_KEY = 'aranyaa:wishlist:v1';

const load = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch { return []; }
};

const save = (ids: string[]) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); } catch { /* noop */ }
};

interface WishlistState { ids: string[]; }

const initialState: WishlistState = { ids: load() };

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<string>) {
      const idx = state.ids.indexOf(action.payload);
      if (idx >= 0) state.ids.splice(idx, 1);
      else state.ids.push(action.payload);
      save(state.ids);
    },
    remove(state, action: PayloadAction<string>) {
      state.ids = state.ids.filter((id) => id !== action.payload);
      save(state.ids);
    },
    clear(state) { state.ids = []; save(state.ids); },
  },
});

export const { toggle, remove, clear } = wishlistSlice.actions;
export default wishlistSlice.reducer;
