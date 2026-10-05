import { Plus, Star } from 'lucide-react';
import { MOCK_ADDRESSES } from '../data/mockOrders';
import Breadcrumb from '../components/ui/Breadcrumb';

const AccountAddresses = () => (
  <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-24">
    <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Account', to: '/account' }, { label: 'Addresses' }]} />
    <div className="my-10 flex justify-between items-end flex-wrap gap-4">
      <h1 className="font-display text-5xl">Addresses</h1>
      <button className="eyebrow bg-ink text-cream px-4 py-2.5 flex items-center gap-2"><Plus size={14} /> Add new</button>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {MOCK_ADDRESSES.map((a) => (
        <div key={a.id} className="border border-hairline p-6">
          <div className="flex justify-between items-start mb-3">
            <p className="eyebrow text-clay">{a.label}</p>
            {a.isDefault && <span className="text-[10px] uppercase tracking-wider text-clay flex items-center gap-1"><Star size={10} className="fill-clay" />Default</span>}
          </div>
          <p className="font-display text-lg">{a.name}</p>
          <p className="text-sm text-ink-soft mt-2">{a.line1}{a.line2 && `, ${a.line2}`}<br />{a.city}, {a.state} {a.postalCode}<br />{a.phone}</p>
          <div className="flex gap-3 mt-5 text-xs">
            <button className="underline">Edit</button>
            <button className="underline text-crimson">Remove</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AccountAddresses;
