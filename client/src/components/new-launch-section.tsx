import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";
import { useCartStore } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function NewLaunchSection() {
  const { incrementCartCount, sessionId } = useCartStore();
  const { toast } = useToast();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const newProducts = products.filter(product => product.isNew).slice(0, 3);

  const addToCart = async (productId: number) => {
    try {
      await apiRequest("POST", "/api/cart", {
        productId,
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

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-light-green to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-accent text-white mb-4">NEW LAUNCH</Badge>
            <h2 className="font-bold text-3xl md:text-4xl text-gray-800 mb-4">
              Latest Flavors & Products
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-light-green to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-accent text-white mb-4">NEW LAUNCH</Badge>
          <h2 className="font-bold text-3xl md:text-4xl text-gray-800 mb-4">
            Latest Flavors & Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Introducing our newest additions to the Mineral Balls family
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all transform hover:scale-105">
              <div className="relative">
                <img 
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-gold text-white">NEW</Badge>
                  <span className="text-accent font-bold">₹{product.price}</span>
                </div>
                <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => addToCart(product.id)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
