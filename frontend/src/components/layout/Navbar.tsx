import Link from "next/link";
import { ShoppingCart, User, Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ShopEase
        </Link>

        <div className="flex-1 hidden max-w-md mx-8 md:flex">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="/cart"
            className="relative transition hover:text-blue-600"
          >
            <ShoppingCart size={24} />
            <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-blue-600 rounded-full -top-2 -right-2">
              0
            </span>
          </Link>
          <Link href="/login" className="transition hover:text-blue-600">
            <User size={24} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
