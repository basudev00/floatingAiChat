import React from "react";

interface Product {
  id: number;
  name: string;
  href: string;
  price: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
}

const ProductGrid: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Minimalist Wrist Watch",
      href: "#",
      price: "$149",
      category: "Accessories",
      imageSrc:
        "https://images.unsplash.com/photo-1616526629520-109a2e4c813f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      imageAlt: "White minimalist wrist watch.",
    },
    {
      id: 2,
      name: "Premium Wireless Headphones",
      href: "#",
      price: "$299",
      category: "Electronics",
      imageSrc:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      imageAlt: "Black wireless headphones.",
    },
    {
      id: 3,
      name: "Sport Sneakers",
      href: "#",
      price: "$89",
      category: "Fashion",
      imageSrc:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      imageAlt: "Red sport sneakers.",
    },
    {
      id: 4,
      name: "Travel Backpack",
      href: "#",
      price: "$120",
      category: "Accessories",
      imageSrc:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      imageAlt: "Durable travel backpack.",
    },
  ];

  const handleAddToCart = (productId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Added product to cart:", productId);
    // Add your cart logic here
  };

  const handleWishlist = (productId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    console.log("Added product to wishlist:", productId);
    // Add your wishlist logic here
  };

  return (
    <div
      id="products"
      className="bg-gray-50 section-padding"
      data-name="product-grid"
      data-file="components/ProductGrid.tsx"
    >
      <div className="container-custom">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Featured Products
          </h2>
          <a
            href="#"
            className="hidden text-sm font-medium text-[var(--primary-color)] hover:text-indigo-500 md:block"
          >
            Browse the collection <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col"
            >
              <div className="relative w-full h-72 bg-gray-200 overflow-hidden aspect-w-1 aspect-h-1 group-hover:opacity-75">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover"
                />
                <button
                  onClick={(e) => handleWishlist(product.id, e)}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer hover:bg-gray-100"
                  aria-label={`Add ${product.name} to wishlist`}
                >
                  <div className="icon-heart text-gray-600"></div>
                </button>
              </div>
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-900">
                    {product.price}
                  </p>
                  <button
                    onClick={(e) => handleAddToCart(product.id, e)}
                    className="z-10 p-2 rounded-full bg-indigo-50 text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-200"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <div className="icon-plus"></div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <a
            href="#"
            className="font-medium text-[var(--primary-color)] hover:text-indigo-500"
          >
            Browse the collection <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
