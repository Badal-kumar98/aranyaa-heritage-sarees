import { AnimatePresence, motion } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { closeDrawer, removeItem, updateQuantity } from '../../store/cartSlice';
import { useCartTotals } from '../../hooks/useCartTotals';
import { formatINR } from '../../utils/format';

const CartDrawer = () => {
  const open = useAppSelector((s) => s.cart.drawerOpen);
  const dispatch = useAppDispatch();
  const { items, subtotal, shipping, total, count } = useCartTotals();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => dispatch(closeDrawer())}
            className="fixed inset-0 bg-ink/50 z-50"
          />
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.65, 0.05, 0.36, 1] }}
            className="fixed inset-y-0 right-0 w-full sm:max-w-md bg-cream z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-hairline">
              <div>
                <p className="eyebrow text-clay">Your bag</p>
                <h2 className="font-display text-2xl mt-0.5">{count} {count === 1 ? 'item' : 'items'}</h2>
              </div>
              <button onClick={() => dispatch(closeDrawer())} aria-label="Close bag">
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="h-20 w-20 grid place-items-center bg-parchment-soft mb-6">
                  <ShoppingBag size={26} className="text-clay" />
                </div>
                <p className="font-display text-2xl mb-2">Your bag is quiet.</p>
                <p className="text-sm text-ink-soft mb-6 max-w-xs">Perhaps a Kanjivaram or a chanderi to begin with?</p>
                <Link
                  to="/shop"
                  onClick={() => dispatch(closeDrawer())}
                  className="eyebrow bg-ink text-cream px-6 py-3"
                >
                  Discover Sarees
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-hairline">
                  {items.map((it) => (
                    <div key={`${it.productId}-${it.color}`} className="py-4 flex gap-4">
                      <Link to={`/product/${it.slug}`} onClick={() => dispatch(closeDrawer())} className="shrink-0">
                        <img src={it.image} alt={it.name} className="h-28 w-20 object-cover" />
                      </Link>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between gap-2">
                          <div>
                            <p className="eyebrow text-clay text-[10px]">{it.fabric}</p>
                            <Link to={`/product/${it.slug}`} onClick={() => dispatch(closeDrawer())}>
                              <p className="font-display text-[15px] leading-snug mt-0.5">{it.name}</p>
                            </Link>
                            <p className="text-xs text-ink-soft mt-1 flex items-center gap-1.5">
                              <span className="inline-block h-2.5 w-2.5 rounded-full border border-hairline" style={{ background: it.colorHex }} />
                              {it.color}
                            </p>
                          </div>
                          <p className="text-sm whitespace-nowrap">{formatINR(it.price * it.quantity)}</p>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-hairline">
                            <button
                              className="h-8 w-8 grid place-items-center hover:bg-parchment-soft"
                              onClick={() => dispatch(updateQuantity({ productId: it.productId, color: it.color, quantity: it.quantity - 1 }))}
                              aria-label="Decrease"
                            ><Minus size={12} /></button>
                            <span className="w-8 text-center text-sm">{it.quantity}</span>
                            <button
                              className="h-8 w-8 grid place-items-center hover:bg-parchment-soft"
                              onClick={() => dispatch(updateQuantity({ productId: it.productId, color: it.color, quantity: it.quantity + 1 }))}
                              aria-label="Increase"
                            ><Plus size={12} /></button>
                          </div>
                          <button
                            className="text-xs text-ink-soft underline hover:text-crimson"
                            onClick={() => dispatch(removeItem({ productId: it.productId, color: it.color }))}
                          >Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-hairline px-6 py-5 bg-parchment-soft/40">
                  <div className="space-y-1.5 text-sm mb-4">
                    <div className="flex justify-between"><span className="text-ink-soft">Subtotal</span><span>{formatINR(subtotal)}</span></div>
                    <div className="flex justify-between"><span className="text-ink-soft">Shipping</span><span>{shipping === 0 ? 'Complimentary' : formatINR(shipping)}</span></div>
                    <div className="flex justify-between text-base pt-2 border-t border-hairline mt-2">
                      <span className="font-medium">Total</span>
                      <span className="font-display text-lg">{formatINR(total)}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/cart"
                      onClick={() => dispatch(closeDrawer())}
                      className="text-center eyebrow border border-ink py-3 hover:bg-ink hover:text-cream transition-colors"
                    >View Bag</Link>
                    <Link
                      to="/checkout"
                      onClick={() => dispatch(closeDrawer())}
                      className="text-center eyebrow bg-ink text-cream py-3 btn-shimmer"
                    >Checkout</Link>
                  </div>
                  <p className="text-[11px] text-ink-soft mt-3 text-center">Complimentary blouse stitching · 72-hour ship</p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
