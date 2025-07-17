"use client";

import { useState, useEffect } from "react";
import Cart from "@/components/Cart";
import { pushDataLayer } from "@/components/dataLayer";
import { Product } from "@/components/ProductCard";
import productsData from "@/products.json";

interface CartItem {
  product: Product;
  quantity: number;
}

export default function CartPage() {
  // Mockowe dane koszyka - w prawdziwej aplikacji byłyby w context/state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: productsData.categories[0].products[0], // Smartfon X100
      quantity: 1,
    },
    {
      product: productsData.categories[1].products[2], // Sneakersy White
      quantity: 2,
    },
  ]);

  const handleRemoveItem = (productId: string) => {
    setCartItems(items => items.filter(item => item.product.id !== productId));
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Event view_cart
  useEffect(() => {
    pushDataLayer({
      event: "view_cart",
      ecommerce: {
        currency: "PLN",
        value: total,
        items: cartItems.map(item => ({
          item_id: item.product.id,
          item_name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
      },
    });
  }, [cartItems, total]);

  return (
    <main className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold my-8 text-center">Koszyk</h1>
      <Cart
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </main>
  );
}
