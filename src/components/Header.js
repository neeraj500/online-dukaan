import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import { useContext } from "react";
import { HomeIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

const Header = () => {
  const { cart } = useContext(CartContext);

  return (
    <header className="flex justify-around items-center p-4 bg-indigo-500 text-white">
      {/* logo */}
      <h1 className="text-2xl font-bold">
        <Link href="/">Online Dukaan</Link>
      </h1>
      {/* nav tabs */}
      <nav>
        <ul className="flex items-center space-x-8">
          <li>
            <Link href="/">
              <HomeIcon className="size-6" />
            </Link>
          </li>
          <li className="relative">
            <Link href="/Cart">
              <ShoppingCartIcon className="size-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
