"use client";
import { Icon } from "@iconify/react";
import { foot_nav, socials } from "./_data";
import Link from "next/link";
import { useState } from "react";
import LinksDisplayModal from "../navbar/LinksDisplayModal";

export default function Footer() {
  const [show, setShow] = useState<boolean>(false);

  const handleToggelModal = () => {
    setShow((prev) => !prev);
  };

  return (
    <footer className="w-full bg-dark pt-20">
      <section role="group" className="bg-dark px-8 flex flex-col gap-5">
        <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between">
          <aside className="text-white flex flex-col items-center md:items-start gap-5 justify-between mb-8 md:mb-0">
            <p className="mx-auto md:mx-0 text-center md:text-left">
              DROP US A LINE
            </p>

            <Link
              href="mailto:ethenugu@gmail.com"
              className="text-2xl md:text-4xl font-medium flex items-center text-center md:text-left gap-8"
            >
              ETHENUGU@GMAIL.COM
              <Icon
                icon="bitcoin-icons:arrow-right-outline"
                width={18}
                height={18}
                color="#F08803"
              />
            </Link>
          </aside>

          <menu className="w-max flex flex-col md:flex-row md:items-start gap-8">
            {Object.entries(foot_nav).map(([key, value], idx) => (
              <div
                key={idx}
                className="flex flex-col items-center md:items-start gap-1.5"
              >
                <span className="text-white text-md font-bold w-max whitespace-nowrap">
                  {key.toUpperCase()}
                </span>
                {value.map((item, index) => (
                  <Link
                    href={item.title === "Get a Ticket" ? "" : item.link}
                    key={index}
                    className="w-max text-gray-400 hover:text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      if (item.title === "Get a Ticket") {
                        handleToggelModal();
                      } else {
                        return null;
                      }
                    }}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </menu>
        </div>

        <div className="text-white flex flex-col md:flex-row items-center gap-8 mx-auto md:mx-0 md:ml-auto mb-12">
          <h4>DROP US A LINE</h4>
          <span className="flex items-center gap-4">
            {socials.map((item, idx) => (
              <Link key={idx} href={item?.link} target="_blank">
                <button
                  role="button"
                  type="button"
                  className="w-12 h-12 flex items-center justify-center text-white transition ease-in-out duration-150 hover:scale-105 cursor-pointer bg-neutral-800 rounded-lg"
                >
                  <Icon icon={item?.icon} width={24} height={24} />
                </button>
              </Link>
            ))}
          </span>
        </div>
      </section>

      {/* <section
        role="banner"
        className="relative w-full h-32 md:h-62 bg-green-750 text-white flex justify-center overflow-hidden"
      >
        <span className="absolute text-[6em] md:text-[20em] font-bold mx-auto mt-12 md:mt-0">
          ETH ENUGU
        </span>
      </section> */}

      <LinksDisplayModal isOpen={show} onClose={handleToggelModal} />
    </footer>
  );
}
