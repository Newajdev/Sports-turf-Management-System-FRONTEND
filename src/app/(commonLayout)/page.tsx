import HeroSection from "@/components/modules/home/hero";
import PopularTurfs from "@/components/modules/home/popular-turfs";
import FeaturesSection from "@/components/modules/home/features";
import HowItWorks from "@/components/modules/home/how-it-works";
import BlogsSection from "@/components/modules/home/blogs";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <PopularTurfs />
      <FeaturesSection />
      <HowItWorks />
      <BlogsSection />
    </div>
  );
}
