import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VideoSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-foreground mb-4">
            See How We Make Our Premium Makhana
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From farm to package, discover our quality process and the story behind Mineral Balls
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=675"
              alt="Makhana production process"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Button 
                size="lg"
                className="bg-white/90 hover:bg-white text-primary rounded-full w-20 h-20 p-0"
              >
                <Play className="w-8 h-8 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
