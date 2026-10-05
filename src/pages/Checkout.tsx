import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Lock, ChevronLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { setStep, setContact, setShipping, setShippingMethod, setPaymentMethod, setOrderNumber, resetCheckout } from '../store/checkoutSlice';
import { clearCart } from '../store/cartSlice';
import { useCartTotals } from '../hooks/useCartTotals';
import { formatINR, cn } from '../utils/format';

const STEPS = [
  { id: 'contact', label: 'Contact' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
] as const;

const Checkout = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { items, subtotal, shipping, total } = useCartTotals();
  const step = useAppSelector((s) => s.checkout.step);
  const contact = useAppSelector((s) => s.checkout.contact);
  const shippingAddr = useAppSelector((s) => s.checkout.shipping);
  const shippingMethod = useAppSelector((s) => s.checkout.shippingMethod);
  const paymentMethod = useAppSelector((s) => s.checkout.paymentMethod);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-32">
        <h1 className="font-display text-4xl mb-4">Your bag is empty.</h1>
        <Link to="/shop" className="eyebrow bg-ink text-cream px-6 py-3">Browse sarees</Link>
      </div>
    );
  }

  const goNext = () => {
    const errs: Record<string, string> = {};
    if (step === 'contact') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errs.email = 'Please enter a valid email';
      if (contact.phone.length < 10) errs.phone = 'Please enter a valid phone';
    }
    if (step === 'shipping') {
      if (!shippingAddr.name) errs.name = 'Name is required';
      if (!shippingAddr.line1) errs.line1 = 'Address is required';
      if (!shippingAddr.city) errs.city = 'City is required';
      if (!/^\d{6}$/.test(shippingAddr.postalCode)) errs.postalCode = 'Please enter a valid 6-digit pincode';
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const idx = STEPS.findIndex((s) => s.id === step);
    if (idx < STEPS.length - 1) dispatch(setStep(STEPS[idx + 1].id));
    else {
      const num = `ARN-2026-${Math.floor(Math.random() * 9000 + 1000)}`;
      dispatch(setOrderNumber(num));
      dispatch(clearCart());
      dispatch(resetCheckout());
      nav('/order-confirmed');
    }
  };

  const back = () => {
    const idx = STEPS.findIndex((s) => s.id === step);
    if (idx > 0) dispatch(setStep(STEPS[idx - 1].id));
  };

  return (
    <div className="bg-parchment-soft/30 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link to="/cart" className="eyebrow flex items-center gap-2"><ChevronLeft size={14} /> Back to bag</Link>
          <div className="font-display text-xl tracking-[0.22em]">ARANYAA</div>
          <div className="flex items-center gap-2 eyebrow text-ink-soft"><Lock size={12} /> Secure</div>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => {
              const idx = STEPS.findIndex((x) => x.id === step);
              const done = i < idx; const current = i === idx;
              return (
                <div key={s.id} className="flex items-center flex-1 last:flex-none">
                  <div className={cn('h-8 w-8 rounded-full grid place-items-center border-2', done ? 'bg-ink border-ink text-cream' : current ? 'border-ink text-ink' : 'border-hairline text-ink-soft')}>
                    {done ? <Check size={14} /> : <span className="text-xs">{i + 1}</span>}
                  </div>
                  <span className={cn('ml-2 eyebrow text-[10px] whitespace-nowrap', current ? 'text-ink' : 'text-ink-soft')}>{s.label}</span>
                  {i < STEPS.length - 1 && <div className={cn('h-px flex-1 mx-3', done ? 'bg-ink' : 'bg-hairline')} />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="bg-cream p-6 lg:p-10 border border-hairline">
              {step === 'contact' && (
                <>
                  <h2 className="font-display text-3xl mb-6">Contact</h2>
                  <div className="space-y-4">
                    <Field label="Email" error={errors.email}>
                      <input value={contact.email} onChange={(e) => dispatch(setContact({ email: e.target.value }))} type="email" placeholder="you@somewhere.in" className="w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-2.5" />
                    </Field>
                    <Field label="Phone" error={errors.phone}>
                      <input value={contact.phone} onChange={(e) => dispatch(setContact({ phone: e.target.value }))} type="tel" placeholder="+91 98765 43210" className="w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-2.5" />
                    </Field>
                    <label className="flex items-center gap-3 text-sm text-ink-soft pt-2">
                      <input type="checkbox" checked={contact.marketing} onChange={(e) => dispatch(setContact({ marketing: e.target.checked }))} className="h-4 w-4 accent-ink" />
                      Email me the Aranyaa Letter (once a fortnight)
                    </label>
                  </div>
                </>
              )}

              {step === 'shipping' && (
                <>
                  <h2 className="font-display text-3xl mb-6">Shipping address</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full name" error={errors.name} span2>
                      <input value={shippingAddr.name} onChange={(e) => dispatch(setShipping({ name: e.target.value }))} className="w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-2.5" />
                    </Field>
                    <Field label="Address line 1" error={errors.line1} span2>
                      <input value={shippingAddr.line1} onChange={(e) => dispatch(setShipping({ line1: e.target.value }))} className="w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-2.5" />
                    </Field>
                    <Field label="Apartment, suite (optional)" span2>
                      <input value={shippingAddr.line2 || ''} onChange={(e) => dispatch(setShipping({ line2: e.target.value }))} className="w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-2.5" />
                    </Field>
                    <Field label="City" error={errors.city}>
                      <input value={shippingAddr.city} onChange={(e) => dispatch(setShipping({ city: e.target.value }))} className="w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-2.5" />
                    </Field>
                    <Field label="State">
                      <input value={shippingAddr.state} onChange={(e) => dispatch(setShipping({ state: e.target.value }))} className="w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-2.5" />
                    </Field>
                    <Field label="Pincode" error={errors.postalCode}>
                      <input value={shippingAddr.postalCode} onChange={(e) => dispatch(setShipping({ postalCode: e.target.value }))} className="w-full bg-transparent border-b border-hairline focus:border-ink outline-none py-2.5" />
                    </Field>
                    <Field label="Country">
                      <input value={shippingAddr.country} readOnly className="w-full bg-transparent border-b border-hairline outline-none py-2.5 text-ink-soft" />
                    </Field>
                  </div>
                  <div className="mt-8">
                    <p className="eyebrow text-clay mb-3">Shipping method</p>
                    <div className="space-y-2">
                      {[
                        { id: 'standard', l: 'Standard · 72-hour delivery', price: 'Complimentary' },
                        { id: 'express', l: 'Express · next-day metro', price: '₹ 350' },
                        { id: 'atelier', l: 'Atelier hand-delivery (BLR only)', price: 'Complimentary' },
                      ].map((m) => (
                        <label key={m.id} className={cn('flex items-center justify-between border p-4 cursor-pointer', shippingMethod === m.id ? 'border-ink' : 'border-hairline')}>
                          <div className="flex items-center gap-3">
                            <input type="radio" checked={shippingMethod === m.id} onChange={() => dispatch(setShippingMethod(m.id as never))} className="accent-ink" />
                            <span className="text-sm">{m.l}</span>
                          </div>
                          <span className="text-sm">{m.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 'payment' && (
                <>
                  <h2 className="font-display text-3xl mb-6">Payment</h2>
                  <div className="space-y-2">
                    {[
                      { id: 'card', l: 'Credit / Debit card' },
                      { id: 'upi', l: 'UPI' },
                      { id: 'netbanking', l: 'Netbanking' },
                      { id: 'cod', l: 'Cash on delivery' },
                    ].map((m) => (
                      <label key={m.id} className={cn('flex items-center gap-3 border p-4 cursor-pointer', paymentMethod === m.id ? 'border-ink' : 'border-hairline')}>
                        <input type="radio" checked={paymentMethod === m.id} onChange={() => dispatch(setPaymentMethod(m.id as never))} className="accent-ink" />
                        <span className="text-sm">{m.l}</span>
                      </label>
                    ))}
                  </div>
                  <div className="mt-6 text-xs text-ink-soft flex items-center gap-2"><Lock size={12} /> Payment details are handled by our PCI-DSS processor. Aranyaa never stores your card.</div>
                </>
              )}

              {step === 'review' && (
                <>
                  <h2 className="font-display text-3xl mb-6">Review your order</h2>
                  <div className="space-y-4 text-sm">
                    <div className="border border-hairline p-4">
                      <p className="eyebrow text-clay mb-2">Contact</p>
                      <p>{contact.email}</p>
                      <p>{contact.phone}</p>
                    </div>
                    <div className="border border-hairline p-4">
                      <p className="eyebrow text-clay mb-2">Shipping to</p>
                      <p>{shippingAddr.name}</p>
                      <p>{shippingAddr.line1}{shippingAddr.line2 && `, ${shippingAddr.line2}`}</p>
                      <p>{shippingAddr.city}, {shippingAddr.state} {shippingAddr.postalCode}</p>
                    </div>
                    <div className="border border-hairline p-4">
                      <p className="eyebrow text-clay mb-2">Payment</p>
                      <p className="capitalize">{paymentMethod}</p>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between items-center mt-10 pt-6 border-t border-hairline">
                <button onClick={back} className="eyebrow text-ink-soft underline" disabled={step === 'contact'}>Back</button>
                <button onClick={goNext} className="eyebrow bg-ink text-cream px-8 py-3.5 btn-shimmer">
                  {step === 'review' ? 'Place order' : 'Continue'}
                </button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-10 border border-hairline p-6 lg:p-8 bg-cream">
              <p className="eyebrow text-clay mb-4">Order summary</p>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                {items.map((it) => (
                  <div key={`${it.productId}-${it.color}`} className="flex gap-3">
                    <img src={it.image} alt={it.name} className="h-20 w-14 object-cover" />
                    <div className="flex-1">
                      <p className="font-display text-sm leading-snug">{it.name}</p>
                      <p className="text-xs text-ink-soft mt-0.5">{it.color} · Qty {it.quantity}</p>
                    </div>
                    <p className="text-sm whitespace-nowrap">{formatINR(it.price * it.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 space-y-2 text-sm border-t border-hairline pt-4">
                <div className="flex justify-between"><span className="text-ink-soft">Subtotal</span><span>{formatINR(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-ink-soft">Shipping</span><span>{shipping === 0 ? 'Complimentary' : formatINR(shipping)}</span></div>
                <div className="flex justify-between pt-2 border-t border-hairline">
                  <span className="font-medium">Total</span>
                  <span className="font-display text-xl">{formatINR(total)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, error, span2, children }: { label: string; error?: string; span2?: boolean; children: React.ReactNode }) => (
  <div className={cn(span2 && 'sm:col-span-2')}>
    <label className="eyebrow text-clay text-[10px] block mb-1">{label}</label>
    {children}
    {error && <p className="text-xs text-crimson mt-1">{error}</p>}
  </div>
);

export default Checkout;
