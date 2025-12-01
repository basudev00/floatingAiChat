/* eslint-disable react-hooks/set-state-in-effect */
import AIFloatingChat from "../components/AIFloatingChat";
import { type CartItem } from "../components/Cart";
// import { useEffect, useState } from "react";
// import { Cart, type CartItem } from "../components/Cart";
// import FeatureSection from "../components/FeatureSection";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import Hero from "../components/Hero";
// import Newsletter from "../components/Newsletter";
// import ProductGrid from "../components/ProductGrid";
// import Testimonials from "../components/Testimonials";
// import { toast } from "sonner";
// import { useLocation } from "react-router-dom";

const Home = () => {
  // const location = useLocation();

  // const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: CartItem) => {
    console.log(product);
    // setCartItems((prev) => {
    //   const existing = prev.find((item) => item.id === product.id);

    //   if (existing) {
    //     return prev.map((item) =>
    //       item.id === product.id
    //         ? { ...item, quantity: item.quantity + 1 }
    //         : item
    //     );
    //   }

    //   return [...prev, product];
    // });
  };

  // Merge history items into cart state on mount
  // useEffect(() => {
  //   const itemsHistory = location.state as CartItem[] | undefined;
  //   if (itemsHistory?.length) {
  //     setCartItems((prev) => {
  //       // Optional: deduplicate by id
  //       const merged = [...prev, ...itemsHistory];
  //       const unique = merged.reduce<CartItem[]>((acc, item) => {
  //         if (!acc.find((i) => i.id === item.id)) acc.push(item);
  //         return acc;
  //       }, []);
  //       return unique;
  //     });
  //   }
  // }, [location.state]);

  return (
    <>
      {/* <Header setIsCartOpen={setIsCartOpen} cartItems={cartItems} />
      <main>
        <Hero />
        <FeatureSection />
        <ProductGrid />
        <Testimonials />
        <Newsletter />
      </main>

      <Footer /> */}
      <AIFloatingChat onAddToCart={handleAddToCart} />

      {/* Cart Drawer */}
      {/* <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={(id, quantity) =>
          setCartItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, quantity } : i))
          )
        }
        onRemove={(id) => {
          setCartItems((prev) => prev.filter((i) => i.id !== id));
          toast.success("Item removed from cart");
        }}
      /> */}
    </>
  );
};

export default Home;
