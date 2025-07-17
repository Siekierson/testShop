import { notFound } from "next/navigation";
import Image from "next/image";
import productsData from "@/products.json";
import ProductPageClient from "./ProductPageClient";

interface Props {
  params: Promise<{ productId: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { productId } = await params;
  
  // Znajdź produkt w kategoriach
  let product = null;
  let category = null;
  for (const cat of productsData.categories) {
    const found = cat.products.find((p) => p.id === productId);
    if (found) {
      product = found;
      category = cat;
      break;
    }
  }

  if (!product || !category) return notFound();

  // Fallback dla obrazka
  const imageSrc = product.image || product.localImage || "/placeholder.jpg";

  return (
    <main className="max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        <div className="relative h-96 md:h-[500px]">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-contain rounded-lg"
            priority
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6 text-lg">{product.description}</p>
          <div className="text-4xl font-bold text-blue-600 mb-6">{product.price} zł</div>
          <ProductPageClient product={product} category={category} />
        </div>
      </div>
    </main>
  );
}
