import { useAppDispatch, useAppSelector } from '../store';
import { setPreference } from '../store/accountSlice';
import Breadcrumb from '../components/ui/Breadcrumb';

const AccountProfile = ({ tab = 'profile' as 'profile' | 'preferences' }) => {
  const user = useAppSelector((s) => s.account.user);
  const prefs = useAppSelector((s) => s.account.preferences);
  const dispatch = useAppDispatch();

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-24">
      <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Account', to: '/account' }, { label: tab === 'preferences' ? 'Preferences' : 'Profile' }]} />
      <div className="my-10"><h1 className="font-display text-5xl capitalize">{tab}</h1></div>

      {tab === 'profile' ? (
        <div className="border border-hairline p-6 lg:p-8 max-w-xl">
          <div className="grid gap-4">
            <div>
              <label className="eyebrow text-clay text-[10px]">Full name</label>
              <input defaultValue={user?.name || ''} className="w-full border-b border-hairline focus:border-ink outline-none py-2.5" />
            </div>
            <div>
              <label className="eyebrow text-clay text-[10px]">Email</label>
              <input defaultValue={user?.email || ''} className="w-full border-b border-hairline focus:border-ink outline-none py-2.5" />
            </div>
            <div>
              <label className="eyebrow text-clay text-[10px]">Phone</label>
              <input defaultValue="+91 98765 43210" className="w-full border-b border-hairline focus:border-ink outline-none py-2.5" />
            </div>
            <div>
              <label className="eyebrow text-clay text-[10px]">Saree blouse size (default)</label>
              <select className="w-full border-b border-hairline focus:border-ink outline-none py-2.5 bg-transparent">
                <option>Custom (please email measurements)</option>
                <option>32</option><option>34</option><option>36</option><option>38</option><option>40</option><option>42</option>
              </select>
            </div>
          </div>
          <button className="eyebrow bg-ink text-cream px-5 py-3 mt-6">Save changes</button>
        </div>
      ) : (
        <div className="border border-hairline p-6 lg:p-8 max-w-xl space-y-5">
          {([
            ['newsletter', 'The Aranyaa Letter', 'A fortnightly note on weavers and launches'],
            ['whatsapp', 'WhatsApp updates', 'Delivery & order updates via WhatsApp'],
            ['launchAlerts', 'Launch alerts', 'Be the first to know when new collections drop'],
          ] as const).map(([key, label, desc]) => (
            <label key={key} className="flex items-start gap-4 cursor-pointer">
              <input type="checkbox" checked={prefs[key]} onChange={(e) => dispatch(setPreference({ key, value: e.target.checked }))} className="h-4 w-4 accent-ink mt-1" />
              <div>
                <p className="font-display text-lg">{label}</p>
                <p className="text-sm text-ink-soft">{desc}</p>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountProfile;
