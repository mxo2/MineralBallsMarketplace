import makhanaMineralsImage from "@assets/ChatGPT Image Jul 6, 2025, 06_05_39 PM_1751805363911.png";

export default function SuperfoodBanner() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Side */}
          <div className="space-y-6">
            <h2 className="font-bold text-5xl md:text-6xl text-primary leading-tight">
              Super
              <br />
              <span className="text-accent">Food</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover the natural power of makhana - packed with essential minerals 
              your body needs for optimal health and energy.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-primary font-medium">Rich in Protein & Fiber</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="text-primary font-medium">6 Essential Minerals</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="text-primary font-medium">100% Natural & Organic</span>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="bg-card p-8 rounded-2xl shadow-lg">
              <img 
                src={makhanaMineralsImage}
                alt="Makhana minerals - Protein, Calcium, Iron, Magnesium, Phosphorus, Zinc"
                className="w-full h-auto rounded-xl"
              />
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg transform rotate-3">
                <span className="font-bold text-sm">6 Essential Minerals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}