import { PackageCheck, Clock, XCircle } from "lucide-react";
import { cn } from "../lib/utils";
import { Card, CardContent } from "./ui/card";

interface OrderItem {
  id: number;
  item: string;
  qty: number;
  price: string;
}

interface OrderCardProps {
  orderNumber: string;
  price: string;
  paidStatus: boolean;
  items: OrderItem[];
  status: "processing" | "completed" | "cancelled" | string;
}

export const OrderCard = ({
  orderNumber,
  price,
  paidStatus,
  items,
  status,
}: OrderCardProps) => {
  // Define color/status styles
  const statusStyles = {
    processing: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const statusIcons = {
    processing: <Clock className="w-4 h-4 mr-1" />,
    completed: <PackageCheck className="w-4 h-4 mr-1" />,
    cancelled: <XCircle className="w-4 h-4 mr-1" />,
  };

  return (
    <Card className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border bg-card animate-slide-in">
      <CardContent className="p-4 space-y-3">
        {/* Order number and paid status */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-card-foreground">
            Order #{orderNumber}
          </h3>
          <span
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded-full",
              paidStatus
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            )}
          >
            {paidStatus ? "Paid" : "Unpaid"}
          </span>
        </div>

        {/* Items list */}
        <div className="space-y-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-sm text-muted-foreground"
            >
              <span className="font-medium">{item.item}</span>
              <span className="text-xs">
                x{item.qty} — ${(parseFloat(item.price) * item.qty).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <div className="flex items-center justify-between pt-2 border-t text-sm font-semibold">
          <span className="flex items-center gap-1 text-muted-foreground">
            Total
          </span>
          <span className="text-primary text-lg font-bold">${price}</span>
        </div>

        {/* Status badge */}
        <div
          className={cn(
            "inline-flex items-center text-xs px-2 py-1 rounded-full font-medium mt-2",
            statusStyles[status as keyof typeof statusStyles] ||
              "bg-gray-100 text-gray-700"
          )}
        >
          {statusIcons[status as keyof typeof statusIcons] || (
            <Clock className="w-4 h-4 mr-1" />
          )}
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </CardContent>
    </Card>
  );
};
