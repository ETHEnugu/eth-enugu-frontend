import {
  LetterSlideUp,
  WordSlideUp,
} from "@/components/animation/text-animation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { hero_socials } from "../_data";
import Link from "next/link";

export default function DesktopHero() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-1 mt-32 xl:mt-20 2xl:mt-0">
          <WordSlideUp text="Welcome To" className="text-center" />

          <span>
            <LetterSlideUp text="Eth Enugu" className="text-8xl font-bold" />
            <LetterSlideUp
              text="'25"
              className="text-8xl font-bold text-amber-850"
            />
          </span>

          <span className="flex flex-col items-center justify-center text-center">
            <WordSlideUp text="Nigeria's first Builder Residency & Pop-up City + South-East Nigeria's First Ethereum Conference" />
            <WordSlideUp text="From Enugu to the Ethereum network — a gathering of minds, culture, and innovation." />
          </span>
        </div>

        <div className="relative w-max mx-auto flex items-center">
          <div className="relative w-[460px] h-[460px] xl:w-[500px] xl:h-[500px]">
            <Image
              src="/images/unn-lion-banner.svg"
              width={0}
              height={0}
              alt="UNN Lion Banner"
              title="UNN Lion Banner"
              className="absolute w-full h-full ml-64"
            />
            <Image
              src="/images/desktop-hero-banner.svg"
              width={0}
              height={0}
              alt="Banner"
              title="Banner"
              className="absolute w-full h-full ml-96 mt-36"
            />
            <Image
              src="/images/otigba-eth.svg"
              width={0}
              height={0}
              alt="Otigba ETH"
              title="Otigba ETH"
              className="absolute w-full h-full"
            />
          </div>

          <div className="w-max absolute bottom-64 -left-32 bg-white p-5 gap-4 rounded-2xl flex items-center calendar">
            <span className="w-14 h-14 flex items-center justify-center text-white rounded-full bg-amber-550 border border-black">
              <Icon icon="lucide:calendar" width={36} height={36} />
            </span>
            <h3 className="w-full max-w-32">04-16th Aug. 2025</h3>
          </div>
        </div>
      </div>

      <aside
        role="menubar"
        id="socials"
        className="absolute bottom-52 left-3 flex flex-col items-center justify-center gap-4"
      >
        <span className="flex flex-col items-center justify-center gap-2">
          {hero_socials.map((item, idx) => (
            <Link
              href={item.link}
              key={idx}
              target="_blank"
              className="w-8 h-8 flex items-center justify-center rounded-md bg-white border-2 border-black"
            >
              <Icon icon={item.icon} width={18} height={18} />
            </Link>
          ))}
        </span>
        <h3 className="-rotate-90 mt-14">FOLLOW US</h3>
      </aside>
      <Image
        src="/images/white-accent.svg"
        width={0}
        height={0}
        alt="White Accent"
        className="absolute w-full bottom-0 left-0 z-0"
      />
    </>
  );
}
