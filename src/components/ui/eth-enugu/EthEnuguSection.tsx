import Image from "next/image";
import { partners, times, content } from "./_data";

const EthEnuguSection = () => {
  return (
    <div className="min-h-screen font-sans flex flex-col bg-white">
      <div className="relative h-56">
        {/* Background Image */}
        <div className="absolute inset-0  opacity-80">
          <div className="h-full w-full bg-[url('/bg/hero_bg.svg')] bg-cover bg-center text-center"></div>
        </div>

        {/* Content */}
        <div className="relative pt-16 pb-8 lg:px-8 flex flex-col md:ml-80">
          <div className="md:text-left text-center">
            <h3 className="md:text-4xl text-sm text-gray-800">What is</h3>
            <h1 className="mt-2 text-7xl font-bold tracking-tight text-gray-900">
              EthEnugu <span className="text-orange-500">&lsquo;25</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-between w-11/12 md:text-left text-center m-auto">
        <section className="md:py-10 py-5 md:w-1/5 w-full">
          <h3 className="text-green-550 font-bold text-xl mb-4">
            About EthEnugu
          </h3>
        </section>

        <section className="md:w-3/4 w-full">
          {[content.about, content.goal, content.region].map((section, idx) => (
            <div key={idx} className="py-10 border-b border-peach-5">
              <h3 className="text-green-550 font-bold text-xl mb-4">
                {section.title}
              </h3>

              {section.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className={`text-gray-700 mb-4 leading-relaxed${i > 0 ? " mb-4" : ""}`}
                >
                  {para}
                </p>
              ))}
            </div>
          ))}

          {/* Partners Section */}
          <div className="py-10 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h3 className="text-green-550 font-bold text-xl mb-4">
                Our Partners
              </h3>
              <div className="flex flex-wrap md:justify-start justify-center gap-4 sm:gap-6">
                {partners.map((partner, idx) => (
                  <div
                    key={idx}
                    className="w-36 h-16 sm:w-48 sm:h-20 border border-dark rounded-xl bg-center bg-no-repeat bg-contain"
                    style={{ backgroundImage: `url(${partner.logo})` }}
                    title={partner.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 space-y-4 md:space-y-0 mt-20 py-20 items-center justify-center  w-11/12 m-auto text-dark text-center">
        {times.map((item, index) => (
          <div
            key={index}
            className="flex md:border-l md:border-light-dark flex-col items-center md:space-y-8 space-y-4"
          >
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
              <p className="md:text-base text-balance text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Image
        src={`/bg/Img.svg`}
        width={0}
        height={0}
        className="object-cover  w-full md:h-auto h-70"
        alt="footer image"
      />
    </div>
  );
};
export default EthEnuguSection;
