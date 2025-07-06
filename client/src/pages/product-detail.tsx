import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";
import { useCartStore } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ProductDetail() {
  const { id } = useParams();
  const { incrementCartCount, sessionId } = useCartStore();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
    enabled: !!id,
  });

  const addToCart = async () => {
    if (!product) return;
    
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
    
    return (
      <div className="flex text-gold">
        {Array.from({ length: fullStars }, (_, i) => (
          <Star key={i} className="w-5 h-5 fill-current" />
        ))}
        {Array.from({ length: 5 - fullStars }, (_, i) => (
          <Star key={`empty-${i}`} className="w-5 h-5" />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="h-96 w-full" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-12 w-1/3" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const nutritionalInfo = product.nutritionalInfo ? JSON.parse(product.nutritionalInfo) : {};
  const minerals = product.minerals ? JSON.parse(product.minerals) : {};

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <img 
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
              {product.isNew && (
                <Badge className="absolute top-4 left-4 bg-gold text-white">NEW</Badge>
              )}
              {product.isBestseller && (
                <Badge className="absolute top-4 right-4 bg-secondary text-white">BESTSELLER</Badge>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-bold text-3xl md:text-4xl text-gray-800 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  {renderStars(product.rating || "0")}
                  <span className="text-gray-600">({product.reviewCount} reviews)</span>
                </div>
                <p className="text-gray-600 text-lg">{product.description}</p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-accent">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">₹{product.originalPrice}</span>
                )}
                <Badge variant="outline">{product.weight}</Badge>
              </div>

              <div className="flex space-x-4">
                <Button 
                  size="lg" 
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                  onClick={addToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 capitalize">{product.category}</p>
                  </CardContent>
                </Card>
                
                {product.flavor && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Flavor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 capitalize">{product.flavor}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Nutritional Information */}
          {Object.keys(nutritionalInfo).length > 0 && (
            <div className="mt-16">
              <h2 className="font-bold text-2xl text-gray-800 mb-8 text-center">
                Nutritional Information (Per 100g)
              </h2>
              <Card className="bg-light-green">
                <CardContent className="p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {Object.entries(nutritionalInfo).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                        <div className="text-gray-600 font-semibold capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Minerals Information */}
          {Object.keys(minerals).length > 0 && (
            <div className="mt-12">
              <h2 className="font-bold text-2xl text-gray-800 mb-8 text-center">
                Essential Minerals
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(minerals).map(([key, value]) => (
                  <Card key={key}>
                    <CardContent className="p-4 text-center">
                      <div className="text-lg font-bold text-secondary mb-1">{value}</div>
                      <div className="text-gray-600 text-sm capitalize">{key}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
