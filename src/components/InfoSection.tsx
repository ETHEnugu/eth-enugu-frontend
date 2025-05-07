import Image from "next/image";

const InfoSection = () => {
  return (
    <>
      <div className="py-20 bg-[#FEF3E6] font-sans rounded-tl-4xl rounded-tr-4xl ">
        <div className="w-11/12 m-auto flex flex-col md:flex-row justify-between md:gap-30 gap-14">
          <div className="md:w-2/5 md:text-left text-center">
            <h2 className="md:text-[32px] text-2xl px-4 md:px-0 font-bold">
              The First Ethereum Conference in South-east Nigeria
            </h2>
            <p className="text-gray-700 md:text-[16px] text-xs mt-2">
              Kicking Off with a 2-Week Builders Residency
            </p>
            <p className="text-gray-700 md:text-[15px] text-sm mt-4">
              EthEnugu is Nigeria&quot;s first Ethereum gathering in the heart
              of the South East. We&quot;re bringing Ethereum closer to the
              Southeast.
            </p>
            <p className="text-gray-700 md:text-[15px] text-sm mt-4">
              EthEnugu &quot;25 is a 2-week experience designed to spark
              collaboration, creativity, and community among builders,
              developers, and tech enthusiasts in Enugu and across Southeast
              Nigeria.
            </p>
            <h3 className="mt-4 text-sm font-semibold text-[#006C00]">
              It’s made up of three core parts:
            </h3>
            <ul className="mt-2 space-y-2 md:text-base text-sm list-disc list-inside md:w-4/5 w-full">
              <li className="bg-[#F0880333] text-black py-2 px-4 rounded-full">
                Builder Residency
              </li>
              <li className="bg-[#F0880333] text-black py-2 px-4 rounded-full">
                Pop-Up City
              </li>
              <li className="bg-[#F0880333] text-black py-2 px-4 rounded-full">
                Conf/Summit &quot;25
              </li>
            </ul>
          </div>
          <div className="">
            <Image
              src="/ijele.svg"
              width={546}
              height={468.45}
              className=" object-cover"
              alt={"The obigbo's igile"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoSection;
