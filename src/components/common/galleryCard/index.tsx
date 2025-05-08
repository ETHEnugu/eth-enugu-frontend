import Image from "next/image";

export default function GalleryCard() {
  return (
    <div className=" w-[288px] h-[360px] flex items-start flex-col gap-[10px] py-[10px] px-[8px]  bg-red-400 ">
      <div className=" w-full h-[78%] overflow-hidden ">
        <Image
          src={"/enugu header image.png"}
          alt="gallery image"
          height={100}
          width={100}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
