import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md py-4 px-8 flex items-center justify-between mb-8">
      <div className="text-2xl font-bold">
        <Link href="/">TestShop</Link>
      </div>
      <nav className="flex gap-6">
        <Link href="/">Strona główna</Link>
        <Link href="/category/electronics">Elektronika</Link>
        <Link href="/category/fashion">Moda</Link>
        <Link href="/category/home">Dom i ogród</Link>
        <Link href="/cart">Koszyk</Link>
      </nav>
    </header>
  );
}
