"use client";

import { useEffect } from "react";
import Link from "next/link";
import { pushDataLayer } from "@/components/dataLayer";
import productsData from "@/products.json";

// Mockowe dane koszyka - w prawdziwej aplikacji byłyby w context/state
const mockCartItems = [
  {
    product: productsData.categories[0].products[0], // Smartfon X100
    quantity: 1,
  },
  {
    product: productsData.categories[1].products[2], // Sneakersy White
    quantity: 2,
  },
];

export default function PurchasePage() {
  const total = mockCartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const orderNumber = `ORD-${Date.now()}`;

  // Event purchase
  useEffect(() => {
    pushDataLayer({
      event: "purchase",
      ecommerce: {
        transaction_id: orderNumber,
        value: total,
        tax: total * 0.23, // 23% VAT
        shipping: 0,
        currency: "PLN",
        items: mockCartItems.map(item => ({
          item_id: item.product.id,
          item_name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
      },
    });
  }, [total, orderNumber]);

  return (
    <main className="max-w-4xl mx-auto px-4">
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl text-green-600">✓</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-green-600">Zamówienie złożone!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Dziękujemy za zakupy. Twoje zamówienie zostało przyjęte do realizacji.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Szczegóły zamówienia</h2>
          <p className="text-lg mb-2">
            <span className="font-semibold">Numer zamówienia:</span> {orderNumber}
          </p>
          <p className="text-lg mb-4">
            <span className="font-semibold">Wartość:</span> {total} zł
          </p>
          
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Zamówione produkty:</h3>
            {mockCartItems.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center py-1">
                <span>{item.product.name} x{item.quantity}</span>
                <span className="font-semibold">{item.product.price * item.quantity} zł</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            Potwierdzenie zostało wysłane na podany adres email.
          </p>
          <p className="text-gray-600">
            Przewidywany czas dostawy: 3-5 dni roboczych
          </p>
        </div>
        
        <div className="mt-8">
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Wróć do sklepu
          </Link>
        </div>
      </div>
    </main>
  );
}
