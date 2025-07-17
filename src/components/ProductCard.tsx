"use client";

import Image from "next/image";
import Link from "next/link";
import { pushDataLayer } from "./dataLayer";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  localImage?: string;
  description: string;
};

interface Category {
  id: string;
  name: string;
  products: Product[];
}

interface ProductCardProps {
  product: Product;
  category?: Category;
  onAddToCart?: () => void;
}

function getFirstValidImage(sources: (string | undefined)[]) {
  return sources.find((src) => typeof src === "string" && src.length > 0) || "/placeholder.jpg";
}

export default function ProductCard({ product, category, onAddToCart }: ProductCardProps) {
  // Fallback: Unsplash -> lokalny -> placeholder
  const imageSrc = getFirstValidImage([
    product.image,
    product.localImage,
    "/placeholder.jpg",
  ]);

  const handleAddToCart = () => {
    if (category) {
      pushDataLayer({
        event: "add_to_cart",
        ecommerce: {
          currency: "PLN",
          value: product.price,
          items: [
            {
              item_id: product.id,
              item_name: product.name,
              price: product.price,
              item_category: category.name,
              quantity: 1,
            },
          ],
        },
      });
    }
    onAddToCart?.();
  };

  return (
    <div className="border rounded-lg shadow-sm p-4 flex flex-col items-center bg-white hover:shadow-md transition">
      <Link href={`/product/${product.id}`} className="w-full">
        <div className="w-full h-48 relative mb-4">
          <Image
            src={imageSrc}
            alt={product.name || "Produkt"}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain rounded"
          />
        </div>
        <h3 className="font-semibold text-lg mb-2 text-center hover:text-blue-600 transition">{product.name}</h3>
      </Link>
      <p className="text-gray-500 text-sm mb-2 text-center">{product.description}</p>
      <div className="font-bold text-xl mb-2">{product.price} zł</div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition" onClick={handleAddToCart}>Dodaj do koszyka</button>
    </div>
  );
}
