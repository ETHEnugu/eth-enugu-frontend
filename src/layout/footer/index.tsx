import { Icon } from "@iconify/react";
import { foot_nav, socials } from "./_data";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-dark pt-20">
      <section role="group" className="bg-dark px-8 flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <aside className="text-white flex flex-col gap-5 justify-between">
            <p>DROP US A LINE</p>

            <Link
              href="mailto:hello@ethenugu.com"
              className="text-4xl font-medium flex items-center gap-8"
            >
              HELLO@ETHENUGU.COM
              <Icon
                icon="bitcoin-icons:arrow-right-outline"
                width={18}
                height={18}
                color="#F08803"
              />
            </Link>

            <Link
              href="tel:+234 XXX XXX XXXX"
              className="text-4xl font-medium flex items-center gap-8"
            >
              +234 XXX XXX XXXX
              <Icon
                icon="bitcoin-icons:arrow-right-outline"
                width={18}
                height={18}
                color="#F08803"
              />
            </Link>
          </aside>

          <menu className="flex items-start gap-8">
            {Object.entries(foot_nav).map(([key, value], idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <span className="text-white text-md font-bold w-max whitespace-nowrap">
                  {key.toUpperCase()}
                </span>
                {value.map((item, index) => (
                  <Link
                    href={item.link}
                    key={index}
                    className="w-max text-gray-400 hover:text-white"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </menu>
        </div>

        <div className="text-white flex items-center gap-8 ml-auto mb-12">
          <h4>DROP US A LINE</h4>
          <span className="flex items-center gap-4">
            {socials.map((item, idx) => (
              <button
                key={idx}
                role="button"
                type="button"
                className="w-12 h-12 flex items-center justify-center text-white transition ease-in-out duration-150 hover:scale-105 cursor-pointer bg-neutral-800 rounded-lg"
              >
                <Icon icon={item?.icon} width={24} height={24} />
              </button>
            ))}
          </span>
        </div>
      </section>

      <section
        role="banner"
        className="relative w-full h-62 bg-green-750 text-white flex justify-center overflow-hidden"
      >
        <span className="absolute text-[20em] font-bold mx-auto mt-0">
          ETH ENUGU
        </span>
      </section>
    </footer>
  );
}
