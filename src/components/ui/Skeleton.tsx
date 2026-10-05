import { cn } from '../../utils/format';

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn('bg-parchment-soft animate-pulse', className)} />
);

export const ProductCardSkeleton = () => (
  <div>
    <Skeleton className="ratio-portrait w-full" />
    <Skeleton className="mt-4 h-3 w-16" />
    <Skeleton className="mt-2 h-4 w-40" />
    <Skeleton className="mt-1.5 h-4 w-24" />
  </div>
);
