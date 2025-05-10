import Image from "next/image";

export default function GalleryCard() {
  return (
    <div className="w-[188.77px] h-[194.32px] md:w-[288px] md:h-[360px] flex flex-col gap-2.5 py-2.5 px-2 relative">
      <div className="w-full h-[78%] relative overflow-hidden">
        <Image
          src="/enugu header image.png"
          alt="gallery image"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
