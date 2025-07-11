import image1 from "@assets/image1_1752224930466.png";
import image2 from "@assets/image2_1752224930469.png";
import image3 from "@assets/image3_1752224930470.png";
import image4 from "@assets/image4_1752224930470.png";
import image5 from "@assets/image5_1752224930471.png";

const products = [
  {
    id: 1,
    name: "CLASSIC CRUNTED",
    image: image1,
    bgColor: "bg-cyan-300"
  },
  {
    id: 2,
    name: "JAR",
    image: image2,
    bgColor: "bg-red-400"
  },
  {
    id: 3,
    name: "MAKHANA POWDER",
    image: image3,
    bgColor: "bg-lime-300"
  },
  {
    id: 4,
    name: "TRAIL MIX",
    image: image4,
    bgColor: "bg-blue-500"
  },
  {
    id: 5,
    name: "CHOCOLATE",
    image: image5,
    bgColor: "bg-amber-600"
  }
];

export default function PickYourChoice() {
  return (
    <section className="py-8 bg-amber-50/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-amber-400 py-3 mb-0 rounded-t-lg">
          <h2 className="text-center text-xl md:text-2xl font-bold text-amber-900">
            Pick Your Choice
          </h2>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 bg-white rounded-b-lg overflow-hidden shadow-lg">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className={`${product.bgColor} p-6 flex flex-col items-center justify-center min-h-[200px] relative group cursor-pointer hover:scale-105 transition-transform duration-300`}
            >
              {/* Product Image */}
              <div className="flex-1 flex items-center justify-center mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-w-full max-h-32 object-contain drop-shadow-lg"
                />
              </div>
              
              {/* Product Name */}
              <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
                <h3 className="text-xs md:text-sm font-bold text-amber-900 text-center whitespace-nowrap">
                  {product.name}
                </h3>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}