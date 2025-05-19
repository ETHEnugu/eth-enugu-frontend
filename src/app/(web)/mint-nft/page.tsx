import Banner2 from "@/components/ui/Banner2";
import ScrollingText from "@/components/ui/Scrolling-text";
import ReusableHeroSection from "@/components/ui/ReusableHeroSection";

export default function Page() {
  return (
    <>
      <ReusableHeroSection
        imageUrl=""
        hasImage={false}
        pageTitle="Mint NFT"
        content="Coming soon ..."
        hasButton={false}
        buttonText={null}
      />
      <ScrollingText />
      <Banner2
        title={
          <>
            Join us in making a difference. <br /> Volunteer with us today!
          </>
        }
        content=""
      />
    </>
  );
}
