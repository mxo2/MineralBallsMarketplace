import { useQuery } from "@tanstack/react-query";
import type { Video } from "@shared/schema";

export default function VideoGrid() {
  const { data: videos = [], isLoading } = useQuery<Video[]>({
    queryKey: ['/api/videos'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-amber-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              Watch Our Journey
            </h2>
            <p className="text-lg text-amber-800/80 max-w-2xl mx-auto">
              Discover the story behind our premium makhana through our video gallery
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="aspect-[9/16] bg-amber-100 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-amber-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            Watch Our Journey
          </h2>
          <p className="text-lg text-amber-800/80 max-w-2xl mx-auto">
            Discover the story behind our premium makhana through our video gallery
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {videos.slice(0, 4).map((video) => (
            <div 
              key={video.id} 
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-lg shadow-lg">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  poster={video.thumbnailUrl || undefined}
                  preload="metadata"
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Overlay with video info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{video.title}</h3>
                    {video.description && (
                      <p className="text-xs text-white/90 line-clamp-2">{video.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {videos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-amber-800/60 text-lg">No videos available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}