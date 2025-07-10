import { Play, Leaf, Zap, Heart, Shield } from "lucide-react";

export default function HeroSection() {
  const videos = [
    {
      id: 1,
      title: "everyday munchy",
      thumbnail: "https://images.unsplash.com/photo-1564054074885-bdd4c3f2e0eb?w=400&h=300&fit=crop",
      description: "Premium makhana bowl with herbs"
    },
    {
      id: 2,
      title: "harvesting makhana",
      thumbnail: "https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=400&h=300&fit=crop",
      description: "Fresh makhana being harvested"
    },
    {
      id: 3,
      title: "quality testing",
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      description: "Quality control and testing"
    },
    {
      id: 4,
      title: "active lifestyle",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      description: "Healthy snacking for active people"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Video Grid Hero */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px] md:h-[500px]">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`relative group cursor-pointer overflow-hidden rounded-lg ${
                index === 0 ? 'md:col-span-1 md:row-span-2' : ''
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img
                src={video.thumbnail}
                alt={video.description}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:bg-white/30 transition-colors">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </div>

              {/* Video Title */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <h3 className="text-white font-semibold text-lg md:text-xl">
                  {video.title}
                </h3>
                <p className="text-white/80 text-sm hidden md:block">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mineral Highlight Banner */}
      <div className="bg-light-green py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center space-x-6 md:space-x-12">
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Leaf className="text-secondary w-5 h-5" />
              <span className="font-semibold text-foreground">Rich in Protein</span>
            </div>
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Zap className="text-gold w-5 h-5" />
              <span className="font-semibold text-foreground">High in Magnesium</span>
            </div>
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Heart className="text-red-500 w-5 h-5" />
              <span className="font-semibold text-foreground">Heart Healthy</span>
            </div>
            <div className="flex items-center space-x-2 mb-2 md:mb-0">
              <Shield className="text-secondary w-5 h-5" />
              <span className="font-semibold text-foreground">Antioxidant Rich</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
