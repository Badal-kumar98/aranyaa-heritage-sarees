import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Props { trail: Array<{ label: string; to?: string }>; }

const Breadcrumb = ({ trail }: Props) => (
  <nav className="flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-ink-soft/70">
    {trail.map((t, i) => (
      <span key={i} className="flex items-center gap-1.5">
        {t.to ? (
          <Link to={t.to} className="hover:text-ink">{t.label}</Link>
        ) : (
          <span className="text-ink">{t.label}</span>
        )}
        {i < trail.length - 1 && <ChevronRight size={12} className="text-hairline" />}
      </span>
    ))}
  </nav>
);

export default Breadcrumb;
