export default function OnlinePlatforms() {
  const platforms = [
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      url: "#"
    },
    {
      name: "Wellness Forever",
      logo: "https://via.placeholder.com/120x60/4CAF50/white?text=Wellness+Forever",
      url: "#"
    },
    {
      name: "LBB",
      logo: "https://via.placeholder.com/80x60/00BCD4/white?text=LBB",
      url: "#"
    },
    {
      name: "Milk Basket",
      logo: "https://via.placeholder.com/120x60/2196F3/white?text=Milk+Basket",
      url: "#"
    },
    {
      name: "Big Basket",
      logo: "https://via.placeholder.com/120x60/FF9800/white?text=Big+Basket",
      url: "#"
    },
    {
      name: "Flipkart",
      logo: "https://via.placeholder.com/120x60/2196F3/white?text=Flipkart",
      url: "#"
    }
  ];

  return (
    <section className="w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 py-3 w-full">
        <h2 className="text-center text-lg md:text-xl font-bold text-white tracking-wide">
          FIND US ON ONLINE PLATFORMS
        </h2>
      </div>
      
      {/* Platforms Grid */}
      <div className="bg-gray-100 py-6 px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-6xl mx-auto">
          {platforms.map((platform, index) => (
            <a
              key={index}
              href={platform.url}
              className="group cursor-pointer hover:scale-110 transition-transform duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg p-4 flex items-center justify-center min-w-[100px] min-h-[60px]">
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="max-w-full max-h-12 object-contain filter group-hover:brightness-110 transition-all duration-300"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}