import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CheckoutContact { email: string; phone: string; marketing: boolean; }
export interface CheckoutAddress {
  name: string; line1: string; line2?: string;
  city: string; state: string; postalCode: string; country: string;
}
interface CheckoutState {
  step: 'contact' | 'shipping' | 'payment' | 'review';
  contact: CheckoutContact;
  shipping: CheckoutAddress;
  billingSameAsShipping: boolean;
  shippingMethod: 'standard' | 'express' | 'atelier';
  paymentMethod: 'card' | 'upi' | 'netbanking' | 'cod';
  lastOrderNumber?: string;
}

const empty: CheckoutAddress = { name: '', line1: '', line2: '', city: '', state: '', postalCode: '', country: 'India' };

const initialState: CheckoutState = {
  step: 'contact',
  contact: { email: '', phone: '', marketing: true },
  shipping: empty,
  billingSameAsShipping: true,
  shippingMethod: 'standard',
  paymentMethod: 'card',
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setStep(state, a: PayloadAction<CheckoutState['step']>) { state.step = a.payload; },
    setContact(state, a: PayloadAction<Partial<CheckoutContact>>) { state.contact = { ...state.contact, ...a.payload }; },
    setShipping(state, a: PayloadAction<Partial<CheckoutAddress>>) { state.shipping = { ...state.shipping, ...a.payload }; },
    setShippingMethod(state, a: PayloadAction<CheckoutState['shippingMethod']>) { state.shippingMethod = a.payload; },
    setPaymentMethod(state, a: PayloadAction<CheckoutState['paymentMethod']>) { state.paymentMethod = a.payload; },
    setOrderNumber(state, a: PayloadAction<string>) { state.lastOrderNumber = a.payload; },
    resetCheckout() { return initialState; },
  },
});

export const {
  setStep, setContact, setShipping, setShippingMethod, setPaymentMethod, setOrderNumber, resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
