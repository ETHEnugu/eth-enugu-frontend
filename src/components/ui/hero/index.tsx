"use client";
import useDeviceSize from "@/hooks/useDeviceSize";
import Image from "next/image";
import DesktopHero from "./DesktopHero";
import MobileHero from "./MobileHero";

export default function HomeHero() {
  const { isMobile } = useDeviceSize();

  return (
    <div className="relative w-full h-screen">
      <Image
        src="/images/main-bg.svg"
        width={0}
        height={0}
        alt="Background image"
        className="asbsolute w-full h-full object-cover top-0 left-0 z-0"
      />
      {isMobile ? <MobileHero /> : <DesktopHero />}
    </div>
  );
}
