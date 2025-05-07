
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import LiveDemo from "@/components/LiveDemo";
import TestimonialSection from "@/components/TestimonialSection";
import PricingSection from "@/components/PricingSection";
import CtaSection from "@/components/CtaSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <LiveDemo />
      <FeaturesSection />
      <TestimonialSection />
      <PricingSection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
