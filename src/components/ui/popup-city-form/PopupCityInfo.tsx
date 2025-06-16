import { Button } from "@/components/common/button";
import { Icon } from "@iconify/react";
import Image from "next/image";

interface PopupCityInfoProps {
  onNext: () => void;
}

const PopupCityInfo = ({ onNext }: PopupCityInfoProps) => {
  return (
    <>
      <div className="space-y-7 w-full  ">
        <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-4 border-b-[1px] border-[#D9D9D9] pb-6  ">
          <div className=" md:w-[104px] md:h-[112px] w-[74.3px] h-[80px] ">
            <Image
              src={"/conf-sumit-page-bg/Group 52.svg"}
              width={100}
              height={100}
              alt="Image"
              className="object-cover w-full h-full "
            />
          </div>

          <div className="w-full flex flex-col items-start gap-2 ">
            <h3 className=" leading-[100%] font-semibold text-orange-500 mb-2">
              Who Should Attend <br />
              The Pop-Up City?
            </h3>
            <h6 className="text-gray-600">
              Open for two weeks to anyone who can be in Enugu and walks in to
              the co-working space - with daily workshops, Mentorship sessions,
              networking with residents & locals and a hackathon happening to
              ignite blockchain adoption.
              <br />
              <br />
              We&apos;d also kickstart the{" "}
              <span className=" font-bold ">
                {" "}
                Ethereum Research village{" "}
              </span>{" "}
              workshops during the pop-up city.
            </h6>
          </div>
        </div>

        <div className="mb-6">
          <h5 className=" !font-semibold text-gray-800 mb-2">
            You should join if you are:
          </h5>
          <ul className="list-disc pl-5">
            <li className="font-normal text-sm text-[#000000]">
              A student, young professional or builder who wants a place to work
              and collaborate{" "}
            </li>
            <li className="font-normal text-sm text-[#000000]">
              Someone looking to meet new people, be part of the Web3 ecosystem
              and contribute to Open Source projects
            </li>
            <li className="font-normal text-sm text-[#000000]">
              Curious about Ethereum research, academic papers, node operations,
              protocol engineering, security, infra and deep tech.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h5 className="!font-semibold text-gray-800 mb-2">What You Get</h5>
          <ul className="list-disc ml-5 list-inside text-base text-dark space-y-1">
            <li className="font-normal text-sm text-[#000000]">
              Free daily access to a coworking space (Aug 4th – 16th)
            </li>
            <li className="font-normal text-sm text-[#000000]">
              A chance to meet and collaborate with Builder Residents
            </li>
            <li className="font-normal text-sm text-[#000000]">
              Access to community activities, hangouts, and peer learning
            </li>
            <li className="font-normal text-sm text-[#000000]">
              Access to mentors, Opportunities and the Pop-up city hackathon
            </li>
            <li className="font-normal text-sm text-[#000000]">
              A chance to grow your local network and get noticed
            </li>
          </ul>
        </div>

        <Button
          className="bg-green-550 text-white rounded-full"
          onClick={onNext}
        >
          <span className="flex items-center gap-2">
            Register Here
            <Icon icon="solar:arrow-right-linear" width={16} height={16} />
          </span>
        </Button>
      </div>
    </>
  );
};

export default PopupCityInfo;
