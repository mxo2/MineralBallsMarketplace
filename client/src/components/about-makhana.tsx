import { Leaf, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutMakhana() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-bold text-3xl md:text-4xl text-gray-800 mb-6">
              What is Makhana?
            </h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg">
                Makhana, also known as fox nuts or lotus seeds, are the seeds of the lotus flower (Nelumbo nucifera). 
                These nutritious seeds have been treasured in Asian cuisine for centuries and are now gaining popularity worldwide.
              </p>
              <p>
                Our Mineral Balls brand brings you the finest quality makhana, carefully sourced and processed to retain 
                maximum nutritional value. Each bite delivers a perfect combination of taste and health benefits.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Leaf className="text-secondary w-5 h-5" />
                      <span className="font-semibold text-gray-700">100% Natural</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Award className="text-gold w-5 h-5" />
                      <span className="font-semibold text-gray-700">Premium Quality</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              alt="Lotus pond with makhana plants"
              className="rounded-xl shadow-lg w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">5000+</div>
                <div className="text-sm opacity-90">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
