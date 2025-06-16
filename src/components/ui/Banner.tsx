"use client";
import Link from "next/link";
import { Button } from "../common/button";
import Image from "next/image";
import LinksDisplayModal from "@/layout/navbar/LinksDisplayModal";
import { useState } from "react";

const Banner = () => {
  const events = [
    {
      title: "2-weeks Builder's Residency",
      description:
        "The ETH Enugu Builder Residency is a 2-week in-person program for a selected group of builders (developers, designers, and founders) who are passionate about Ethereum, Web3 or emerging technologies",
      tags: [
        "Residents will live and work together in Enugu",
        "Open to both local and International Builders",
        "Collaborate on ideas and projects",
        "Access to dedicated coworking space",
        "Daily workshops & hands-on building time",
        "Access to top-tier mentors and community leaders",
      ],
      attachments: {
        particpants: {
          icon: "",
          number: 50,
        },
        duration: {
          icon: "",
          number: "04 - 15 AUG",
        },
      },
      link: "/builder-residency-application",
      image: "/banner/hotel-img.jpg",
      rotate: 8,
    },
    {
      title: "EthEnugu '25 Pop-Up City",
      description:
        "The pop up is different from the residency, there&apos;s no accomodation, Open to students, designers, developers, or any curious mind. you can come from your home each day",
      tags: [
        "Meet & Build alongside participants of the ETH Enugu builder residency",
        "Open to both local residents and international participants",
        "Collaborate on ideas and projects",
        "Access to dedicated coworking space",
        "Access to top-tier mentors",
      ],
      link: "/popup-city-application",
      image: "/banner/otigba.svg",
      rotate: -12,
    },
    {
      title: "Register for Conf/Summit '25",
      description:
        "This is the final event – a grand conference that brings everyone together: the residents, the local community, global guests, and industry leaders. It will feature talks, showcases, panel sessions, and more, celebrating everything built and learned during the residency and pop-up experience.",
      tags: [
        "Access to top-tier mentors and community leaders",
        "Demo Day to show off your project",
      ],
      link: "/conference-application",
      image: "/banner/conference.jpg",
      rotate: 6,
    },
    {
      title: "Ethereum Research Village",
      description:
        "Explore Ethereum core research, academic papers, Node operations, protocol engineering, P2P Networking, security, infa and deep tech & other areas beyond just smart contracts development and building",
      tags: [
        "Devs",
        "Technical Writers",
        "Node Runners",
        "Engineers",
        "Researchers",
      ],
      link: "",
      image: "/banner/build.jpg",
      rotate: 5,
    },
    {
      title: "Ecosystem Day: A celebration of blockkchain beyon Ethereum",
      description:
        "On Ecosystem Day, we shine a light on all thriving non-EVM ecosystem. This day is about learning, unlearning, and collaboration",
      tags: ["Unique Strengths", "Tools", "Collaboration", "Learning"],
      link: "",
      image: "/banner/conference.jpg",
      rotate: 6,
    },
  ];

  const [show, setShow] = useState<boolean>(false);

  const handleToggelModal = () => {
    setShow((prev) => !prev);
  };

  return (
    <>
      <div className="bg-peach-30">
        <section className="font-sans  py-8 w-11/12 m-auto space-y-8">
          {events.map((event, idx) => {
            const isGreen = idx === 0;
            const isOrange = idx === 1;
            const isGray = idx === 2 || 4;
            const isCream = idx === 3;

            const containerBg = isGreen
              ? "bg-green-350 text-white"
              : isOrange
                ? "bg-orange-500 text-black"
                : isCream
                  ? "bg-peach-10 text-dark"
                  : "bg-white text-black";

            const buttonBg = isGreen
              ? "bg-orange-500 text-black"
              : isOrange
                ? "bg-green-550 text-white"
                : "bg-green-550 text-white";

            const buttonText = idx === 0 ? "Apply Here →" : "Register Here →";

            return (
              <div
                key={idx}
                className={`relative ${containerBg} rounded-xl  md:px-20 py-8 px-5 md:py-[60px]  shadow-sm border border-dark overflow-hidden`}
              >
                {/* MENTOR Background Text */}
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
                  <h1
                    className={`background-h1 opacity-5 align-middle font-pixelify select-none ${isGray ? "bg-gray-300" : " text-gray-100/60"}`}
                  >
                    MENTOR
                  </h1>
                </div>

                {/* Foreground content */}
                <div className="relative z-10 flex flex-col items-start">
                  <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-8">
                    <aside className="w-full flex flex-col gap-3">
                      <span className="md:text-5xl text-2xl font-bold mb-4">
                        {event.title}
                      </span>

                      <p
                        className={`${isGreen ? "text-white/90" : " dark:text-black/80"} text-sm md:text-base mb-6 md:w-2/3`}
                      >
                        {event.description}
                      </p>

                      <section>
                        <ul
                          className={`flex flex-col gap-4 mb-6 w-fit ${
                            isGray ? "bg-black/20" : "bg-black/10 text-white"
                          } rounded-md p-6 text-sm inline-block`}
                        >
                          {event.tags.map((tag, i) => (
                            <li
                              key={i}
                              className={`md:w-max font-medium my-1 flex items-center gap-2`}
                            >
                              <Image
                                src="/icons/cartoon-arrow.png"
                                alt="arrow"
                                width={16}
                                height={16}
                              />
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </section>
                    </aside>
                    <aside className="w-full md:w-[45%] h-full ml-auto">
                      <Image
                        src={event?.image}
                        alt={event?.title}
                        title={event?.title}
                        width={400}
                        height={400}
                        style={{ transform: `rotate(${event.rotate}deg)` }}
                        className="object-contain"
                      />
                    </aside>
                  </div>

                  {event.link ? (
                    <Link
                      href={event.link}
                      className="no-underline max-md:mt-4"
                    >
                      <Button
                        className={`flex items-center gap-3 ${buttonBg} ${isGreen ? "hover:bg-amber-750" : ""}`}
                        design="rounded"
                      >
                        {buttonText}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className={`flex items-center gap-3 ${buttonBg} ${isGreen ? "hover:bg-amber-750" : ""}`}
                      design="rounded"
                      onClick={handleToggelModal}
                    >
                      {buttonText}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </div>

      <LinksDisplayModal isOpen={show} onClose={handleToggelModal} />
    </>
  );
};

export default Banner;
