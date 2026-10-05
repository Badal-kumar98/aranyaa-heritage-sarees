import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Toast { id: string; title: string; body?: string; variant?: 'default' | 'success' | 'error'; }

interface UIState {
  mobileNavOpen: boolean;
  toasts: Toast[];
}

const initialState: UIState = {
  mobileNavOpen: false,
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openMobileNav(state) { state.mobileNavOpen = true; },
    closeMobileNav(state) { state.mobileNavOpen = false; },
    pushToast: {
      reducer: (state, action: PayloadAction<Toast>) => { state.toasts.push(action.payload); },
      prepare: (toast: Omit<Toast, 'id'>) => ({
        payload: { ...toast, id: Math.random().toString(36).slice(2) },
      }),
    },
    dismissToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { openMobileNav, closeMobileNav, pushToast, dismissToast } = uiSlice.actions;
export default uiSlice.reducer;
