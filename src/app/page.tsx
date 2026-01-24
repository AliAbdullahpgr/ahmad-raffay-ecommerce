import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { Hero } from "~/components/sections/Hero";
import { FeaturedCollection } from "~/components/sections/FeaturedCollection";
import { Categories } from "~/components/sections/Categories";
import { About } from "~/components/sections/About";
import { WhyChooseUs } from "~/components/sections/WhyChooseUs";
import { Gallery } from "~/components/sections/Gallery";
import { HowToOrder } from "~/components/sections/HowToOrder";
import { WhatsAppButton } from "~/components/ui/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20">
        <Hero />
        <FeaturedCollection />
        <Categories />
        <About />
        <WhyChooseUs />
        <Gallery limit={8} showFilters={true} />
        <HowToOrder />
      </main>
      <Footer />
      <WhatsAppButton variant="fixed" />
    </>
  );
}
