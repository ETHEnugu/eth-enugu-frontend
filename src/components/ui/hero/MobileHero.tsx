"use client";
import {
  LetterSlideUp,
  WordSlideUp,
} from "@/components/animation/text-animation";
import { Button } from "@/components/common/button";
import LinksDisplayModal from "@/layout/navbar/LinksDisplayModal";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MobileHero() {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);

  const handleModalDisplay = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-8">
      <section className="flex flex-col items-center justify-center gap-2 mt-24">
        <WordSlideUp text="Welcome to" className="text-center mt-12" />
        <span>
          <LetterSlideUp
            text="Eth Enugu"
            className="text-center text-5xl font-bold"
          />
          <LetterSlideUp
            text="'25"
            className="text-center text-5xl font-bold text-amber-850"
          />
        </span>
        <span className="w-full px-8 text-center flex flex-col items-center justify-center">
          <WordSlideUp
            text="Nigeria's first Builder Residency & Pop-up City +"
            className="text-center text-sm"
          />
          <WordSlideUp
            text="South-East Nigeria's First Ethereum Conference"
            className="text-center text-sm"
          />
          {/* <WordSlideUp
            text=""
            className="text-center"
          />
          <WordSlideUp
            text=""
            className="text-center"
          />
          <WordSlideUp
            text=""
            className="text-center"
          /> */}
          <WordSlideUp
            text="From Enugu to the Ethereum network — a"
            className="text-center text-sm"
          />
          <WordSlideUp
            text="gathering of minds, culture, and innovation."
            className="text-center text-sm"
          />
        </span>
      </section>

      <section className="w-max flex flex-col gap-4">
        <Button
          type="button"
          variant="plain"
          design="rounded"
          size="sm"
          onClick={handleModalDisplay}
        >
          Register for event
        </Button>
        <Button
          type="button"
          variant="default"
          design="rounded"
          size="sm"
          className="flex items-center gap-3"
          onClick={() => router.push("/speaker-application")}
        >
          Apply to Mentor/Speak
          <Icon icon="solar:arrow-right-linear" width={18} height={18} />
        </Button>
      </section>

      <Image
        src="/images/mobile-hero-image.svg"
        width={350}
        height={350}
        alt="Background image"
        className="mt-auto object-cover"
      />

      <LinksDisplayModal onClose={handleModalDisplay} isOpen={show} />
    </div>
  );
}
