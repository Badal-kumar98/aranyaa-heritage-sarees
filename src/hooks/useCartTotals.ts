import { useAppSelector } from '../store';

export const useCartTotals = () => {
  const items = useAppSelector((s) => s.cart.items);
  const discount = useAppSelector((s) => s.cart.couponDiscount);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discountAmount = Math.round(subtotal * discount);
  const shipping = subtotal > 15000 || subtotal === 0 ? 0 : 250;
  const total = subtotal - discountAmount + shipping;
  const count = items.reduce((n, i) => n + i.quantity, 0);
  return { items, subtotal, discountAmount, shipping, total, count };
};
