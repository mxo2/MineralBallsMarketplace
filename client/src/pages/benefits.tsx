import Header from "@/components/header";
import Footer from "@/components/footer";
import BenefitsSection from "@/components/benefits-section";

export default function Benefits() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Page Header */}
        <section className="py-16 bg-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-bold text-4xl md:text-5xl mb-4">Health Benefits</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Discover the incredible health benefits of makhana and why it's considered a superfood
            </p>
          </div>
        </section>

        <BenefitsSection />

        {/* Additional Health Info */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-bold text-3xl text-gray-800 mb-8 text-center">
                Scientific Research
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="font-semibold text-xl mb-4 text-primary">Antioxidant Properties</h3>
                  <p className="text-gray-600 mb-4">
                    Studies have shown that makhana contains powerful antioxidants including gallic acid, 
                    chlorogenic acid, and epicatechin, which help fight free radicals and reduce oxidative stress.
                  </p>
                  <p className="text-sm text-gray-500">
                    *Research published in Food Chemistry International Journal
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="font-semibold text-xl mb-4 text-secondary">Anti-Aging Benefits</h3>
                  <p className="text-gray-600 mb-4">
                    The high antioxidant content in makhana helps slow down the aging process by protecting 
                    cells from damage and supporting healthy skin and organ function.
                  </p>
                  <p className="text-sm text-gray-500">
                    *Research from Journal of Nutritional Biochemistry
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="font-semibold text-xl mb-4 text-accent">Digestive Health</h3>
                  <p className="text-gray-600 mb-4">
                    The fiber content in makhana promotes healthy digestion, supports gut microbiome, 
                    and helps maintain regular bowel movements.
                  </p>
                  <p className="text-sm text-gray-500">
                    *Digestive Health Research Institute findings
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <h3 className="font-semibold text-xl mb-4 text-gold">Energy & Metabolism</h3>
                  <p className="text-gray-600 mb-4">
                    Rich in complex carbohydrates and protein, makhana provides sustained energy 
                    and supports healthy metabolism throughout the day.
                  </p>
                  <p className="text-sm text-gray-500">
                    *Sports Nutrition Research Council
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
