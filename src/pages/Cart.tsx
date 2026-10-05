import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, Tag, Truck } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { removeItem, updateQuantity, applyCoupon } from '../store/cartSlice';
import { useCartTotals } from '../hooks/useCartTotals';
import { formatINR } from '../utils/format';
import { useState } from 'react';
import Breadcrumb from '../components/ui/Breadcrumb';

const Cart = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { items, subtotal, discountAmount, shipping, total, count } = useCartTotals();
  const couponCode = useAppSelector((s) => s.cart.couponCode);
  const [couponInput, setCouponInput] = useState(couponCode || '');

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-32 px-6">
        <div className="h-24 w-24 grid place-items-center bg-parchment-soft mx-auto mb-8">
          <ShoppingBag size={30} className="text-clay" />
        </div>
        <p className="eyebrow text-clay mb-3">Your bag</p>
        <h1 className="font-display text-5xl mb-4">Empty, for now.</h1>
        <p className="text-ink-soft mb-8 max-w-md mx-auto">Every purchase begins with the right first saree. Explore what's just come off the loom.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/new-arrivals" className="eyebrow bg-ink text-cream px-6 py-3">New arrivals</Link>
          <Link to="/best-sellers" className="eyebrow border border-ink px-6 py-3">Best sellers</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-24">
      <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Bag' }]} />
      <div className="mt-8 mb-12 flex items-end justify-between">
        <div>
          <p className="eyebrow text-clay mb-2">Your bag</p>
          <h1 className="font-display text-5xl lg:text-6xl">{count} {count === 1 ? 'saree' : 'sarees'}</h1>
        </div>
        <Link to="/shop" className="eyebrow underline hidden lg:inline">Continue shopping</Link>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <div className="divide-y divide-hairline border-t border-b border-hairline">
            {items.map((it) => (
              <div key={`${it.productId}-${it.color}`} className="py-6 flex gap-4 lg:gap-6">
                <Link to={`/product/${it.slug}`} className="shrink-0">
                  <img src={it.image} alt={it.name} className="w-24 lg:w-32 aspect-[2/3] object-cover" />
                </Link>
                <div className="flex-1 flex flex-col lg:flex-row lg:justify-between gap-4">
                  <div className="flex-1">
                    <p className="eyebrow text-clay">{it.fabric}</p>
                    <Link to={`/product/${it.slug}`}><p className="font-display text-lg lg:text-xl mt-1">{it.name}</p></Link>
                    <p className="text-sm text-ink-soft mt-1.5 flex items-center gap-2">
                      <span className="inline-block h-3 w-3 rounded-full border border-hairline" style={{ background: it.colorHex }} />
                      {it.color}
                    </p>
                    <div className="mt-4 flex items-center gap-6">
                      <div className="flex items-center border border-hairline">
                        <button onClick={() => dispatch(updateQuantity({ productId: it.productId, color: it.color, quantity: it.quantity - 1 }))} className="h-10 w-10 grid place-items-center hover:bg-parchment-soft" aria-label="Decrease"><Minus size={12} /></button>
                        <span className="w-10 text-center text-sm">{it.quantity}</span>
                        <button onClick={() => dispatch(updateQuantity({ productId: it.productId, color: it.color, quantity: it.quantity + 1 }))} className="h-10 w-10 grid place-items-center hover:bg-parchment-soft" aria-label="Increase"><Plus size={12} /></button>
                      </div>
                      <button onClick={() => dispatch(removeItem({ productId: it.productId, color: it.color }))} className="text-sm text-ink-soft hover:text-crimson flex items-center gap-1.5"><Trash2 size={13} /> Remove</button>
                      <button className="text-sm text-ink-soft hover:text-ink underline">Save for later</button>
                    </div>
                  </div>
                  <div className="text-right lg:min-w-[100px]">
                    <p className="font-display text-lg">{formatINR(it.price * it.quantity)}</p>
                    {it.quantity > 1 && <p className="text-xs text-ink-soft">{formatINR(it.price)} each</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* trust row */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2"><Truck size={16} className="text-clay" />Complimentary shipping</div>
            <div className="flex items-center gap-2"><Tag size={16} className="text-clay" />Blouse stitching included</div>
            <div className="flex items-center gap-2 hidden lg:flex">Certified by weaver</div>
            <div className="flex items-center gap-2 hidden lg:flex">7-day easy return</div>
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-32 bg-parchment-soft/50 p-6 lg:p-8">
            <p className="eyebrow text-clay mb-4">Order summary</p>

            {/* coupon */}
            <div className="mb-6">
              <div className="flex gap-2">
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Coupon code"
                  className="flex-1 bg-cream border border-hairline px-3 py-2.5 text-sm outline-none focus:border-ink"
                />
                <button onClick={() => dispatch(applyCoupon(couponInput))} className="eyebrow bg-ink text-cream px-4">Apply</button>
              </div>
              {couponCode && <p className="text-xs text-emerald-deep mt-2">✓ {couponCode} applied</p>}
              {couponInput && !couponCode && couponInput === couponInput && <p className="text-xs text-ink-soft mt-2">Try WELCOME10, FESTIVE15 or HEIRLOOM</p>}
            </div>

            <div className="space-y-2.5 text-sm border-t border-hairline pt-4">
              <div className="flex justify-between"><span className="text-ink-soft">Subtotal</span><span>{formatINR(subtotal)}</span></div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-deep"><span>Discount</span><span>– {formatINR(discountAmount)}</span></div>
              )}
              <div className="flex justify-between"><span className="text-ink-soft">Shipping</span><span>{shipping === 0 ? 'Complimentary' : formatINR(shipping)}</span></div>
              <div className="flex justify-between pt-3 mt-3 border-t border-hairline">
                <span className="font-medium">Total</span>
                <span className="font-display text-2xl">{formatINR(total)}</span>
              </div>
              <p className="text-[11px] text-ink-soft">Inclusive of taxes</p>
            </div>
            <button onClick={() => nav('/checkout')} className="w-full eyebrow bg-ink text-cream py-4 mt-6 btn-shimmer">Proceed to checkout</button>
            <Link to="/shop" className="block text-center text-sm text-ink-soft mt-4 underline lg:hidden">Continue shopping</Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
