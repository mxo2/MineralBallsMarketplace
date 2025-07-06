import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Zap, Heart, Shield } from "lucide-react";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Carousel */}
      <div className="relative h-96 md:h-[500px]">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-light/90">
          <img 
            src="https://pixabay.com/get/g4130ec1b4f32bb753e3e2841c199e8f73e40ae7156b288802db3700e7b6fbe6d4c242fd98ccb3dbf8a84f44655d5f9cd6eaead86be809c88087ea324b9b746c5_1280.jpg"
            alt="Premium makhana snacks display"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-transparent flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h2 className="font-bold text-4xl md:text-6xl mb-4">Premium Mineral Balls</h2>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                Discover the goodness of premium makhana packed with essential minerals and incredible taste
              </p>
              <Link href="/products">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg">
                  Shop Now <ArrowRight className="ml-2 w-5 h-5" />
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
              <span className="font-semibold text-gray-700">Rich in Protein</span>
            </div>
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Zap className="text-gold w-5 h-5" />
              <span className="font-semibold text-gray-700">High in Magnesium</span>
            </div>
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Heart className="text-red-500 w-5 h-5" />
              <span className="font-semibold text-gray-700">Heart Healthy</span>
            </div>
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Shield className="text-secondary w-5 h-5" />
              <span className="font-semibold text-gray-700">Antioxidant Rich</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
