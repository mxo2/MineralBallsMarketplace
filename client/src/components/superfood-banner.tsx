export default function SuperfoodBanner() {

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
          {/* Left Side - Text Content */}
          <div className="space-y-8 z-10 relative">
            <div>
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full text-sm font-bold mb-6 shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                ANCIENT SUPERFOOD
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Unlock the
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 block">
                  Makhana Magic
                </span>
              </h2>
            </div>
            
            <p className="text-xl text-gray-700 leading-relaxed max-w-lg font-medium">
              From ancient wisdom to modern wellness - discover nature's crunchy superfood 
              that's packed with protein, minerals, and pure goodness.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md">
                <div className="text-2xl font-bold text-amber-600">9.7g</div>
                <div className="text-sm text-gray-600 font-medium">Protein per 100g</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md">
                <div className="text-2xl font-bold text-orange-600">347</div>
                <div className="text-sm text-gray-600 font-medium">Calories per 100g</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md">
                <div className="text-2xl font-bold text-red-600">0.1g</div>
                <div className="text-sm text-gray-600 font-medium">Fat per 100g</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md">
                <div className="text-2xl font-bold text-green-600">14.5g</div>
                <div className="text-sm text-gray-600 font-medium">Fiber per 100g</div>
              </div>
            </div>
            
            <button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Explore All Flavors
            </button>
          </div>
          
          {/* Right Side - All Products Image */}
          <div className="relative">
            <div className="relative transform hover:scale-105 transition-transform duration-500">
              <img
                src="/allproduct_1752243115959.png"
                alt="Mineral Balls Complete Product Range - Classic Crunch, Choco Bliss, Trail Treat, Pineapple Makhana, Chocolate Coated Makhana, Spicy Chili"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg shadow-lg transform rotate-3">
                <span className="font-bold text-sm">6 Amazing Flavors</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}