import { Leaf, Zap, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Hero Banner */}
      <div className="relative h-[500px] md:h-[600px]">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Product Image */}
          <div className="relative overflow-hidden">
            <img 
              src="/attached_assets/banner_1752156729758.png"
              alt="Mineral Balls Makhana Products"
              className="w-full h-full object-cover object-left"
            />
          </div>
          
          {/* Right Side - Dark Background with Text */}
          <div className="relative bg-gradient-to-br from-amber-900/90 to-amber-800/95 flex items-center justify-center">
            <div className="text-center px-8 py-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Mithila Makhana
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-amber-100 mb-6">
                Balls of all minerals
              </h2>
              <p className="text-lg text-amber-50 mb-8 max-w-md mx-auto">
                Premium quality makhana packed with essential minerals for your healthy lifestyle
              </p>
              <Link href="/products">
                <Button size="lg" className="bg-white text-amber-900 hover:bg-amber-50 px-8 py-4 text-lg font-semibold">
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mineral Highlight Banner */}
      <div className="bg-light-green py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center space-x-6 md:space-x-12">
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Leaf className="text-secondary w-5 h-5" />
              <span className="font-semibold text-foreground">Rich in Protein</span>
            </div>
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Zap className="text-gold w-5 h-5" />
              <span className="font-semibold text-foreground">High in Magnesium</span>
            </div>
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Heart className="text-red-500 w-5 h-5" />
              <span className="font-semibold text-foreground">Heart Healthy</span>
            </div>
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Shield className="text-secondary w-5 h-5" />
              <span className="font-semibold text-foreground">Antioxidant Rich</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
