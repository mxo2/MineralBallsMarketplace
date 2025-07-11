export default function SuperfoodBanner() {
  const productImages = [
    {
      url: "/rostedmakhana_1752240935835.png",
      name: "Roasted",
      position: "top-4 left-8",
      size: "w-20 h-20",
      rotation: "rotate-12"
    },
    {
      url: "/raw_makhana_1752240935834.png", 
      name: "Raw",
      position: "top-16 right-12",
      size: "w-16 h-16",
      rotation: "-rotate-6"
    },
    {
      url: "/chocalate_1752242243647.png",
      name: "Chocolate",
      position: "bottom-20 left-4",
      size: "w-18 h-18",
      rotation: "rotate-6"
    },
    {
      url: "/pianpple_1752242265988.png",
      name: "Pineapple", 
      position: "bottom-8 right-8",
      size: "w-20 h-20",
      rotation: "-rotate-12"
    },
    {
      url: "/spicychilly_1752242265988.png",
      name: "Spicy",
      position: "top-32 left-24",
      size: "w-16 h-16", 
      rotation: "rotate-3"
    },
    {
      url: "/powder_1752240935834.png",
      name: "Powder",
      position: "bottom-32 right-20",
      size: "w-22 h-22",
      rotation: "-rotate-8"
    }
  ];

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
          
          {/* Right Side - Floating Product Images */}
          <div className="relative h-[500px] lg:h-[600px]">
            {/* Background decorative circles */}
            <div className="absolute inset-0">
              <div className="absolute top-12 left-12 w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute bottom-12 right-12 w-40 h-40 bg-gradient-to-br from-red-300 to-pink-300 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-amber-300 to-yellow-300 rounded-full opacity-10"></div>
            </div>
            
            {/* Floating Product Images */}
            {productImages.map((product, index) => (
              <div
                key={index}
                className={`absolute ${product.position} ${product.size} ${product.rotation} transform transition-all duration-500 hover:scale-110 hover:z-20 animate-bounce`}
                style={{ 
                  animationDelay: `${index * 0.3}s`,
                  animationDuration: `${2 + index * 0.2}s`
                }}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-white rounded-full shadow-lg opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src={product.url}
                    alt={product.name}
                    className="relative z-10 w-full h-full object-contain p-2 drop-shadow-lg"
                  />
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {product.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}