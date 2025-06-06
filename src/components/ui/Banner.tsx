import Link from "next/link";
import { Button } from "../common/button";

const banner = () => {
  const events = [
    {
      title: "2-weeks Builder’s Residency",
      description:
        "The ETH Enugu Builder's Residency is a 2-week in-person program for a select group of builders (developers, designers, founders, researchers, and creatives) who are passionate about Ethereum, Web3, or emerging technologies. Residents will live and work together in Enugu, collaborate on ideas and projects, engage with the local community through the Pop-Up, and get access to dedicated coworking space, curated sessions, mentorship, and possibly meals — all designed to help you build, learn, and grow with others.",
      tags: [
        " Daily workshops & hands-on building time",
        "Access to top-tier mentors and community leaders",
        "Good vibes, IRL collabs, and a supportive community",
      ],
      link: "/builder-residency-application",
    },
    {
      title: "EthEnugu ’25 Pop-Up City",
      description:
        "The Pop-Up City is a 2-week daily-access coworking experience, open to locals i.e anyone living in Enugu and Southeast Nigeria. For two weeks, you can work from the ETH Enugu coworking space, join daily workshops/sessions, meet & build alongside participants of the ETH Enugu builder residency. The pop up is different from the  residency — there’s no accommodation, Whether you’re a student, designer, developer, or just curious, you can come from your home each day, walk into the space daily to learn, build, collaborate, attend workshops, or simply vibe with others who are part of the builder residency. ",
      tags: [
        " Daily workshops & hands-on building time",
        "Access to top-tier mentors and community leaders",
        "Good vibes, IRL collabs, and a supportive community",
      ],
      link: "/popup-city-application",
    },
    {
      title: "Register for Conf/Summit ’25",
      description:
        "This is the final event – a grand conference that brings everyone together: the residents, the local community, global guests, and industry leaders. It will feature talks, showcases, panel sessions, and more, celebrating everything built and learned during the residency and pop-up experience.",
      tags: [
        "Access to top-tier mentors and community leaders",
        "Demo Day to show off your project",
      ],
      link: "/conference-application",
    },
  ];
  return (
    <>
      <div className="bg-peach-30">
        <section className="font-sans  py-8 w-11/12 m-auto space-y-8">
          {events.map((event, idx) => {
            const isGreen = idx === 0;
            const isOrange = idx === 1;
            const isGray = idx === 2;

            const containerBg = isGreen
              ? "bg-green-350 text-white"
              : isOrange
                ? "bg-orange-500 text-black"
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
                    className={`background-h1 opacity-5 align-middle font-pixelify select-none ${isGray ? "bg-gray-100" : " text-gray-100/60"}`}
                  >
                    MENTOR
                  </h1>
                </div>

                {/* Foreground content */}
                <div className="relative z-10 flex flex-col items-start">
                  <span className="md:text-5xl text-2xl font-bold mb-4">
                    {event.title}
                  </span>

                  <div className="flex font-sans flex-col md:flex-row justify-between md:gap-16 mt-3">
                    <p
                      className={`${isGreen ? "text-white/90" : " dark:text-black/80"} text-sm md:text-base mb-6 md:w-2/3`}
                    >
                      {event.description}
                    </p>

                    <ul className="flex flex-col gap-2 mb-6 md:w-2/4">
                      {event.tags.map((tag, i) => (
                        <li
                          key={i}
                          className={`md:w-max font-medium ${
                            isGray ? "bg-black/20" : "bg-black/10 text-white"
                          } rounded-full px-4 py-2 text-sm inline-block`}
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={event.link} className="no-underline">
                    <Button
                      className={`flex items-center gap-3 ${buttonBg} ${isGreen ? "hover:bg-amber-750" : ""}`}
                      design="rounded"
                    >
                      {buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default banner;
