import Image from "next/image";

const InfoSection = () => {
  return (
    <>
      <div className="py-20 px-6 mx-auto bg-peach-10 font-sans rounded-tl-4xl rounded-tr-4xl ">
        <div className="w-11/12 m-auto flex flex-col md:flex-row justify-between md:gap-30 gap-14">
          <div className="md:w-2/5 md:text-left text-center">
            <h2 className="md:text-3xl !text-2xl px-4 md:px-0 font-extrabold">
              The first Builder Residency & Pop-up City in Nigeria + South-East
              Nigeria&apos;s First Ethereum Conference
            </h2>
            <div className="text-justify my-3 mb-3">
              <p className="text-gray-700 md:text-base text-xs mt-2 max-md:text-center">
                Kicking Off with a 2-Week Builders Residency/ Pop-up City
              </p>
              <p className="text-gray-700 md:text-15 text-sm mt-4">
                EthEnugu is Nigeria&lsquo;s first Ethereum gathering in the
                heart of the South East. We&lsquo;re bringing Ethereum closer to
                the Southeast.
              </p>
              <p className="text-gray-700 md:text-15 text-sm mt-4">
                EthEnugu &lsquo;25 is a 2-week experience designed to spark
                collaboration, creativity, and community among builders,
                developers, and tech enthusiasts in Enugu and across Southeast
                Nigeria.
              </p>
            </div>
            <h3 className="mt-4 text-sm font-semibold text-green-550">
              It’s made up of five core parts:
            </h3>
            <ul className="mt-2 space-y-2 md:text-base text-sm list-disc list-inside w-full md:w-4/5">
              <li className="bg-amber-50 text-black max-md:text-center py-2 px-4 rounded-full">
                Builder Residency
              </li>
              <li className="bg-amber-50 text-black max-md:text-center py-2 px-4 rounded-full">
                Pop-Up City
              </li>
              <li className="bg-amber-50 text-black max-md:text-center py-2 px-4 rounded-full">
                Conference/Summit &lsquo;25
              </li>
              <li className="bg-green-550/10 text-black max-md:text-center py-2 px-4 rounded-full">
                Ethereum Research Village <strong>(Special initative)</strong>
              </li>
              <li className="bg-green-550/10 text-black max-md:text-center py-2 px-4 rounded-full">
                Ecosystems Day{" "}
                <strong>(For non-ETH or non-EVM related projects)</strong>
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
