import { formatINR } from '../../utils/format';

interface Props { price: number; compareAt?: number; size?: 'sm' | 'md' | 'lg'; }

const PriceTag = ({ price, compareAt, size = 'md' }: Props) => {
  const t = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-sm' : 'text-base';
  return (
    <div className="flex items-baseline gap-2">
      <span className={`${t} font-display`}>{formatINR(price)}</span>
      {compareAt && compareAt > price && (
        <>
          <span className="text-sm text-ink-soft/60 line-through">{formatINR(compareAt)}</span>
          <span className="eyebrow text-crimson">{Math.round(((compareAt - price) / compareAt) * 100)}% off</span>
        </>
      )}
    </div>
  );
};

export default PriceTag;
