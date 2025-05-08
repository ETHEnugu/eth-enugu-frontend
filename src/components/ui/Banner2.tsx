import Image from "next/image";

interface ItemProps {
  title: string;
  content: string;
}

const Banner2 = ({ title, content }: ItemProps) => {
  return (
    <>
      <section className="bg-black text-white px-5 md:px-20 font-sans py-16 md:py-20 text-center relative overflow-hidden">
        <div className="flex justify-between">
          <div className="relative w-32 h-32 md:top-12 top-1 left-1 md:left-30">
            <Image
              src="/calender.svg"
              alt="calender"
              width={119}
              height={119}
            />
            <div className="absolute inset-0 top-7 text-orange-500 font-bold text-xs md:text-sm px-3 py-1 rounded shadow rotate-[-15deg]">
              LOCATION <br />
              <span className="text-base">ENUGU</span>
            </div>
          </div>

          <div className="relative w-28 md:w-32 md:h-32 h-28 md:top-55 md:right-40 rotate-[30deg] md:rotate-0">
            <Image
              src="/calender2.svg"
              alt="calender2"
              width={123}
              height={123}
            />
            <div className="absolute inset-0 top-5 text-green-700 font-bold text-xs md:text-sm px-3 py-1 rounded shadow rotate-[-15deg]">
              EVENT DATE <br />
              <span className="text-sm md:text-base">04-16 AUG, 2025</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-6xl font-extrabold w-10/12 m-auto font-sans mb-4">
          {title}
        </h1>

        <p className="text-sm md:text-xl text-white/80  w-11/12 m-auto max-w-xl mx-auto mb-6">
          {content}
        </p>

        <div className="flex justify-center items-center">
          <button className="relative md:w-32 w-28 md:h-32 h-28 cursor-pointer hover:animate-pulse">
            <Image src="/badge1.svg" alt="badge1" width={147} height={147} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-lg font-bold leading-tight text-center">
              APPLY
              <br />
              HERE!
            </div>
          </button>
        </div>
      </section>
    </>
  );
};

export default Banner2;
