import { Footer } from "./Footer";
import { CTASection } from "./CTASection";
import { OLevelSection } from "./OLevelSection";
import { HeroSection } from "../../Components/HeroSection";
import { FlowchartDemoSection } from "./FlowchartDemoSection";

export default function LandingIndex() {
  return (
    <div className="bg-white">
      <main>
        <HeroSection />
        {/* O-Level section */}
        {/* <OLevelSection /> */}

        <FlowchartDemoSection />

        {/* CTA section */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
