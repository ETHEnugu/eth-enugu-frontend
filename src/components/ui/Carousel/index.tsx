import GalleryCard from "@/components/common/galleryCard";
import Marquee from "react-fast-marquee";
import { images } from "./data";

export default function Carousel() {
  return (
    <>
      <Marquee
        speed={100}
        pauseOnHover={true}
        className=" py-2 md:py-6 cursor-pointer"
      >
        {images.map((image, index) => (
          <GalleryCard
            key={index}
            img={image.imagePath}
            deg={image.deg}
            marginTop={image.marginTop}
          />
        ))}
      </Marquee>
    </>
  );
}
