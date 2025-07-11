import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import VideoGrid from "@/components/video-grid";
import PickYourChoice from "@/components/pick-your-choice";
import SuperfoodBanner from "@/components/superfood-banner";
import VideoSection from "@/components/video-section";
import NewLaunchSection from "@/components/new-launch-section";
import ProductCategories from "@/components/product-categories";
import AboutMakhana from "@/components/about-makhana";
import BenefitsSection from "@/components/benefits-section";
import FeaturedProducts from "@/components/featured-products";
import OnlinePlatforms from "@/components/online-platforms";
import GetInTouch from "@/components/get-in-touch";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <VideoGrid />
        <PickYourChoice />
        <SuperfoodBanner />
        <VideoSection />
        <NewLaunchSection />
        <ProductCategories />
        <AboutMakhana />
        <BenefitsSection />
        <FeaturedProducts />
        <OnlinePlatforms />
        <GetInTouch />
      </main>
      <Footer />
    </div>
  );
}
