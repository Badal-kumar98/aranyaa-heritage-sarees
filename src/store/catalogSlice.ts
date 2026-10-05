import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type SortKey = 'featured' | 'new' | 'price-asc' | 'price-desc' | 'rating';

interface CatalogState {
  filters: {
    fabrics: string[];
    occasions: string[];
    colors: string[];
    categories: string[];
    priceMin?: number;
    priceMax?: number;
    inStockOnly: boolean;
  };
  sort: SortKey;
  view: 'grid' | 'gallery';
}

const initialState: CatalogState = {
  filters: {
    fabrics: [], occasions: [], colors: [], categories: [], inStockOnly: false,
  },
  sort: 'featured',
  view: 'grid',
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    toggleFilter(state, action: PayloadAction<{ group: keyof CatalogState['filters']; value: string }>) {
      const { group, value } = action.payload;
      const arr = state.filters[group] as string[];
      const idx = arr.indexOf(value);
      if (idx >= 0) arr.splice(idx, 1);
      else arr.push(value);
    },
    setPrice(state, action: PayloadAction<{ min?: number; max?: number }>) {
      state.filters.priceMin = action.payload.min;
      state.filters.priceMax = action.payload.max;
    },
    setInStock(state, action: PayloadAction<boolean>) { state.filters.inStockOnly = action.payload; },
    setSort(state, action: PayloadAction<SortKey>) { state.sort = action.payload; },
    setView(state, action: PayloadAction<'grid' | 'gallery'>) { state.view = action.payload; },
    clearAll(state) {
      state.filters = { fabrics: [], occasions: [], colors: [], categories: [], inStockOnly: false };
    },
  },
});

export const { toggleFilter, setPrice, setInStock, setSort, setView, clearAll } = catalogSlice.actions;
export default catalogSlice.reducer;
