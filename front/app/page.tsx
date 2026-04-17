import HeroSection from "./views/components/HeroSection";
import FeaturesGridSection from "./views/components/FeaturesGridSection";
import RoadmapSection from "./views/components/RoadmapSection";
import CtaSection from "./views/components/CtaSection";
import CliSection from "./views/components/CliSection";

export default function LandingPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-background">
      <HeroSection />
      <FeaturesGridSection />
      <RoadmapSection />
      <CliSection />
      <CtaSection />
    </div>
  );
}
