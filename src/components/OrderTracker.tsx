import { Package, Truck, CheckCircle, MapPin } from "lucide-react";
import { cn } from "../lib/utils";

interface OrderTrackerProps {
  orderId: string;
  status: "processing" | "shipped" | "in-transit" | "delivered";
  estimatedDelivery?: string;
}

const statusSteps = [
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "in-transit", label: "In Transit", icon: MapPin },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

export const OrderTracker = ({
  orderId,
  status,
  estimatedDelivery,
}: OrderTrackerProps) => {
  const currentStepIndex = statusSteps.findIndex((step) => step.key === status);

  return (
    <div className="bg-card rounded-xl p-6 shadow-md border border-border animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-card-foreground">
            Order #{orderId}
          </h3>
          {estimatedDelivery && (
            <p className="text-sm text-muted-foreground mt-1">
              Est. delivery: {estimatedDelivery}
            </p>
          )}
        </div>
        <span className="text-sm px-3 py-1 rounded-full bg-primary-light text-primary font-medium">
          {statusSteps[currentStepIndex]?.label}
        </span>
      </div>

      <div className="relative">
        {/* Progress bar background */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border" />

        {/* Progress bar fill */}
        <div
          className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
          style={{
            width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`,
          }}
        />

        {/* Status steps */}
        <div className="relative flex justify-between">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.key} className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                    isCurrent && "ring-4 ring-primary-light animate-pulse-soft"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={cn(
                    "text-xs text-center max-w-[80px]",
                    isCompleted
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
