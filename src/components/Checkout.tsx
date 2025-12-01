/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const navigate = useNavigate();
  const location = useLocation();
  const items = location.state;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 2.0;
  const tax = 0.5;
  const total = subtotal + shipping + tax;

  const BaseUrl = import.meta.env.VITE_BASE_URL;
  const normalizeUrl = (baseUrl: any, path: any) => {
    // Remove trailing slashes from baseUrl and leading slashes from path
    const cleanBase = baseUrl.replace(/\/+$/, "");
    const cleanPath = path.replace(/^\/+/, "");
    return `${cleanBase}/${cleanPath}`;
  };

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="flex flex-col lg:flex-row h-full">
        {/* ---------------- ORDER SUMMARY ---------------- */}
        <aside className="bg-gray-100 lg:sticky lg:top-0 lg:h-screen lg:w-[380px] w-full border-b lg:border-b-0">
          <div className="p-6 overflow-y-auto h-full">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              {(items || []).map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 bg-white p-3 rounded-md"
                >
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={normalizeUrl(BaseUrl, item?.image)}
                      alt={item.name}
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {item.name}
                    </h3>
                    <ul className="text-xs text-slate-900 space-y-2 mt-2">
                      <li className="flex justify-between">
                        Quantity <span>{item.quantity}</span>
                      </li>
                      <li className="flex justify-between font-semibold">
                        Price{" "}
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-gray-300 my-6" />

            <ul className="text-slate-600 font-medium space-y-3">
              <li className="flex justify-between text-sm">
                Subtotal{" "}
                <span className="font-semibold text-slate-900">
                  ${subtotal.toFixed(2)}
                </span>
              </li>
              <li className="flex justify-between text-sm">
                Shipping{" "}
                <span className="font-semibold text-slate-900">
                  ${shipping.toFixed(2)}
                </span>
              </li>
              <li className="flex justify-between text-sm">
                Tax{" "}
                <span className="font-semibold text-slate-900">
                  ${tax.toFixed(2)}
                </span>
              </li>
              <hr className="border-slate-300" />
              <li className="flex justify-between text-[15px] font-semibold text-slate-900">
                Total <span>${total.toFixed(2)}</span>
              </li>
            </ul>

            <button
              type="button"
              className="mt-8 rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            >
              Complete Purchase
            </button>
          </div>
        </aside>

        {/* ---------------- CHECKOUT FORM ---------------- */}
        <main className="flex-1 p-6 lg:p-10">
          <form className="max-w-4xl mx-auto">
            {/* Delivery Details */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => navigate(`/`, { state: items })}
                  className="p-2 rounded-full hover:bg-slate-100 transition-colors duration-200"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-700 hover:text-slate-900 transition-colors duration-200" />
                </button>
                <h2 className="text-xl text-slate-900 font-semibold">
                  Delivery Details
                </h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                {[
                  {
                    label: "First Name",
                    type: "text",
                    placeholder: "Enter First Name",
                  },
                  {
                    label: "Last Name",
                    type: "text",
                    placeholder: "Enter Last Name",
                  },
                  { label: "Email", type: "email", placeholder: "Enter Email" },
                  {
                    label: "Phone No.",
                    type: "number",
                    placeholder: "Enter Phone No.",
                  },
                  {
                    label: "Address Line",
                    type: "text",
                    placeholder: "Enter Address Line",
                  },
                  { label: "City", type: "text", placeholder: "Enter City" },
                  { label: "State", type: "text", placeholder: "Enter State" },
                  {
                    label: "Zip Code",
                    type: "text",
                    placeholder: "Enter Zip Code",
                  },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="text-sm text-slate-900 font-medium block mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Payment Section */}
            <section className="mt-12">
              <h2 className="text-xl text-slate-900 font-semibold mb-6">
                Payment
              </h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {/* Card Option */}
                <div
                  className={`bg-gray-100 p-4 rounded-md border ${
                    paymentMethod === "card"
                      ? "border-blue-500"
                      : "border-gray-300"
                  } max-w-sm`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="method"
                      id="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <label
                      htmlFor="card"
                      className="ml-4 flex gap-2 cursor-pointer"
                    >
                      <img
                        src="https://readymadeui.com/images/visa.webp"
                        className="w-12"
                        alt="visa"
                      />
                      <img
                        src="https://readymadeui.com/images/master.webp"
                        className="w-12"
                        alt="master"
                      />
                      <img
                        src="https://readymadeui.com/images/american-express.webp"
                        className="w-12"
                        alt="amex"
                      />
                    </label>
                  </div>
                  <p className="mt-4 text-sm text-slate-500 font-medium">
                    Pay with your debit or credit card
                  </p>
                </div>

                {/* PayPal Option */}
                <div
                  className={`bg-gray-100 p-4 rounded-md border ${
                    paymentMethod === "paypal"
                      ? "border-blue-500"
                      : "border-gray-300"
                  } max-w-sm`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="method"
                      id="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={() => setPaymentMethod("paypal")}
                      className="w-5 h-5 cursor-pointer"
                    />
                    <label
                      htmlFor="paypal"
                      className="ml-4 flex gap-2 cursor-pointer"
                    >
                      <img
                        src="https://readymadeui.com/images/paypal.webp"
                        className="w-20"
                        alt="paypal"
                      />
                    </label>
                  </div>
                  <p className="mt-4 text-sm text-slate-500 font-medium">
                    Pay with your PayPal account
                  </p>
                </div>
              </div>
            </section>

            {/* Promo Code */}
            <section className="mt-12 max-w-md">
              <p className="text-slate-900 text-sm font-medium mb-2">
                Do you have a promo code?
              </p>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600"
                />
                <button
                  type="button"
                  onClick={() =>
                    alert(`Promo code applied: ${promoCode || "None"}`)
                  }
                  className="flex items-center justify-center font-medium tracking-wide bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-md text-sm text-white cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </section>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Checkout;
