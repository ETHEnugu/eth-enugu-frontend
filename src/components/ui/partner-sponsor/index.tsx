"use client";
import {
  CommunityPartners1,
  CommunityPartners2,
  hackathonBountySupporters,
  localEcosystemSupportPartner,
  mediaPartner,
  sponsors,
} from "../eth-enugu/_data";
import { Button } from "@/components/common/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import Marquee from "react-fast-marquee";
// import useDeviceSize from "@/hooks/useDeviceSize";

export default function PartnerSponsor() {
  // const { isMobile } = useDeviceSize();

  return (
    <div className="w-full max-w-6xl max-md:px-4 mx-auto flex flex-col gap-24 py-18">
      <section className="w-full flex flex-col gap-14">
        <div className="w-full flex items-center justify-center flex-col gap-3">
          <h1 className="text-green-550 font-bold text-xl text-center mb-4">
            Sponsors
          </h1>
          <div className="w-max flex items-center gap-3 mx-auto">
            {sponsors.map((sponsor, idx) => (
              <div
                key={idx}
                className="w-36 h-16 sm:w-48 sm:h-20 border border-dark rounded-xl overflow-hidden mx-3 "
                style={{
                  backgroundImage: `url(${sponsor.logo})`,
                  backgroundPosition: "center",
                  backgroundSize: "58%",
                  backgroundRepeat: "no-repeat",
                }}
                title={sponsor.name}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex items-center justify-center flex-col gap-3">
          <h1 className="text-green-550 font-bold text-xl text-center mb-4">
            Hackathon Bounty Supporters
          </h1>
          <div className="w-full flex  items-center justify-center gap-3">
            {hackathonBountySupporters.map((partner, idx) => (
              <div
                key={idx}
                className="w-36 h-16 sm:w-48 sm:h-20 border border-dark rounded-xl overflow-hidden mx-3 "
                style={{
                  backgroundImage: `url(${partner.logo})`,
                  backgroundPosition: "center",
                  backgroundSize: "58%",
                  backgroundRepeat: "no-repeat",
                }}
                title={partner.name}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex items-center justify-center flex-col gap-3">
          <h1 className="text-green-550 font-bold text-xl text-center mb-4">
            Local Ecosystem Supporters
          </h1>
          <div className="w-full flex flex-wrap items-center justify-center gap-3">
            {localEcosystemSupportPartner.map((partner, idx) => (
              <div
                key={idx}
                className="w-36 h-16 sm:w-48 sm:h-20 border border-dark rounded-xl overflow-hidden mx-3 "
                style={{
                  backgroundImage: `url(${partner.logo})`,
                  backgroundPosition: "center",
                  backgroundSize: "58%",
                  backgroundRepeat: "no-repeat",
                }}
                title={partner.name}
              />
            ))}
          </div>
        </div>

        <div className="w-full flex items-center justify-center flex-col gap-3">
          <h1 className="text-green-550 font-bold text-xl text-center mb-4">
            Media Partners
          </h1>
          <div className="w-full flex  items-center justify-center gap-3">
            <Marquee autoFill={true} speed={100} pauseOnHover={true}>
              {mediaPartner.map((partner, idx) => (
                <Link key={idx} href={partner?.link || "/"} target="_blank">
                  <div
                    className="w-36 h-16 sm:w-48 sm:h-20 border border-dark rounded-xl overflow-hidden mx-3 "
                    style={{
                      backgroundImage: `url(${partner.logo})`,
                      backgroundPosition: "center",
                      backgroundSize: "58%",
                      backgroundRepeat: "no-repeat",
                    }}
                    title={partner.name}
                  />
                </Link>
              ))}
            </Marquee>
          </div>
        </div>

        <div className="w-full flex items-center justify-center flex-col gap-3">
          <h1 className="text-green-550 font-bold text-xl text-center mb-4">
            Community partners
          </h1>
          <div className="w-full flex  items-center justify-center gap-3">
            <Marquee autoFill={true} speed={100} pauseOnHover={true}>
              {CommunityPartners1.map((partner, idx) => (
                <div
                  key={idx}
                  className="w-36 h-16 sm:w-48 sm:h-20 border border-dark rounded-xl overflow-hidden mx-3 "
                  style={{
                    backgroundImage: `url(${partner.logo})`,
                    backgroundPosition: "center",
                    backgroundSize: "58%",
                    backgroundRepeat: "no-repeat",
                  }}
                  title={partner.name}
                />
              ))}
            </Marquee>
          </div>

          <div className="w-full flex  items-center justify-center gap-3">
            <Marquee autoFill={true} speed={100} pauseOnHover={true}>
              {CommunityPartners2.map((partner, idx) => (
                <div
                  key={idx}
                  className="w-36 h-16 sm:w-48 sm:h-20 border border-dark rounded-xl overflow-hidden mx-3 "
                  style={{
                    backgroundImage: `url(${partner.logo})`,
                    backgroundPosition: "center",
                    backgroundSize: "58%",
                    backgroundRepeat: "no-repeat",
                  }}
                  title={partner.name}
                />
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      <section className="w-full bg-dark rounded-3xl md:rounded-[60px] p-20 flex flex-col items-center justify-center gap-12">
        <span className="w-full mx-auto text-center text-white text-4xl md:text-6xl">
          {/* We&apos;re offering Empowerment and <br />
          <span
            className={`w-max items-start gap-1 mx-auto ${isMobile ? "inline-block" : "flex"}`}
          >
            Growth, the&nbsp;
            <span className="w-max flex items-start gap-1">
              <Image
                src="/images/eth-enugu-arrow.svg"
                alt="Eth Enugu"
                width={isMobile ? 160 : 240}
                height={isMobile ? 160 : 240}
              />
              Way!
            </span>
          </span> */}
          We believe that innovation{" "}
          <span className="text-amber-500">isn’t siloed but shared</span>,
          support & join us on this Journey!
        </span>

        <Link
          href="https://docs.google.com/presentation/d/14CTUVGzj6fXICJLnSzNqXc-iLpWardOwjIH-AHFQwPs/edit?usp=drivesdk"
          target="_blank"
        >
          <Button variant="default" design="rounded" className="gap-4 button">
            Become a Sponsor
            <Icon icon={"mdi:arrow-right"} width={18} height={18} />
          </Button>
        </Link>
      </section>
    </div>
  );
}
