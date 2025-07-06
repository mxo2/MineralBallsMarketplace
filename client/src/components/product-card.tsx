import { Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import type { Product } from "@shared/schema";
import { useCartStore } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { incrementCartCount, sessionId } = useCartStore();
  const { toast } = useToast();

  const addToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await apiRequest("POST", "/api/cart", {
        productId: product.id,
        quantity: 1,
        sessionId,
      });
      incrementCartCount();
      toast({
        title: "Added to cart",
        description: "Product has been added to your cart successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStars = (rating: string) => {
    const ratingNum = parseFloat(rating);
    const fullStars = Math.floor(ratingNum);
    const hasHalfStar = ratingNum % 1 !== 0;
    
    return (
      <div className="flex text-gold">
        {Array.from({ length: fullStars }, (_, i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-current" />}
        {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }, (_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4" />
        ))}
      </div>
    );
  };

  const getBadgeInfo = () => {
    if (product.isBestseller) return { text: "BESTSELLER", className: "bg-secondary" };
    if (product.isNew) return { text: "NEW", className: "bg-gold" };
    if (product.isOrganic) return { text: "ORGANIC", className: "bg-secondary" };
    if (product.flavor === "chili") return { text: "HOT", className: "bg-red-500" };
    if (product.originalPrice) return { text: "SALE", className: "bg-accent" };
    return null;
  };

  const badgeInfo = getBadgeInfo();

  return (
    <Link href={`/product/${product.id}`}>
      <a>
        <Card className="overflow-hidden hover:shadow-xl transition-all transform hover:scale-105">
          <div className="relative">
            <img 
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              {badgeInfo && (
                <Badge className={`text-xs text-white ${badgeInfo.className}`}>
                  {badgeInfo.text}
                </Badge>
              )}
              {renderStars(product.rating || "0")}
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-accent font-bold text-lg">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through text-sm">₹{product.originalPrice}</span>
                )}
              </div>
              <Button 
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={addToCart}
              >
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
