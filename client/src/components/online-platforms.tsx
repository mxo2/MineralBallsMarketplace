export default function OnlinePlatforms() {
  const platforms = [
    {
      name: "Amazon",
      text: "Amazon",
      color: "bg-orange-500",
      url: "#"
    },
    {
      name: "Wellness Forever",
      text: "Wellness Forever",
      color: "bg-green-600",
      url: "#"
    },
    {
      name: "LBB",
      text: "LBB",
      color: "bg-cyan-500",
      url: "#"
    },
    {
      name: "Milk Basket",
      text: "Milk Basket",
      color: "bg-blue-600",
      url: "#"
    },
    {
      name: "Big Basket",
      text: "Big Basket",
      color: "bg-orange-600",
      url: "#"
    },
    {
      name: "Flipkart",
      text: "Flipkart",
      color: "bg-blue-500",
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
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 max-w-6xl mx-auto">
          {platforms.map((platform, index) => (
            <a
              key={index}
              href={platform.url}
              className="group cursor-pointer hover:scale-110 transition-transform duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={`${platform.color} rounded-lg shadow-md hover:shadow-lg p-4 flex items-center justify-center min-w-[120px] min-h-[60px] text-white font-semibold text-sm md:text-base`}>
                {platform.text}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}