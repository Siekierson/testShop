"use client";

import Image from "next/image";
import { useState } from "react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1200&q=80",
    title: "Wielka wyprzedaż!",
    description: "Zniżki do 50% na wybrane produkty. Sprawdź naszą ofertę!",
  },
  {
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80",
    title: "Nowości w elektronice",
    description: "Najlepsze smartfony i laptopy w super cenach!",
  },
  {
    image: "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=1200&q=80",
    title: "Moda na lato",
    description: "Odkryj nowe kolekcje ubrań i dodatków!",
  },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-8">
      <div className="overflow-hidden rounded-lg shadow-lg h-64 relative">
        <Image
          src={slides[current].image}
          alt={slides[current].title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
          <h2 className="text-2xl font-bold mb-1">{slides[current].title}</h2>
          <p className="text-sm">{slides[current].description}</p>
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
