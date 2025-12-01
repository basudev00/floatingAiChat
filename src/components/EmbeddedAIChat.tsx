import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { ProductCard } from "./ProductCard";
import { OrderCard } from "./OrderCard";
import { OrderTracker } from "./OrderTracker";
import { ChoiceButtons } from "./ChoiceButtons";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { sendChatMessage } from "../api/chat";
import type { CartItem } from "./Cart";

interface Message {
  id: string;
  role: "user" | "bot";
  timestamp: string;
  content:
    | { type: "text"; html: string }
    | {
        type: "products";
        text_response: string;
        products: APIResponse["products"];
      }
    | { type: "orders"; text_response: string; orders: APIResponse["orders"] }
    | { type: "tracker"; html: string }
    | { type: "help"; html: string }
    | string;
}

interface APIResponse {
  text_response: string;
  products?: {
    pid: string;
    title: string;
    image: string;
    price: number;
    old_price: number;
    in_stock: boolean;
  }[];
  orders?: {
    order_number: string;
    price: string;
    paid_status: boolean;
    items: {
      id: number;
      item: string;
      qty: number;
      price: string;
    }[];
    product_status: string;
  }[];
  intent?: string;
}

interface EmbeddedAIChatProps {
  onAddToCart: (product: CartItem) => void;
}

const EmbeddedAIChat = ({ onAddToCart }: EmbeddedAIChatProps) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("chatMessages");
    if (saved) return JSON.parse(saved);

    return [
      {
        id: "1",
        role: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        content: {
          type: "text",
          html: "Hello! I'm your AI shopping assistant. How can I help you today?",
        },
      },
    ];
  });

  const { mutate } = useMutation({
    mutationFn: sendChatMessage,
    onError: () => {
      toast.error(`Chat API Error`);
      handleBotMessage("⚠️ Sorry, something went wrong. Please try again.");
    },
  });

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: Message = {
      // eslint-disable-next-line react-hooks/purity
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);

    const loadingMsg: Message = {
      id: "loading",
      role: "bot",
      content: "⏳ Thinking...",
      timestamp,
    };

    setMessages((prev) => [...prev, loadingMsg]);

    mutate(content, {
      onSuccess: (data: APIResponse) => {
        setMessages((prev) => prev.filter((msg) => msg.id !== "loading"));
        const botResponse = generateBotResponse(data);
        setMessages((prev) => [...prev, botResponse]);
      },
      onError: () => {
        setMessages((prev) => prev.filter((msg) => msg.id !== "loading"));
        handleBotMessage("⚠️ Sorry, something went wrong. Please try again.");
      },
    });
  };

  const generateBotResponse = (data: APIResponse): Message => {
    const { text_response, products, intent, orders } = data;
    const safeHtml = DOMPurify.sanitize(text_response ?? "");

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    switch (intent) {
      case "list_products":
      case "pet_care_query":
        if (products?.length) {
          return {
            id: Date.now().toString(),
            role: "bot",
            timestamp,
            content: {
              type: "products",
              text_response: safeHtml,
              products,
            },
          };
        }
        break;

      case "order_query":
        if (orders?.length) {
          return {
            id: Date.now().toString(),
            role: "bot",
            timestamp,
            content: {
              type: "orders",
              text_response: safeHtml,
              orders,
            },
          };
        }
        break;

      case "track_order":
        return {
          id: Date.now().toString(),
          role: "bot",
          timestamp,
          content: { type: "tracker", html: safeHtml },
        };

      case "help":
        return {
          id: Date.now().toString(),
          role: "bot",
          timestamp,
          content: { type: "help", html: safeHtml },
        };
    }

    return {
      id: Date.now().toString(),
      role: "bot",
      timestamp,
      content: { type: "text", html: safeHtml },
    };
  };

  const renderMessage = (msg: Message) => {
    if (typeof msg.content === "string") return msg.content;

    switch (msg.content.type) {
      case "text":
        return <div dangerouslySetInnerHTML={{ __html: msg.content.html }} />;

      case "products":
        return (
          <div className="space-y-3">
            <div
              dangerouslySetInnerHTML={{ __html: msg.content.text_response }}
            />

            <div className="grid grid-cols-1 gap-3">
              {msg.content.products?.map((p) => (
                <ProductCard
                  key={p.pid}
                  name={p.title}
                  price={p.price}
                  image={p.image}
                  rating={4}
                  inStock={p.in_stock}
                  onAddToCart={() =>
                    onAddToCart({
                      id: p.pid,
                      name: p.title,
                      price: p.price,
                      quantity: 1,
                      image: p.image,
                    })
                  }
                />
              ))}
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="space-y-3">
            <div
              dangerouslySetInnerHTML={{ __html: msg.content.text_response }}
            />
            <div className="grid grid-cols-1 gap-3">
              {msg.content.orders?.map((o, idx) => (
                <OrderCard
                  key={idx}
                  orderNumber={o.order_number}
                  price={o.price}
                  paidStatus={o.paid_status}
                  items={o.items}
                  status={o.product_status}
                />
              ))}
            </div>
          </div>
        );

      case "tracker":
        return (
          <div className="space-y-3">
            <div dangerouslySetInnerHTML={{ __html: msg.content.html }} />
            <OrderTracker
              orderId="12345"
              status="in-transit"
              estimatedDelivery="Tomorrow, 3–5 PM"
            />
          </div>
        );

      case "help":
        return (
          <div className="space-y-3">
            <div dangerouslySetInnerHTML={{ __html: msg.content.html }} />
            <ChoiceButtons
              choices={[
                { id: "return", label: "Return an item" },
                { id: "track", label: "Track order" },
                { id: "payment", label: "Payment issue" },
                { id: "human", label: "Talk to human" },
              ]}
              onSelect={(id) => handleSendMessage(`I need help with: ${id}`)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const handleBotMessage = (message: string) => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "bot", content: message, timestamp },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-background">
      <main className="flex-1 overflow-y-auto">
        <div className="px-3 py-4 space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} role={msg.role} timestamp={msg.timestamp}>
              {renderMessage(msg)}
            </ChatMessage>
          ))}
        </div>
      </main>

      <footer className="w-full">
        <ChatInput
          onSend={handleSendMessage}
          onVoiceInput={() => toast.info("🎤 Voice input coming soon!")}
          onImageInput={() => toast.info("🖼️ Image search coming soon!")}
        />
      </footer>
    </div>
  );
};

export default EmbeddedAIChat;
