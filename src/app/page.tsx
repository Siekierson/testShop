"use client";
import Carousel from "@/components/Carousel";
// import { useEffect } from "react";
import productsData from "@/products.json";
import Image from "next/image";
import Link from "next/link";
import { pushDataLayer } from "@/components/dataLayer";
import { useCart } from "@/contexts/CartContext";

type PromoProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  localImage?: string;
  category: { name: string };
};

function getPromoProducts() {
  // Wybierz 3 dowolne produkty (tu: po jednym z każdej kategorii)
  return [
    {
      ...productsData.categories[0].products[0], // Smartfon X100
      category: productsData.categories[0],
      index: 0,
    },
    {
      ...productsData.categories[1].products[2], // Sneakersy White
      category: productsData.categories[1],
      index: 1,
    },
    {
      ...productsData.categories[2].products[1], // Koc Wełniany
      category: productsData.categories[2],
      index: 2,
    },
  ];
}

function PromoSection() {
  const promoProducts = getPromoProducts();
  const { addItem } = useCart();

  const handleSelect = (product: PromoProduct, idx: number) => {
    pushDataLayer({
      event: "select_item",
      ecommerce: {
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            price: product.price,
            item_category: product.category.name,
            index: idx,
            item_list_id: "promocje",
            item_list_name: "Promocje",
          },
        ],
      },
    });
  };

  const handleAddToCart = (product: PromoProduct, idx: number) => {
    // Zapewnij, że image zawsze jest stringiem
    const safeProduct = {
      ...product,
      image: product.image || product.localImage || "",
    };
    addItem(safeProduct, 1);
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
            item_category: product.category.name,
            quantity: 1,
            index: idx,
            item_list_id: "promocje",
            item_list_name: "Promocje",
          },
        ],
      },
    });
  };

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Promocje</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {promoProducts.map((product, idx) => (
          <div
            key={product.id}
            className="border rounded-lg shadow-sm p-4 flex flex-col items-center bg-white hover:shadow-md transition"
          >
            <Link
              href={`/product/${product.id}`}
              className="w-full"
              onClick={() => handleSelect(product, idx)}
            >
              <div className="w-full h-48 relative mb-4">
                <Image
                  src={product.image || product.localImage || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain rounded"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-center hover:text-blue-600 transition">
                {product.name}
              </h3>
            </Link>
            <p className="text-gray-500 text-sm mb-2 text-center">{product.description}</p>
            <div className="font-bold text-xl mb-2">{product.price} zł</div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => handleAddToCart(product, idx)}
            >
              Dodaj do koszyka
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4">
      <Carousel />
      <h1 className="text-3xl font-bold text-center my-8">Witamy w TestShop!</h1>
      <PromoSection />
    </main>
  );
}
