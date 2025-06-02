import ImageUploadForm from "@/components/ui/ImageUploadForm";
import ReusableHeroSection from "@/components/ui/ReusableHeroSection";
import ScrollingText from "@/components/ui/Scrolling-text";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Page() {
  return (
    <>
      <ReusableHeroSection
        hasImage={true}
        imageUrl={"/generate_DP_background/small_images/small_images.svg"}
        pageTitle="Generate DP"
        content={
          <>
            Over 500 people have already created their DPs, <br /> Create yours
            now.{" "}
          </>
        }
        hasButton={true}
        buttonText={
          <>
            {" "}
            Share link{" "}
            <Icon icon="solar:share-outline" width="24" height="24" />{" "}
          </>
        }
      />

      <section className="bg-[var(--background)] w-full flex items-center justify-center py-[60px] px-5 md:py-20 md:px-16 ">
        <ImageUploadForm />
      </section>

      <ScrollingText />
    </>
  );
}
