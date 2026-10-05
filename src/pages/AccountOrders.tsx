import { Link } from 'react-router-dom';
import { MOCK_ORDERS } from '../data/mockOrders';
import Breadcrumb from '../components/ui/Breadcrumb';
import { formatINR } from '../utils/format';

const AccountOrders = () => (
  <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-24">
    <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Account', to: '/account' }, { label: 'Orders' }]} />
    <div className="my-10"><h1 className="font-display text-5xl">Orders</h1></div>
    <div className="space-y-4">
      {MOCK_ORDERS.map((o) => (
        <Link key={o.id} to={`/account/orders/${o.id}`} className="block border border-hairline hover:border-ink transition-colors">
          <div className="p-6 grid lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-3">
              <p className="eyebrow text-clay">Order</p>
              <p className="font-display text-lg">{o.number}</p>
              <p className="text-xs text-ink-soft mt-1">Placed {o.placedAt}</p>
            </div>
            <div className="lg:col-span-5 flex gap-2 overflow-x-auto">
              {o.items.map((it) => (
                <img key={it.productId} src={it.image} alt={it.name} className="h-16 w-12 object-cover shrink-0" />
              ))}
              <div className="text-sm text-ink-soft self-center ml-2">
                <p>{o.items.length} {o.items.length === 1 ? 'item' : 'items'}</p>
                <p className="text-xs">{o.items[0].name}{o.items.length > 1 ? ` +${o.items.length - 1}` : ''}</p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <span className="eyebrow bg-parchment-soft px-3 py-1.5 capitalize">{o.status.replace('-', ' ')}</span>
            </div>
            <div className="lg:col-span-2 lg:text-right">
              <p className="font-display text-xl">{formatINR(o.total)}</p>
              <p className="eyebrow text-clay underline mt-1">View details →</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default AccountOrders;
