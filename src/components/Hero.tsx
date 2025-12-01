import React from "react";

const Hero: React.FC = () => {
  const bgImage =
    "https://images.unsplash.com/photo-1596383924513-f98a5a349446?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div
      className="relative bg-gray-50 overflow-hidden"
      data-name="hero"
      data-file="components/Hero.tsx"
    >
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src={bgImage}
          alt="Shop interior with various products displayed"
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
      </div>
      <div className="relative container-custom section-padding flex flex-col items-center text-center sm:py-32">
        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
          <span className="block">Elevate Your Lifestyle</span>
          <span className="block text-indigo-300">With Premium Gear</span>
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl text-gray-200 sm:max-w-3xl">
          Discover our curated collection of high-quality accessories,
          electronics, and fashion designed to enhance your everyday life.
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
          <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
            <a href="#products" className="btn btn-primary w-full">
              Shop Now
            </a>
            <a
              href="#features"
              className="btn btn-outline bg-transparent text-white border-white hover:bg-white hover:text-gray-900 w-full"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
