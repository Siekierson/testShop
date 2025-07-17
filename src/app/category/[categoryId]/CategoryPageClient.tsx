"use client";

import { useEffect } from "react";
import { pushDataLayer } from "@/components/dataLayer";

interface Category {
  id: string;
  name: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    localImage: string;
    description: string;
  }>;
}

interface Props {
  category: Category;
}

export default function CategoryPageClient({ category }: Props) {
  // Event view_item_list
  useEffect(() => {
    pushDataLayer({
      event: "view_item_list",
      ecommerce: {
        items: category.products.map((p) => ({
          item_id: p.id,
          item_name: p.name,
          price: p.price,
          item_category: category.name,
        })),
      },
    });
  }, [category]);

  return null; // Ten komponent tylko obsługuje events
} 