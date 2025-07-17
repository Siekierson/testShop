"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80",
    title: "Smartfon X100 - PROMOCJA!",
    description: "Nowoczesny smartfon z dużym ekranem. Tylko dziś 20% taniej!",
    price: 1999,
    discountedPrice: 1599,
    productId: "el1",
    cta: "Kup teraz"
  },
  {
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&q=80",
    title: "Wielka wyprzedaż!",
    description: "Zniżki do 50% na wybrane produkty. Sprawdź naszą ofertę!",
    cta: "Sprawdź ofertę"
  },
  {
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=1200&q=80",
    title: "Moda na lato",
    description: "Odkryj nowe kolekcje ubrań i dodatków!",
    cta: "Zobacz kolekcję"
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  const currentSlide = slides[current];

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-8">
      <div className="overflow-hidden rounded-lg shadow-lg h-64 relative">
        <Image
          src={currentSlide.image}
          alt={currentSlide.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-6">
          <h2 className="text-2xl font-bold mb-2">{currentSlide.title}</h2>
          <p className="text-sm mb-3">{currentSlide.description}</p>
          {currentSlide.price && currentSlide.discountedPrice && (
            <div className="flex items-center gap-3 mb-3">
              <span className="text-lg line-through text-gray-300">{currentSlide.price} zł</span>
              <span className="text-2xl font-bold text-yellow-400">{currentSlide.discountedPrice} zł</span>
              <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">-20%</span>
            </div>
          )}
          {currentSlide.productId ? (
            <Link 
              href={`/product/${currentSlide.productId}`}
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {currentSlide.cta}
            </Link>
          ) : (
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              {currentSlide.cta}
            </button>
          )}
        </div>
      </div>
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white transition">
        &#8592;
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white transition">
        &#8594;
      </button>
      <div className="flex justify-center gap-2 mt-2">
        {slides.map((_, i) => (
          <span key={i} className={`w-3 h-3 rounded-full inline-block ${i === current ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
        ))}
      </div>
    </div>
  );
}
