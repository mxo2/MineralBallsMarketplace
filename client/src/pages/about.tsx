import Header from "@/components/header";
import Footer from "@/components/footer";

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Page Header */}
        <section className="py-16 bg-amber-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-bold text-4xl md:text-5xl mb-4">About Mineral Balls</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Premium makhana products for every generation
            </p>
          </div>
        </section>

        {/* Additional Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-bold text-3xl text-gray-800 mb-8">Why Choose Mineral Balls?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Premium Sourcing</h3>
                  <p className="text-gray-600">
                    We source our makhana directly from the finest lotus farms, ensuring quality from seed to snack.
                  </p>
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Advanced Processing</h3>
                  <p className="text-gray-600">
                    Our state-of-the-art processing techniques preserve maximum nutrition while enhancing taste.
                  </p>
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3">Quality Assured</h3>
                  <p className="text-gray-600">
                    Every batch undergoes rigorous quality testing to meet our high standards of excellence.
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
