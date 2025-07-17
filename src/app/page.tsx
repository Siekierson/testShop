import Carousel from "@/components/Carousel";
import CategoryList from "@/components/CategoryList";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4">
      <Carousel />
      <h1 className="text-3xl font-bold text-center my-8">Witamy w TestShop!</h1>
      <CategoryList />
    </main>
  );
}
