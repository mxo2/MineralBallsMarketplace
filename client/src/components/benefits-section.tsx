import { Heart, Shield, Zap, Brain, Users, Star } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Heart,
      title: "Heart Health",
      description: "Low in saturated fat and sodium, promoting cardiovascular wellness",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: Shield,
      title: "Rich in Antioxidants",
      description: "Contains flavonoids that help fight free radicals and reduce inflammation",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Sustained Energy",
      description: "Complex carbohydrates provide long-lasting energy without sugar spikes",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Brain,
      title: "Brain Function",
      description: "Magnesium and phosphorus support cognitive health and memory",
      color: "from-purple-400 to-indigo-500"
    },
    {
      icon: Users,
      title: "Weight Management",
      description: "High protein and fiber content helps maintain healthy weight",
      color: "from-blue-400 to-cyan-500"
    }
  ];

  const nutritionalFacts = [
    { value: "347", unit: "Calories", description: "Energy per serving", color: "text-orange-600" },
    { value: "9.7g", unit: "Protein", description: "Complete amino acids", color: "text-green-600" },
    { value: "76.9g", unit: "Carbs", description: "Complex carbohydrates", color: "text-blue-600" },
    { value: "0.1g", unit: "Fat", description: "Low fat content", color: "text-purple-600" },
    { value: "14.5g", unit: "Fiber", description: "Digestive health", color: "text-red-600" },
    { value: "210mg", unit: "Magnesium", description: "Bone & muscle health", color: "text-indigo-600" }
  ];

  const minerals = [
    { name: "Calcium", amount: "120mg", benefit: "Strong bones & teeth" },
    { name: "Iron", amount: "3.2mg", benefit: "Oxygen transport" },
    { name: "Phosphorus", amount: "540mg", benefit: "Energy metabolism" },
    { name: "Potassium", amount: "500mg", benefit: "Heart function" }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with makhana image overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url('/raw_makhana_new.png')`,
            backgroundSize: '300px 300px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center'
          }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full text-sm font-bold mb-6 shadow-lg">
            <Star className="w-4 h-4 mr-2" />
            SUPERFOOD NUTRITION
          </div>
          <h2 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 leading-tight">
            Health Benefits & Minerals
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover why makhana is considered a superfood packed with essential nutrients
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Nutritional Facts Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/30">
          <div className="text-center mb-12">
            <h3 className="font-bold text-3xl md:text-4xl text-gray-900 mb-4">
              Nutritional Facts
            </h3>
            <p className="text-lg text-gray-600">Per 100g serving</p>
          </div>

          {/* Main Nutritional Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {nutritionalFacts.map((fact, index) => (
              <div key={index} className="text-center bg-gray-50/80 rounded-xl p-6 hover:bg-white transition-colors duration-300">
                <div className={`text-3xl md:text-4xl font-bold ${fact.color} mb-2`}>
                  {fact.value}
                </div>
                <div className="font-semibold text-gray-800 mb-1">{fact.unit}</div>
                <div className="text-xs text-gray-600">{fact.description}</div>
              </div>
            ))}
          </div>

          {/* Essential Minerals */}
          <div className="border-t border-gray-200 pt-8">
            <h4 className="font-bold text-2xl text-gray-900 mb-8 text-center">Essential Minerals</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {minerals.map((mineral, index) => (
                <div key={index} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 text-center">
                  <div className="font-bold text-2xl text-amber-700 mb-1">{mineral.amount}</div>
                  <div className="font-semibold text-gray-800 mb-2">{mineral.name}</div>
                  <div className="text-sm text-gray-600">{mineral.benefit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
