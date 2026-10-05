import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const STORAGE_KEY = 'aranyaa:recent-searches:v1';
const load = (): string[] => {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : []; }
  catch { return []; }
};
const save = (arr: string[]) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); } catch { /* noop */ } };

interface SearchState {
  overlayOpen: boolean;
  query: string;
  recent: string[];
}

const initialState: SearchState = {
  overlayOpen: false,
  query: '',
  recent: load(),
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    openOverlay(state) { state.overlayOpen = true; },
    closeOverlay(state) { state.overlayOpen = false; state.query = ''; },
    setQuery(state, action: PayloadAction<string>) { state.query = action.payload; },
    recordSearch(state, action: PayloadAction<string>) {
      const q = action.payload.trim();
      if (!q) return;
      state.recent = [q, ...state.recent.filter((x) => x.toLowerCase() !== q.toLowerCase())].slice(0, 6);
      save(state.recent);
    },
    clearRecent(state) { state.recent = []; save([]); },
  },
});

export const { openOverlay, closeOverlay, setQuery, recordSearch, clearRecent } = searchSlice.actions;
export default searchSlice.reducer;
