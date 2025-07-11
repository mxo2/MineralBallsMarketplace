import { Leaf, Zap, Heart, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Hero Banner */}
      <div className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Background Image - Full Width */}
        <div className="absolute inset-0">
          <img 
            src="/banner_1752157100737.png"
            alt="Mineral Balls Makhana Products - Various Flavored Makhana in Bowls"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              console.log("Banner image failed to load");
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        
        {/* Gradient Overlay for Seamless Blend */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-900/20 to-amber-900/95"></div>
        
        {/* Content Container */}
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Transparent to show image */}
          <div className="relative"></div>
          
          {/* Right Side - Text Content with Backdrop Blur */}
          <div className="relative flex items-center justify-center">
            <div className="backdrop-blur-sm bg-amber-900/40 rounded-2xl p-8 md:p-12 text-center max-w-lg mx-4">
              <div className="mb-8">
                <img 
                  src="/logo_bg_1752204377370.png" 
                  alt="Mineral Balls - Mithila Makhana" 
                  className="h-24 md:h-32 w-auto mx-auto drop-shadow-lg"
                  onError={(e) => {
                    console.log("Banner logo failed to load");
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <p className="text-lg md:text-2xl text-amber-50/95 mb-10 max-w-md mx-auto leading-relaxed drop-shadow-sm font-medium">
                Premium quality makhana naturally packed with essential minerals for your healthy lifestyle
              </p>
              <Link href="/products">
                <Button size="lg" className="bg-white text-amber-900 hover:bg-amber-50 px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl font-bold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Shop Premium Makhana
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
