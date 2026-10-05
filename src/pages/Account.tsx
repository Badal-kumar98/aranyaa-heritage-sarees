import { Link } from 'react-router-dom';
import { Package, MapPin, User, Heart, Bell, LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { signOut, signIn } from '../store/accountSlice';
import { MOCK_ORDERS } from '../data/mockOrders';
import Breadcrumb from '../components/ui/Breadcrumb';

const Account = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.account.user);
  const signedIn = useAppSelector((s) => s.account.signedIn);

  if (!signedIn) {
    return (
      <div className="max-w-md mx-auto py-24 px-6 text-center">
        <p className="eyebrow text-clay mb-3">Account</p>
        <h1 className="font-display text-4xl mb-3">Welcome back.</h1>
        <p className="text-ink-soft mb-8">Sign in to view orders, wishlist and preferences.</p>
        <button onClick={() => dispatch(signIn({ name: 'Ananya Iyer', email: 'ananya@aranyaa.co' }))} className="eyebrow bg-ink text-cream px-6 py-3 mr-2">Try demo account</button>
        <Link to="/login" className="eyebrow border border-ink px-6 py-3">Sign in</Link>
      </div>
    );
  }

  const tiles = [
    { icon: Package, label: 'Orders', desc: `${MOCK_ORDERS.length} placed`, to: '/account/orders' },
    { icon: Heart, label: 'Wishlist', desc: 'Saved sarees', to: '/wishlist' },
    { icon: MapPin, label: 'Addresses', desc: '2 addresses', to: '/account/addresses' },
    { icon: User, label: 'Profile', desc: 'Personal details', to: '/account/profile' },
    { icon: Bell, label: 'Preferences', desc: 'Newsletter, alerts', to: '/account/preferences' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-24">
      <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Account' }]} />
      <div className="my-10 lg:my-16 flex justify-between items-end flex-wrap gap-4">
        <div>
          <p className="eyebrow text-clay mb-2">Namaste</p>
          <h1 className="font-display text-5xl lg:text-6xl">{user?.name}</h1>
          <p className="text-ink-soft mt-2">{user?.email}</p>
        </div>
        <button onClick={() => dispatch(signOut())} className="eyebrow flex items-center gap-2 underline"><LogOut size={12} /> Sign out</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {tiles.map((t) => (
          <Link key={t.label} to={t.to} className="group border border-hairline p-6 lg:p-8 hover:border-ink transition-colors">
            <t.icon size={22} className="text-clay mb-4" />
            <p className="font-display text-xl">{t.label}</p>
            <p className="text-xs text-ink-soft mt-1">{t.desc}</p>
            <p className="eyebrow text-clay mt-6 group-hover:text-ink transition-colors">View →</p>
          </Link>
        ))}
      </div>

      {/* Recent order */}
      <div className="mt-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-3xl">Recent order</h2>
          <Link to="/account/orders" className="eyebrow underline">All orders →</Link>
        </div>
        <Link to={`/account/orders/${MOCK_ORDERS[0].id}`} className="block border border-hairline p-6 hover:border-ink transition-colors">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <p className="eyebrow text-clay">{MOCK_ORDERS[0].number} · {MOCK_ORDERS[0].placedAt}</p>
              <p className="font-display text-xl mt-1">{MOCK_ORDERS[0].items[0].name}</p>
              <p className="text-sm text-ink-soft mt-1">Status: <span className="capitalize text-ink">{MOCK_ORDERS[0].status.replace('-', ' ')}</span></p>
            </div>
            <img src={MOCK_ORDERS[0].items[0].image} alt="" className="h-20 w-16 object-cover" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Account;
