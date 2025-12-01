import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  rating?: number;
  inStock?: boolean;
  onAddToCart?: () => void;
  onFavorite?: () => void;
}

export const ProductCard = ({
  name,
  price,
  image,
  rating = 4.5,
  inStock = true,
  onAddToCart,
  onFavorite,
}: ProductCardProps) => {
  const BaseUrl = import.meta.env.VITE_BASE_URL;

  // Helper function to normalize URLs
  const normalizeUrl = (baseUrl: any, path: any) => {
    // Remove trailing slashes from baseUrl and leading slashes from path
    const cleanBase = baseUrl.replace(/\/+$/, "");
    const cleanPath = path.replace(/^\/+/, "");
    return `${cleanBase}/${cleanPath}`;
  };
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-border animate-slide-in">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {image ? (
          <img
            src={normalizeUrl(BaseUrl, image)}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )}

        <button
          onClick={onFavorite}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
        >
          <Heart className="w-4 h-4 text-muted-foreground hover:text-accent transition-colors" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-card-foreground line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <span className="text-accent text-sm">★</span>
              <span className="text-sm text-muted-foreground">{rating}</span>
            </div>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                inStock
                  ? "bg-accent/10 text-accent"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${price}</span>
          <Button
            size="sm"
            onClick={onAddToCart}
            disabled={!inStock}
            className="bg-accent hover:bg-accent-hover text-accent-foreground disabled:opacity-50"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
