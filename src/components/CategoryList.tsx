import Link from "next/link";
import Image from "next/image";
import productsData from "@/products.json";

const categoryImages: Record<string, string> = {
  electronics: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
  fashion: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
  home: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=600&q=80",
};

export default function CategoryList() {
  const categories = productsData.categories;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 my-8">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/category/${cat.id}`}
          className="block border rounded-lg shadow hover:shadow-lg transition bg-white overflow-hidden"
        >
          <div className="relative w-full h-40">
            <Image
              src={categoryImages[cat.id] || "/placeholder.jpg"}
              alt={cat.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 text-center font-semibold text-lg">{cat.name}</div>
        </Link>
      ))}
    </div>
  );
}
