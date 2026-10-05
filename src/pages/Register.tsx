import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../store';
import { signIn } from '../store/accountSlice';

const Register = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signIn({ name: name || 'Aranyaa Guest', email: email || 'guest@aranyaa.co' }));
    nav('/account');
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-[80vh]">
      <div className="hidden lg:block relative bg-parchment-soft">
        <img src="/images/saree-10.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute bottom-10 left-10 right-10 text-cream">
          <p className="eyebrow text-gold-soft mb-3">Members receive</p>
          <ul className="font-display text-xl space-y-1.5">
            <li>— Early access to launches</li>
            <li>— Invitations to trunk shows</li>
            <li>— Complimentary styling calls</li>
          </ul>
        </div>
      </div>
      <div className="px-6 lg:px-16 py-16 lg:py-24 flex items-center">
        <div className="max-w-md w-full mx-auto">
          <p className="eyebrow text-clay mb-3">Create account</p>
          <h1 className="font-display text-5xl mb-3">Join Aranyaa.</h1>
          <p className="text-ink-soft mb-8">A wardrobe of saved sarees, faster checkout, and a fortnightly letter.</p>
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="eyebrow text-clay text-[10px]">Full name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full border-b border-hairline focus:border-ink outline-none py-2.5" />
            </div>
            <div>
              <label className="eyebrow text-clay text-[10px]">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full border-b border-hairline focus:border-ink outline-none py-2.5" />
            </div>
            <div>
              <label className="eyebrow text-clay text-[10px]">Password</label>
              <input type="password" required className="w-full border-b border-hairline focus:border-ink outline-none py-2.5" />
            </div>
            <button type="submit" className="eyebrow bg-ink text-cream w-full py-4 btn-shimmer">Create account</button>
            <p className="text-sm text-center">Already have one? <Link to="/login" className="underline">Sign in</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
