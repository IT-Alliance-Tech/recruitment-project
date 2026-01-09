import HeroSection from "../components/Homepage/HeroSection";
import FeaturesSection from "../components/Homepage/FeaturesSection";
import WhyChooseUsSection from "../components/Homepage/WhyChooseUsSection";
import HowItWorksSection from "../components/Homepage/HowItWorksSection";
import TestimonialsSection from "@/components/Homepage/TestimonialsSection";
import CTASection from "@/components/Homepage/CTASection";
import Header from "@/components/Homepage/Header";
import Footer from "@/components/Homepage/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </>
  );
}
