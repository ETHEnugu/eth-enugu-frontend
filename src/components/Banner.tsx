const banner = () => {
  const events = [
    {
      title: "2-weeks Builder’s Residency",
      description:
        "The ETH Enugu Builder Residency is a 2-week in-person program for a select group of builders (developers, designers, founders, researchers, and creatives) who are passionate about Ethereum, Web3, or emerging technologies. Residents will live and work together in Enugu, collaborate on ideas and projects, engage with the local community through the Pop-Up, and get access to dedicated coworking space, curated sessions, mentorship, and possibly meals — all designed to help you build, learn, and grow with others.",
      tags: [
        " Daily workshops & hands-on building time",
        "Access to top-tier mentors and community leaders",
        "Good vibes, IRL collabs, and a supportive community",
      ],
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
    },
    {
      title: "Register for Conf/Summit ’25",
      description:
        "This is the final event – a grand conference that brings everyone together: the residents, the local community, global guests, and industry leaders. It will feature talks, showcases, panel sessions, and more, celebrating everything built and learned during the residency and pop-up experience.",
      tags: [
        "Access to top-tier mentors and community leaders",
        "Demo Day to show off your project",
      ],
    },
  ];
  return (
    <>
      <div className="bg-[#F9F4E8]">
        <section className="font-sans  py-8 w-11/12 m-auto space-y-8">
          {events.map((event, idx) => {
            const isGreen = idx === 0;
            const isOrange = idx === 1;
            const isGray = idx === 2;

            const containerBg = isGreen
              ? "bg-[#338933] text-white"
              : isOrange
                ? "bg-[#F3A035] text-black"
                : "bg-[#FFFFFF] text-black";

            const buttonBg = isGreen
              ? "bg-[#F3A035] text-black"
              : isOrange
                ? "bg-[#338933] text-white"
                : "bg-[#338933] text-white";

            const buttonText = idx === 0 ? "Apply Here →" : "Register Here →";

            return (
              <div
                key={idx}
                className={`relative ${containerBg} rounded-xl  md:px-[80px] py-[32px] px-[20px] md:py-[60px]  shadow-sm border-[0.1px] border-[#1E1E1E] overflow-hidden`}
              >
                {/* MENTOR Background Text */}
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
                  <h1 className="text-[550px] sm:text-[550px] opacity-10 text-gray-100 align-middle font-pixelify select-none">
                    MENTOR
                  </h1>
                </div>

                {/* Foreground content */}
                <div className="relative z-10">
                  <h2 className="md:text-[48px] text-2xl font-bold mb-4">
                    {event.title}
                  </h2>

                  <div className="flex font-sans flex-col md:flex-row justify-between md:gap-16">
                    <p className="text-sm md:text-base mb-6 dark:text-black/80 md:w-2/3">
                      {event.description}
                    </p>

                    <ul className="space-y-2 mb-6 md:w-2/4">
                      {event.tags.map((tag, i) => (
                        <li
                          key={i}
                          className={`${
                            isGray
                              ? "bg-[#1E1E1E0A] "
                              : "bg-black/10 text-white"
                          } rounded-full px-4 py-2 text-sm inline-block`}
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    className={`rounded-full ${buttonBg} w-full md:w-max font-semibold px-6 shadow-md py-2 hover:opacity-90 transition`}
                  >
                    {buttonText}
                  </button>
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
