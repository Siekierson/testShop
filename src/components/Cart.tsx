import Image from "next/image";
import Link from "next/link";
import { Product } from "./ProductCard";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export default function Cart({ items, onRemoveItem, onUpdateQuantity }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">Twój koszyk jest pusty</p>
        <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Kontynuuj zakupy
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.product.id} className="flex items-center border rounded-lg p-4 bg-white">
          <div className="relative w-20 h-20 mr-4">
            <Image
              src={item.product.image || item.product.localImage || "/placeholder.jpg"}
              alt={item.product.name}
              fill
              className="object-contain rounded"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{item.product.name}</h3>
            <p className="text-gray-500 text-sm">{item.product.description}</p>
            <div className="text-lg font-bold">{item.product.price} zł</div>
          </div>
          <div className="flex items-center gap-2 mr-4">
            <button
              onClick={() => onUpdateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
              className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
            >
              -
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
              className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
            >
              +
            </button>
          </div>
          <button
            onClick={() => onRemoveItem(item.product.id)}
            className="text-red-600 hover:text-red-800"
          >
            Usuń
          </button>
        </div>
      ))}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">Suma:</span>
          <span className="text-2xl font-bold text-blue-600">{total} zł</span>
        </div>
        <Link
          href="/checkout"
          className="w-full bg-green-600 text-white py-3 rounded-lg text-center font-semibold hover:bg-green-700 transition block"
        >
          Przejdź do kasy
        </Link>
      </div>
    </div>
  );
}
