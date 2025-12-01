import { Routes, Route } from "react-router-dom";
import Home from "../page/Home";
import NotFound from "../page/NotFound";
import Checkout from "../components/Checkout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default AppRoutes;
