import Hero from "../components/sections/Hero";
import AboutIntro from "../components/sections/AboutIntro";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import ServicesOverview from "../components/sections/ServicesOverview";
import Testimonials from "../components/sections/Testimonials";
import CTABanner from "../components/sections/CTABanner";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutIntro />
      <FeaturedProjects />
      <ServicesOverview />
      <Testimonials />
      <CTABanner />
    </main>
  );
}
