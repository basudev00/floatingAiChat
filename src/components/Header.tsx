import { useState } from "react";
import type { CartItem } from "./Cart";

const Header = ({
  setIsCartOpen,
  cartItems,
}: {
  setIsCartOpen: (type: boolean) => void;
  cartItems: CartItem[];
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationLinks = [
    { href: "#products", label: "Shop" },
    { href: "#features", label: "Features" },
    { href: "#testimonials", label: "Stories" },
    { href: "#newsletter", label: "Contact" },
  ];

  return (
    <header
      className="bg-white shadow-sm sticky top-0 z-50"
      data-name="header"
      data-file="components/Header.tsx"
    >
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleLogoClick();
              }
            }}
          >
            <div className="w-8 h-8 rounded bg-[var(--primary-color)] flex items-center justify-center mr-2">
              <div className="icon-shopping-bag text-white text-lg"></div>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              ShopEasy
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="text-gray-400 hover:text-gray-500"
              aria-label="Search"
            >
              <span className="sr-only">Search</span>
              <div className="icon-search text-xl"></div>
            </button>
            <button
              className="text-gray-400 hover:text-gray-500 relative"
              aria-label="Cart"
              onClick={() => setIsCartOpen(true)}
            >
              <span className="sr-only">Cart</span>
              <div className="icon-shopping-cart text-xl"></div>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItems?.length}
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              <div
                className={`text-2xl ${
                  isMobileMenuOpen ? "icon-x" : "icon-menu"
                }`}
              ></div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
