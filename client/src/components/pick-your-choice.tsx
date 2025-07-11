import flavoursImage from "@assets/flavours_1752240578145.png";
import roastedImage from "@assets/rostedmakhana_1752240578155.png";
import powderImage from "@assets/powder_1752240578156.png";
import rawImage from "@assets/raw_makhana_1752240578156.png";
import image5 from "@assets/image5_1752224930471.png";

const products = [
  {
    id: 1,
    name: "ROASTED MAKHANA",
    image: roastedImage,
    bgColor: "bg-amber-300"
  },
  {
    id: 2,
    name: "FLAVOURED VARIETIES",
    image: flavoursImage,
    bgColor: "bg-red-400"
  },
  {
    id: 3,
    name: "MAKHANA POWDER",
    image: powderImage,
    bgColor: "bg-lime-300"
  },
  {
    id: 4,
    name: "RAW MAKHANA",
    image: rawImage,
    bgColor: "bg-blue-400"
  },
  {
    id: 5,
    name: "PREMIUM SELECTION",
    image: image5,
    bgColor: "bg-green-500"
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