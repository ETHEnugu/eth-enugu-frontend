import Carousel from "./Carousel";

export default function GallerySection() {
  return (
    <section className=" py-20  flex flex-col text-center gap-5 items-center bg-[#F4F4F4]  ">
      <div className=" p-2 ">
        <h1 className=" text-[var(--color-amber-750)] ">
          We&apos;ll have Guided City Tours
        </h1>
        <h5 className="text-[var(--color-dark)] max-w-[600px] ">
          We&apos;d explore Enugu & South East Nigeria&apos;s beauty & unique
          fusion of Igbo culture with modern tech. From dance and food to
          digital art and blockchain.
        </h5>
      </div>
      <Carousel />
    </section>
  );
}
