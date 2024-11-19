import HeroSection from "@/components/HeroSection";
import VideoCarousel from "@/components/VideoCarousel";
import QuickLinks from "@/components/QuickLinks";
import NewsSection from "@/components/NewsSection";
import CalendarSection from "@/components/CalendarSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <VideoCarousel />
          <NewsSection className="mt-8" />
        </div>
        <div className="md:w-1/2">
          <QuickLinks />
          <CalendarSection className="mt-8" />
        </div>
      </div>
    </div>
  );
}
