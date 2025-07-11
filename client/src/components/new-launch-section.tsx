import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

export default function NewLaunchSection() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const newProducts = products.filter(product => product.isNew).slice(0, 3);

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
              <div className="relative bg-gray-50 h-64 flex items-center justify-center p-4">
                <img 
                  src={product.imageUrl}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-amber-600 text-white">NEW</Badge>
                  <span className="text-amber-600 font-semibold text-sm">{product.weight}</span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <Button 
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={() => window.open('https://wa.me/919829649640?text=Hi%2C%20I%20am%20interested%20in%20' + encodeURIComponent(product.name) + '%20from%20Mineral%20Balls', '_blank')}
                >
                  Order Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
