'use client';

import { ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';

export default function CartIcon({ className = 'size-6' }: { className?: string }) {
  const { itemCount } = useCart();

  return (
    <span className="relative inline-flex">
      <ShoppingCart className={className} />
      <Badge className="absolute -right-2.5 -top-2.5 h-5 min-w-5 justify-center rounded-full px-1 text-[10px] leading-none tabular-nums">
        {itemCount > 99 ? '99+' : itemCount}
      </Badge>
      <span className="sr-only">{itemCount} items in cart</span>
    </span>
  );
}
