import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { dismissToast } from '../../store/uiSlice';

const Toaster = () => {
  const toasts = useAppSelector((s) => s.ui.toasts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timers = toasts.map((t) => setTimeout(() => dispatch(dismissToast(t.id)), 3800));
    return () => timers.forEach(clearTimeout);
  }, [toasts, dispatch]);

  return (
    <div className="fixed top-24 right-4 sm:right-8 z-[70] flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
            className="bg-ink text-cream shadow-2xl px-4 py-3 flex gap-3 items-start min-w-[260px]"
          >
            {t.variant === 'error'
              ? <AlertCircle size={18} className="text-vermillion mt-0.5 shrink-0" />
              : <CheckCircle2 size={18} className="text-gold-soft mt-0.5 shrink-0" />}
            <div className="flex-1">
              <p className="text-sm font-medium">{t.title}</p>
              {t.body && <p className="text-xs text-cream/70 mt-0.5">{t.body}</p>}
            </div>
            <button onClick={() => dispatch(dismissToast(t.id))} aria-label="Dismiss">
              <X size={14} className="text-cream/60" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toaster;
