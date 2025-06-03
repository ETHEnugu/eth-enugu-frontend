import Image from "next/image";
import { navbar_items } from "./_data";
import Link from "next/link";
import { Button } from "@/components/common/button";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center px-6 py-4 bg-white/20 border-b border-gray-400">
      <div className="w-32 h-10">
        <Image
          src="/logo.svg"
          width={0}
          height={0}
          alt="Eth Enugu"
          title="Eth Enugu"
          aria-label="Eth Enugu"
          aria-labelledby="Eth Enugu"
          // fill
          className="w-full h-full"
        />
      </div>

      <div role="navigation" className="flex items-center gap-4 ml-18">
        {navbar_items.map((item, idx) => (
          <Link key={idx} href={item?.link}>
            {item?.title}
          </Link>
        ))}
      </div>

      <aside className="w-max ml-auto flex items-center gap-4">
        <Link href={"conference-application"}>
          <Button type="button" variant="plain" design="rounded">
            Register for event
          </Button>
        </Link>
        <Button
          type="button"
          variant="default"
          design="rounded"
          className="flex items-center gap-3"
        >
          Apply to Speak
          <Icon icon="solar:arrow-right-linear" width={18} height={18} />
        </Button>
      </aside>
    </nav>
  );
}
