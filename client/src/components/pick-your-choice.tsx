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
    <section className="w-full bg-amber-50/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-amber-400 py-4 w-full">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-amber-900">
          Pick Your Choice
        </h2>
      </div>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0 w-full">
        {products.map((product, index) => (
          <div 
            key={product.id}
            className={`${product.bgColor} p-8 flex flex-col items-center justify-center min-h-[300px] relative group cursor-pointer hover:scale-105 transition-transform duration-300`}
          >
            {/* Product Image */}
            <div className="flex-1 flex items-center justify-center mb-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-48 h-48 object-contain drop-shadow-lg"
              />
            </div>
            
            {/* Product Name */}
            <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-md">
              <h3 className="text-sm md:text-base font-bold text-amber-900 text-center whitespace-nowrap">
                {product.name}
              </h3>
            </div>
            
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
          </div>
        ))}
      </div>
    </section>
  );
}