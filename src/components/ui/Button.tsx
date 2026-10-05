import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/format';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
}

const Button = ({ variant = 'primary', size = 'md', loading, className, children, fullWidth, ...rest }: Props) => {
  const sizeCls = size === 'lg' ? 'py-4 px-8' : size === 'sm' ? 'py-2 px-4' : 'py-3 px-6';
  const variantCls =
    variant === 'primary' ? 'bg-ink text-cream hover:bg-ink-soft btn-shimmer' :
    variant === 'secondary' ? 'border border-ink text-ink hover:bg-ink hover:text-cream' :
    'text-ink hover:text-crimson underline underline-offset-4';

  return (
    <button
      className={cn(
        'eyebrow inline-flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        sizeCls, variantCls, fullWidth && 'w-full', className
      )}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading && <span className="h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
