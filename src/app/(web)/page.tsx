import AboutSection from "@/components/ui/AboutSection";
import Banner from "@/components/ui/Banner";
import Banner2 from "@/components/ui/Banner2";
import GallerySection from "@/components/ui/GallerySection";
import InfoSection from "@/components/ui/InfoSection";
import FaqSection from "@/layout/faq-section";

export default function Home() {
  return (
    <>
      <AboutSection />
      <InfoSection />
      <Banner />
      <GallerySection />
      <Banner2
        title="Mentor/Speak at EthEnugu '25"
        content="Apply to mentor rising talent and make an impact in the Southeast tech ecosystem."
      />
      <FaqSection />
    </>
  );
}
