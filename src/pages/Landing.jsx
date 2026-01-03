import HeroSection from "../components/landing/HeroSection";
import ProblemsSection from "../components/landing/ProblemsSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import StatsSection from "../components/landing/StatsSection";
import TrustSection from "../components/landing/TrustSection";
import CTASection from "../components/landing/CTASection";

export default function Landing() {
  return (
    <div className="space-y-24">
      <HeroSection />
      <ProblemsSection />
      <HowItWorksSection />
      <StatsSection />
      <TrustSection />
      <CTASection />
    </div>
  );
}
