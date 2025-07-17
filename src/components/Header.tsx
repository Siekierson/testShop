"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-between mb-8">
      <div className="text-2xl font-bold text-black">
        <Link href="/" className="text-black hover:text-gray-700">TestShop</Link>
      </div>
      <nav className="flex gap-6">
        <Link href="/" className="text-black hover:text-gray-700 transition">Strona główna</Link>
        <Link href="/category/electronics" className="text-black hover:text-gray-700 transition">Elektronika</Link>
        <Link href="/category/fashion" className="text-black hover:text-gray-700 transition">Moda</Link>
        <Link href="/category/home" className="text-black hover:text-gray-700 transition">Dom i ogród</Link>
        <Link href="/cart" className="text-black hover:text-gray-700 transition relative">
          Koszyk
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
