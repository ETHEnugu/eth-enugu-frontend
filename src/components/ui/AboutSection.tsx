import Image from "next/image";

const AboutSection = () => {
  const times = [
    {
      title: "2-Weeks",
      description: "Builder Residency, A Populo City",
      icon: "icon1",
    },
    { title: "5 Days", description: "Hackathon", icon: "icon2" },
    { title: "Enugu", description: "City", icon: "icon3" },
    {
      title: "1st ETH Conference",
      description: "In South-East",
      icon: "icon4",
    },
  ];

  return (
    <>
      <div className=" m-auto md:px-8 md:py-10 py-9 w-11/12">
        <h2 className="text-2xl font-bold text-center text-green-550 mb-4">
          About EthEnugu &lsquo;25
        </h2>
        <p className="text-dark text-center md:text-left text-lg mb-6">
          Nestled in the hills of southeastern Nigeria, Enugu—fondly known as
          The Coal City—has long been a symbol of resilience, heritage, and
          innovation. From its colonial-era coal mines to its bustling streets
          filled with Igbo art, tech startups, and spirited youth, Enugu stands
          as a city rich in culture and ambition.
        </p>
        <p className="text-dark text-center md:text-left text-lg mx-auto">
          EthEnugu is where this spirit meets the future. It&lsquo;s more than
          an event-it&lsquo;s an experience connecting Enugu&lsquo;s vibrant
          energy with the decentralized world of Ethereum & L2s. Here, builders,
          creators and thinkers come together to mint ideas, join the growing
          web3 ecosystem, and co-create the future, bringing 042 & Africa
          onchain.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 space-y-4 md:space-y-0 mt-20 items-center justify-center text-dark text-center">
          {times.map((item, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              <h3 className="text-2xl leading-full md:text-4xl font-semibold">
                {item.title}
              </h3>
              <div className="flex gap-2 items-center whitespace-nowrap">
                <Image
                  src={`/icons/${item.icon}.svg`}
                  width={16}
                  height={16}
                  className="object-cover"
                  alt={item.icon}
                />
                <p className="md:text-base text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutSection;
