import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import catalogReducer from './catalogSlice';
import searchReducer from './searchSlice';
import uiReducer from './uiSlice';
import checkoutReducer from './checkoutSlice';
import accountReducer from './accountSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    catalog: catalogReducer,
    search: searchReducer,
    ui: uiReducer,
    checkout: checkoutReducer,
    account: accountReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
