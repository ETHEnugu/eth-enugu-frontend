import Image from "next/image";

interface GalleryCardProp {
  img: string;
  deg: string;
  marginTop: string;
}
export default function GalleryCard({ img, deg, marginTop }: GalleryCardProp) {
  return (
    <div
      className={`w-[188.77px] h-[194.32px] md:w-[288px] md:h-[360px] flex flex-col gap-2.5 py-2.5 px-2 relative bg-[var(--background)] mx-1.5 md:mx-6 transform  `}
      style={{
        transform: `rotate(${deg})`,
        marginTop: marginTop,
      }}
    >
      <div className="w-full h-[78%] relative overflow-hidden">
        <Image src={img} alt="gallery image" fill className="object-cover" />
      </div>
    </div>
  );
}
