"use client";

import { useEffect } from "react";
import { pushDataLayer } from "@/components/dataLayer";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  localImage: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  products: Product[];
}

interface Props {
  product: Product;
  category: Category;
}

export default function ProductPageClient({ product, category }: Props) {
  const { addItem } = useCart();
  
  // Event view_item
  useEffect(() => {
    pushDataLayer({
      event: "view_item",
      ecommerce: {
        currency: "PLN",
        value: product.price,
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            price: product.price,
            item_category: category.name,
          },
        ],
      },
    });
  }, [product, category]);

  const handleAddToCart = () => {
    // Dodaj produkt do koszyka
    addItem(product, 1);
    
    // Wyślij event do dataLayer
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
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
    >
      Dodaj do koszyka
    </button>
  );
} 