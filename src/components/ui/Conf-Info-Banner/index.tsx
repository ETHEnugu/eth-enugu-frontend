"use client"
import Image from "next/image";
import { Button } from "../../common/button";
import { ItIsFor, WhatYouGet } from "./data";

interface ConInfoBannerProps {
  handleNext: () => void;
}

export default function ConfInfoBanner({ handleNext }: ConInfoBannerProps) {
  return (
    <div className=" w-full max-w-[680px] bg-[var(--background)] border-[1px] border-[#000000] rounded-2xl flex flex-col items-start justify-center gap-10 p-6 md:p-10 ">
      <div className="flex flex-col items-start gap-7 w-full ">
        <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-4 border-b-[1px] border-[#D9D9D9] pb-6  ">
          <div className=" md:w-[104px] md:h-[112px] w-[74.3px] h-[80px] ">
            <Image
              src={"/conf-sumit-page-bg/Group 52.svg"}
              width={100}
              height={100}
              alt="Image"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="w-full flex flex-col items-start gap-2  ">
            <h3 className="text-[#B18214] leading-[100%] custom-banner-heading ">
              Who Should Attend
              <br /> The Conference/Summit ’25?
            </h3>
            <h6 className=" w-full max-w-[336px] ">
              The ETH Enugu Conference/Summit is a 1-day event for everyone -
              from curious newcomers to seasoned builders.
            </h6>
          </div>
        </div>

        <div className="flex items-start gap-4 flex-col">
          <h5 style={{ fontWeight: 600, color: "#000000" }}>It&apos;s For:</h5>
          <ul className=" list-disc pl-5 ">
            {ItIsFor.map((listItem, index) => (
              <li key={index} className="font-normal text-sm text-[#000000] ">
                {" "}
                {listItem}{" "}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-start gap-4 flex-col">
          <h5 style={{ fontWeight: 600, color: "#000000" }}>What You Get</h5>
          <ul className=" list-disc pl-5 ">
            {WhatYouGet.map((listItem, index) => (
              <li key={index} className="font-normal text-sm text-[#000000] ">
                {" "}
                {listItem}{" "}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button
        onClick={handleNext}
        variant="default"
        design="rounded"
        className="flex items-center gap-3 w-full md:max-w-[153px] "
      >
        {" "}
        Register Here{" "}
      </Button>
    </div>
  );
}
