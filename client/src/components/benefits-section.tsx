import { Heart, Weight, Brain, Shield, Bone, Droplet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Heart,
      title: "Heart Health",
      description: "Rich in magnesium and potassium, supporting cardiovascular health and blood pressure regulation.",
      color: "text-primary"
    },
    {
      icon: Weight,
      title: "Weight Management",
      description: "Low in calories and fat, high in fiber - perfect for healthy weight management.",
      color: "text-secondary"
    },
    {
      icon: Brain,
      title: "Brain Function",
      description: "Contains thiamine and antioxidants that support cognitive function and brain health.",
      color: "text-accent"
    },
    {
      icon: Shield,
      title: "Immunity Boost",
      description: "Packed with antioxidants and zinc to strengthen your immune system naturally.",
      color: "text-gold"
    },
    {
      icon: Bone,
      title: "Bone Health",
      description: "High calcium and phosphorus content supports strong bones and teeth.",
      color: "text-primary"
    },
    {
      icon: Droplet,
      title: "Blood Sugar",
      description: "Low glycemic index helps maintain stable blood sugar levels.",
      color: "text-secondary"
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-foreground mb-4">
            Health Benefits & Minerals
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover why makhana is considered a superfood packed with essential nutrients
          </p>
        </div>

        {/* Nutritional Values */}
        <div className="bg-light-green rounded-xl p-8 mb-12">
          <h3 className="font-bold text-2xl text-center text-gray-800 mb-8">
            Nutritional Facts (Per 100g)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">347</div>
              <div className="text-gray-600 font-semibold">Calories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary mb-2">9.7g</div>
              <div className="text-gray-600 font-semibold">Protein</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">76.9g</div>
              <div className="text-gray-600 font-semibold">Carbs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">0.1g</div>
              <div className="text-gray-600 font-semibold">Fat</div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="bg-gray-50 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${benefit.color.replace('text-', 'bg-')}/10 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`${benefit.color} w-8 h-8`} />
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-800">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
