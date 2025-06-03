"use client";
import Image from "next/image";
import { navbar_items } from "./_data";
import Link from "next/link";
import { Button } from "@/components/common/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const pathname = usePathname();
  // const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full flex items-center px-6 py-4 bg-white/20 border-b border-gray-400">
      <div className="w-32 h-10">
        <Link href="/">
          <Image
            src="/logo.svg"
            width={0}
            height={0}
            alt="Eth Enugu"
            title="Eth Enugu"
            aria-label="Eth Enugu"
            aria-labelledby="Eth Enugu"
            className="w-full h-full"
          />
        </Link>
      </div>

      <div
        role="navigation"
        className="hidden md:flex items-center gap-4 ml-18"
      >
        {navbar_items.map((item, idx) => (
          <Link
            key={idx}
            href={item?.link}
            className={`text-base font-medium transition-colors duration-200 hover:text-green-550 ${
              pathname === item.link ? "text-green-550" : "text-gray-700"
            }`}
          >
            {item?.title}
          </Link>
        ))}
      </div>

      <aside className="w-max ml-auto hidden md:flex items-center gap-4">
        <Button type="button" variant="plain" design="rounded">
          Register for event
        </Button>

        <Link href="/speaker-application">
          <Button
            type="button"
            variant="default"
            design="rounded"
            className="flex items-center gap-3"
          >
            Apply to Speak
            <Icon icon="solar:arrow-right-linear" width={18} height={18} />
          </Button>
        </Link>
      </aside>

      <button
        type="button"
        className="md:hidden block ml-auto cursor-pointer"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Icon icon="prime:bars" width={32} height={32} />
      </button>

      <MobileNav isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </nav>
  );
}
