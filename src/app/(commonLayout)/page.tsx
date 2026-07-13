import HeroSection from "@/components/modules/home/hero";
import PopularTurfs from "@/components/modules/home/popular-turfs";
import FeaturesSection from "@/components/modules/home/features";
import HowItWorks from "@/components/modules/home/how-it-works";
import BlogsSection from "@/components/modules/home/blogs";
import TestimonialsSection from "@/components/modules/home/testimonials";
import FAQSection from "@/components/modules/home/faq";
import NewsletterSection from "@/components/modules/home/newsletter";
import ContactPageComponent from "@/components/modules/home/contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <PopularTurfs />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <FAQSection />
      <BlogsSection />
      <ContactPageComponent/>
    </div>
  );
}
