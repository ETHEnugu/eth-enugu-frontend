"use client";
import {
  LetterSlideUp,
  WordSlideUp,
} from "@/components/animation/text-animation";
import { Button } from "@/components/common/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MobileHero() {
  const router = useRouter();

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-8">
      <section className="flex flex-col items-center justify-center gap-2 mt-20">
        <WordSlideUp text="Welcome to" className="text-center" />
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
            text="South East Nigeria's first Ethereum"
            className="text-center"
          />
          <WordSlideUp
            text="Conference & Pop-up City."
            className="text-center"
          />
          <WordSlideUp
            text="From Enugu to the Ethereum network — a"
            className="text-center"
          />
          <WordSlideUp
            text="gathering of minds, culture, and innovation."
            className="text-center"
          />
        </span>
      </section>

      <section className="w-max flex flex-col gap-4">
        <Button type="button" variant="plain" design="rounded">
          Register for event
        </Button>
        <Button
          type="button"
          variant="default"
          design="rounded"
          className="flex items-center gap-3"
          onClick={() => router.push("/speaker-application")}
        >
          Apply to Speak
          <Icon icon="solar:arrow-right-linear" width={18} height={18} />
        </Button>
      </section>

      <Image
        src="/images/mobile-hero-image.svg"
        width={500}
        height={500}
        alt="Background image"
        className="mt-auto object-cover"
      />
    </div>
  );
}
