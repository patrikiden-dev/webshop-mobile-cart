'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

const formatPrice = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export default function CartPage() {
  const { items, subtotal, hydrated, setQuantity, removeItem, clearCart } = useCart();

  if (!hydrated) return null;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl p-6 text-center">
        <h1 className="mb-2 text-2xl font-bold">Your cart is empty</h1>
        <Button render={<Link href="/" />} nativeButton={false}>
          Continue shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shopping cart</h1>
        <Button variant="ghost" onClick={clearCart}>
          Clear cart
        </Button>
      </div>

      <ul className="divide-y">
        {items.map((item) => (
          <li key={item.slug} className="flex items-center gap-4 py-4">
            {item.image && <Image src={item.image} alt={item.name} width={80} height={80} className="size-20 rounded-md object-contain" />}

            <div className="flex-1">
              {/* adjust to your product route */}
              <Link href={`/products/${item.slug}`} className="font-medium hover:underline">
                {item.name}
              </Link>
              <p className="text-sm text-muted-foreground">{formatPrice(item.price)}</p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" aria-label="Decrease quantity" onClick={() => setQuantity(item.slug, item.quantity - 1)}>
                <Minus className="size-4" />
              </Button>
              <span className="w-6 text-center tabular-nums">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                aria-label="Increase quantity"
                disabled={item.stock !== undefined && item.quantity >= item.stock}
                onClick={() => setQuantity(item.slug, item.quantity + 1)}
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <p className="w-20 text-right font-medium tabular-nums">{formatPrice(item.price * item.quantity)}</p>

            <Button variant="ghost" size="icon" aria-label={`Remove ${item.name}`} onClick={() => removeItem(item.slug)}>
              <Trash2 className="size-4" />
            </Button>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <span className="text-lg font-semibold">Subtotal</span>
        <span className="text-lg font-semibold tabular-nums">{formatPrice(subtotal)}</span>
      </div>
    </div>
  );
}
