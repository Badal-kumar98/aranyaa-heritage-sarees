import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { Saree } from '../../types';
import { formatINR, cn } from '../../utils/format';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggle as toggleWish } from '../../store/wishlistSlice';
import { motion } from 'framer-motion';

interface Props { saree: Saree; index?: number; }

const ProductCard = ({ saree, index = 0 }: Props) => {
  const dispatch = useAppDispatch();
  const wished = useAppSelector((s) => s.wishlist.ids.includes(saree.id));

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to={`/product/${saree.slug}`} className="block">
        <div className="relative overflow-hidden bg-parchment-soft ratio-portrait">
          <img
            src={saree.images[0]}
            alt={saree.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          {saree.images[1] && (
            <img
              src={saree.images[1]}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}

          {/* badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {saree.badges.includes('new') && (
              <span className="eyebrow bg-ink text-cream px-2 py-1">New</span>
            )}
            {saree.badges.includes('bestseller') && (
              <span className="eyebrow bg-cream text-ink px-2 py-1">Bestseller</span>
            )}
            {saree.badges.includes('limited') && (
              <span className="eyebrow bg-crimson text-cream px-2 py-1">Limited</span>
            )}
            {saree.stock <= 3 && (
              <span className="eyebrow bg-clay text-cream px-2 py-1">Only {saree.stock} left</span>
            )}
          </div>

          {/* wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); dispatch(toggleWish(saree.id)); }}
            aria-label={wished ? 'Remove from wishlist' : 'Save to wishlist'}
            className="absolute top-3 right-3 h-9 w-9 grid place-items-center bg-cream/90 backdrop-blur hover:bg-cream text-ink transition-colors"
          >
            <Heart size={16} className={cn(wished && 'fill-crimson text-crimson')} />
          </button>

          {/* quick add row */}
          <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out hidden lg:block">
            <div className="bg-cream/95 backdrop-blur-md text-ink text-center py-3 eyebrow border-t border-hairline">
              View product
            </div>
          </div>
        </div>
      </Link>

      <div className="pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="eyebrow text-clay">{saree.categoryLabel}</p>
          <div className="flex gap-1">
            {saree.colors.slice(0, 4).map((c) => (
              <span
                key={c.hex}
                className="inline-block h-2.5 w-2.5 rounded-full border border-hairline"
                style={{ background: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
        <h3 className="font-display text-[17px] leading-snug text-ink mt-1">
          <Link to={`/product/${saree.slug}`}>{saree.shortName}</Link>
        </h3>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[15px] text-ink">{formatINR(saree.price)}</span>
          {saree.compareAtPrice && (
            <span className="text-xs text-ink-soft/60 line-through">{formatINR(saree.compareAtPrice)}</span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
