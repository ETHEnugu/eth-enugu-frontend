import Image from "next/image";
import Marquee from "react-fast-marquee";
import { text } from "./data";

export default function ScrollingText() {
  const movingText = text;

  return (
    <Marquee speed={50} className="bg-[var(--background)] py-12  ">
      {movingText.map((text, index) => (
        <span key={index} className="mx-3 flex items-center gap-3  ">
          <h1 className="custom-scroll-heading"> {text} </h1>{" "}
          <Image
            src={"/scrolling-text-img/EthEnuguIcon.svg"}
            alt="icon"
            width={30.7}
            height={48}
            className=" w-3 h-5 md:w-8 md:h-12 "
          />{" "}
        </span>
      ))}
    </Marquee>
  );
}
