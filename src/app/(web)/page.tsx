import AboutSection from "@/components/ui/AboutSection";
import Banner from "@/components/ui/Banner";
import Banner2 from "@/components/ui/Banner2";
import GallerySection from "@/components/ui/GallerySection";
import InfoSection from "@/components/ui/InfoSection";
import ScrollingText from "@/components/ui/Scrolling-text";
import FaqSection from "@/components/ui/faq-section";
import HomeHero from "@/components/ui/hero";
import PartnerSponsor from "@/components/ui/partner-sponsor";

export default function Home() {
  return (
    <>
      <HomeHero />
      <AboutSection />
      <InfoSection />
      <Banner />
      <GallerySection />
      <Banner2
        title="Mentor/Speak at EthEnugu ‘25"
        content="Apply to mentor rising talent and make an impact in the Southeast tech ecosystem."
      />
      <PartnerSponsor />
      <FaqSection />
      <ScrollingText />
    </>
  );
}
