import { notFound } from "next/navigation";
import productsData from "@/products.json";
import ProductCard from "@/components/ProductCard";
import CategoryPageClient from "./CategoryPageClient";

interface Props {
  params: Promise<{ categoryId: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const { categoryId } = await params;
  const category = productsData.categories.find((c) => c.id === categoryId);
  if (!category) return notFound();

  return (
    <main className="max-w-6xl mx-auto px-4">
      <CategoryPageClient category={category} />
      <h1 className="text-2xl font-bold my-8 text-center">{category.name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {category.products.map((product) => (
          <ProductCard key={product.id} product={product} category={category} />
        ))}
      </div>
    </main>
  );
}
