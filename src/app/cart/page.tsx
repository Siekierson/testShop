"use client";

import { useEffect } from "react";
import Cart from "@/components/Cart";
import { pushDataLayer } from "@/components/dataLayer";
import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
  const { state, removeItem, updateQuantity } = useCart();

  // Event view_cart
  useEffect(() => {
    pushDataLayer({
      event: "view_cart",
      ecommerce: {
        currency: "PLN",
        value: state.total,
        items: state.items.map(item => ({
          item_id: item.product.id,
          item_name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
      },
    });
  }, [state.items, state.total]);

  return (
    <main className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold my-8 text-center">Koszyk</h1>
      <Cart
        items={state.items}
        onRemoveItem={removeItem}
        onUpdateQuantity={updateQuantity}
      />
    </main>
  );
}
