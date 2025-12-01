import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { MessageCircle, X, Sparkles } from "lucide-react";
import EmbeddedAIChat from "./EmbeddedAIChat";
import type { CartItem } from "./Cart";
import LoginForm from "./Login";

interface EmbeddedAIChatProps {
  onAddToCart: (product: CartItem) => void;
}

const AIFloatingChat = ({ onAddToCart }: EmbeddedAIChatProps) => {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // CHECK LOGIN STATUS WHEN CHAT OPENS
  useEffect(() => {
    if (open) {
      const token = Cookies.get("access_token");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(!!token);
    }
  }, [open]);

  // REAL-TIME LOGIN DETECTION (COOKIE POLLING)
  useEffect(() => {
    const interval = setInterval(() => {
      const token = Cookies.get("access_token");

      setIsAuthenticated((prev) => {
        const isNowAuthenticated = !!token;
        return prev !== isNowAuthenticated ? isNowAuthenticated : prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center
        h-14 w-14 rounded-full
        bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500
        shadow-xl hover:scale-105 transition-all duration-300
        ${open ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <Sparkles className="text-white animate-pulse" size={24} />
      </button>

      {/* Chat Box */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[360px] h-[520px]
        rounded-2xl shadow-2xl flex flex-col
        bg-white border border-gray-200 overflow-hidden animate-scaleIn"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3
          bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
          >
            <div className="flex items-center gap-2">
              <MessageCircle size={18} />
              <span className="font-semibold">AI Assistant</span>
            </div>

            <button onClick={() => setOpen(false)}>
              <X size={20} className="hover:opacity-80" />
            </button>
          </div>

          {/* ✅ BODY: LOGIN OR CHAT */}
          <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
            {!isAuthenticated ? (
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-center font-semibold text-lg mb-3">
                  Login to Continue
                </h3>
                <LoginForm />
              </div>
            ) : (
              <EmbeddedAIChat onAddToCart={onAddToCart} />
            )}
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          .animate-scaleIn {
            animation: scaleIn 0.25s ease-out;
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default AIFloatingChat;
