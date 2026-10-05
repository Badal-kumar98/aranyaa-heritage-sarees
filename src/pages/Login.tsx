import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../store';
import { signIn } from '../store/accountSlice';

const Login = ({ mode = 'login' as 'login' | 'forgot' }) => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [email, setEmail] = useState('ananya@aranyaa.co');
  const [password, setPassword] = useState('demo1234');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'forgot') { setSent(true); return; }
    dispatch(signIn({ name: 'Ananya Iyer', email }));
    nav('/account');
  };

  return (
    <div className="grid lg:grid-cols-2 min-h-[80vh]">
      <div className="hidden lg:block relative bg-parchment-soft">
        <img src="./images/saree-8.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute bottom-10 left-10 right-10 text-cream">
          <p className="eyebrow text-gold-soft mb-3">The Aranyaa Wardrobe</p>
          <p className="font-display text-3xl leading-tight max-w-md">Every saree you love, every order you place, every measurement you keep — in one place.</p>
        </div>
      </div>
      <div className="px-6 lg:px-16 py-16 lg:py-24 flex items-center">
        <div className="max-w-md w-full mx-auto">
          <p className="eyebrow text-clay mb-3">{mode === 'forgot' ? 'Reset password' : 'Sign in'}</p>
          <h1 className="font-display text-5xl mb-3">{mode === 'forgot' ? 'Send a link.' : 'Welcome back.'}</h1>
          <p className="text-ink-soft mb-8">{mode === 'forgot' ? 'We will email a reset link.' : 'Sign in to view orders, wishlist and preferences.'}</p>
          {sent ? (
            <p className="border border-hairline p-6 bg-parchment-soft/40">A reset link is on its way to {email}. Check your inbox in a moment.</p>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="eyebrow text-clay text-[10px]">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="w-full border-b border-hairline focus:border-ink outline-none py-2.5" />
              </div>
              {mode === 'login' && (
                <div>
                  <label className="eyebrow text-clay text-[10px]">Password</label>
                  <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="w-full border-b border-hairline focus:border-ink outline-none py-2.5" />
                </div>
              )}
              <button type="submit" className="eyebrow bg-ink text-cream w-full py-4 btn-shimmer">
                {mode === 'forgot' ? 'Send reset link' : 'Sign in'}
              </button>
              <div className="flex items-center justify-between text-sm">
                {mode === 'login' ? (
                  <>
                    <Link to="/forgot-password" className="text-ink-soft underline">Forgot password?</Link>
                    <Link to="/register" className="underline">Create account</Link>
                  </>
                ) : <Link to="/login" className="underline">Back to sign in</Link>}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
