"use client";

import { useEffect } from "react";
import { pushDataLayer } from "@/components/dataLayer";

export default function CheckoutPage() {
  // Event begin_checkout
  useEffect(() => {
    pushDataLayer({
      event: "begin_checkout",
      ecommerce: {
        currency: "PLN",
        value: 2397,
        items: [
          {
            item_id: "el1",
            item_name: "Smartfon X100",
            price: 1999,
            item_category: "Elektronika",
            quantity: 1,
          },
          {
            item_id: "fa1",
            item_name: "Sneakersy White",
            price: 199,
            item_category: "Moda",
            quantity: 2,
          },
        ],
      },
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tu można dodać logikę przetwarzania zamówienia
    window.location.href = "/purchase";
  };

  return (
    <main className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold my-8 text-center">Finalizacja zamówienia</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Dane osobowe</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Imię"
                className="border rounded-lg px-4 py-2"
                required
                name="firstName"
              />
              <input
                type="text"
                placeholder="Nazwisko"
                className="border rounded-lg px-4 py-2"
                required
                name="lastName"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="border rounded-lg px-4 py-2 w-full"
              required
              name="email"
            />
            <input
              type="tel"
              placeholder="Telefon"
              className="border rounded-lg px-4 py-2 w-full"
              required
              name="phone"
            />
            <input
              type="text"
              placeholder="Adres"
              className="border rounded-lg px-4 py-2 w-full"
              required
              name="address"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Miasto"
                className="border rounded-lg px-4 py-2"
                required
                name="city"
              />
              <input
                type="text"
                placeholder="Kod pocztowy"
                className="border rounded-lg px-4 py-2"
                required
                name="zipCode"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Złóż zamówienie
            </button>
          </form>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Podsumowanie zamówienia</h2>
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex justify-between items-center py-2">
              <span>Smartfon X100 x1</span>
              <span className="font-semibold">1999 zł</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span>Sneakersy White x2</span>
              <span className="font-semibold">398 zł</span>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Suma:</span>
                <span className="text-blue-600">2397 zł</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
