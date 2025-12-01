import { ShoppingBag, Trash2, Minus, Plus } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const Cart = ({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemove,
}: CartProps) => {
  const navigate = useNavigate();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const BaseUrl = import.meta.env.VITE_BASE_URL;

  const normalizeUrl = (baseUrl: any, path: any) => {
    // Remove trailing slashes from baseUrl and leading slashes from path
    const cleanBase = baseUrl.replace(/\/+$/, "");
    const cleanPath = path.replace(/^\/+/, "");
    return `${cleanBase}/${cleanPath}`;
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        className="w-full sm:max-w-lg flex flex-col 
  bg-white z-50 shadow-xl border-l"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Shopping Cart ({items.length}{" "}
            {items.length === 1 ? "item" : "items"})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-muted/30 p-3 rounded-lg"
                >
                  <img
                    src={normalizeUrl(BaseUrl, item?.image)}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => onRemove(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 bg-background rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            onUpdateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4">
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                className="w-full bg-[#4f46e5] text-white"
                size="lg"
                onClick={() => navigate(`/checkout`, { state: items })}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
