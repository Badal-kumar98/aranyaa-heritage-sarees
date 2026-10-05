import { Link, useParams } from 'react-router-dom';
import { MOCK_ORDERS } from '../data/mockOrders';
import { Check, RotateCcw, Package, Truck } from 'lucide-react';
import Breadcrumb from '../components/ui/Breadcrumb';
import { formatINR, cn } from '../utils/format';

const STATUS_ICONS: Record<string, any> = { placed: Check, crafting: Package, quality: Check, dispatched: Package, 'in-transit': Truck, delivered: Check };

const AccountOrderDetail = () => {
  const { id = '' } = useParams();
  const order = MOCK_ORDERS.find((o) => o.id === id);
  if (!order) return <div className="text-center py-32"><h1 className="font-display text-3xl">Order not found</h1></div>;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-24">
      <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Account', to: '/account' }, { label: 'Orders', to: '/account/orders' }, { label: order.number }]} />
      <div className="my-10 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="eyebrow text-clay">Order {order.number} · Placed {order.placedAt}</p>
          <h1 className="font-display text-5xl mt-2">Your order</h1>
        </div>
        <div className="flex gap-3">
          <button className="eyebrow border border-ink px-4 py-2.5 flex items-center gap-2"><RotateCcw size={14} /> Request return</button>
          <button className="eyebrow bg-ink text-cream px-4 py-2.5">Download invoice</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          {/* timeline */}
          <div className="border border-hairline p-6 lg:p-8">
            <p className="eyebrow text-clay mb-6">Tracking</p>
            <ol className="relative">
              {order.timeline.map((t, i) => {
                const Icon = STATUS_ICONS[t.status] || Check;
                return (
                  <li key={i} className="relative pl-10 pb-6 last:pb-0">
                    {i < order.timeline.length - 1 && (
                      <span className={cn('absolute left-3 top-6 bottom-0 w-px', t.done ? 'bg-ink' : 'bg-hairline')} />
                    )}
                    <span className={cn('absolute left-0 top-0 h-6 w-6 rounded-full grid place-items-center', t.done ? 'bg-ink text-cream' : 'bg-parchment-soft text-ink-soft border border-hairline')}>
                      <Icon size={12} />
                    </span>
                    <p className={cn('font-display text-lg', !t.done && 'text-ink-soft')}>{t.label}</p>
                    <p className="text-xs text-ink-soft mt-0.5">{t.date}</p>
                    {t.note && <p className="text-sm text-ink-soft mt-1 italic">{t.note}</p>}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* items */}
          <div className="border border-hairline p-6 lg:p-8 mt-6">
            <p className="eyebrow text-clay mb-4">Items</p>
            <div className="divide-y divide-hairline">
              {order.items.map((it) => (
                <div key={it.productId} className="py-4 flex gap-4">
                  <img src={it.image} alt={it.name} className="w-20 h-28 object-cover" />
                  <div className="flex-1">
                    <p className="font-display text-lg">{it.name}</p>
                    <p className="text-sm text-ink-soft mt-1">Color: {it.color} · Qty {it.quantity}</p>
                    <div className="flex gap-4 mt-3 text-sm">
                      <Link to="/product/aranyaa-crimson-kanjivaram" className="underline text-ink-soft">Buy again</Link>
                      <button className="underline text-ink-soft">Return</button>
                      <button className="underline text-ink-soft">Write a review</button>
                    </div>
                  </div>
                  <p className="font-display">{formatINR(it.price * it.quantity)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-4">
          <div className="border border-hairline p-6">
            <p className="eyebrow text-clay mb-3">Shipping to</p>
            <p className="font-display text-lg">{order.shippingAddress.name}</p>
            <p className="text-sm text-ink-soft mt-1">{order.shippingAddress.line1}<br />{order.shippingAddress.line2}<br />{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
          </div>
          <div className="border border-hairline p-6">
            <p className="eyebrow text-clay mb-3">Summary</p>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-ink-soft">Subtotal</span><span>{formatINR(order.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-ink-soft">Shipping</span><span>{order.shipping === 0 ? 'Complimentary' : formatINR(order.shipping)}</span></div>
              <div className="flex justify-between pt-2 mt-2 border-t border-hairline"><span>Total</span><span className="font-display text-lg">{formatINR(order.total)}</span></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AccountOrderDetail;
