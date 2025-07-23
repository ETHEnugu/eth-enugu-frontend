"use client";
import Link from "next/link";
import { Button } from "../common/button";
import Image from "next/image";
import LinksDisplayModal from "@/layout/navbar/LinksDisplayModal";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { events } from "@/data/events";
import useDeviceSize from "@/hooks/useDeviceSize";
import BuilderEndedModal from "./builder-ended-modal";

const Banner = () => {
  const [show, setShow] = useState<boolean>(false);
  const [showBuilderModal, setshowBuilderModal] = useState<boolean>(false);
  const { isMobile } = useDeviceSize();

  const getSlideBackground = (type: string) => {
    switch (type) {
      case "residency":
        return "bg-gradient-to-br from-green-550 to-green-550";
      case "popup":
        return "bg-gradient-to-br from-orange-500 to-orange-500";
      case "research":
        return "bg-gradient-to-br from-peach-30 to-peach-30";
      case "ecosystem":
        return "bg-gradient-to-br from-white to-white";
      case "conference":
        return "bg-gradient-to-br from-gray-100 to-gray-100";
      default:
        return "bg-gradient-to-br from-blue-600 to-blue-800";
    }
  };

  const getTextColor = (type: string) => {
    return ["research", "ecosystem", "conference", "popup"].includes(type)
      ? "text-gray-900"
      : "text-white";
  };

  const getAudienceIcon = (audience: string) => {
    switch (audience.toLowerCase()) {
      case "devs":
        return "/icons/dev.svg";
      case "technical writers":
        return "/icons/technical.svg";
      case "node runners":
        return "/icons/node.svg";
      case "engineers":
        return "/icons/engineers.svg";
      case "researchers":
        return "/icons/researchers.svg";
      default:
        return "mdi:account";
    }
  };

  const handleToggelModal = () => {
    setShow((prev) => !prev);
  };

  const handleBuilderCloseModal = () => {
    setshowBuilderModal((prev) => !prev);
  };

  return (
    <>
      <div className="bg-peach-30">
        <section className="w-full flex flex-col gap-8">
          {events.map((item) => {
            const containerColor = getSlideBackground(item?.type);
            const textColor = getTextColor(item?.type);
            const buttonText =
              item?.type === "residency" ? "Apply Here →" : "Register Here →";

            return (
              <div
                key={item?.id}
                className={`w-full max-w-[90%] mx-auto flex flex-col gap-4 ${containerColor} ${textColor} rounded-xl md:px-12 lg:px-24 xl:px-32 py-8 px-5 md:py-[60px] border border-dark overflow-hidden`}
              >
                <div
                  className={`w-full flex flex-col md:flex-row ${
                    item?.type === "popup" || item?.type === "residency"
                      ? "items-center"
                      : "items-start"
                  } justify-between gap-8 md:gap-20`}
                >
                  <aside>
                    <span className="md:text-5xl text-3xl font-bold mb-4">
                      {item?.title}
                    </span>

                    <p className="text-sm md:text-base mb-6 md:w-2/3 mt-3">
                      {item?.description}
                    </p>

                    <section
                      className={`w-full flex flex-col 2xl:flex-row items-start gap-4 ${
                        item?.type === "popup" || item?.type === "residency"
                          ? "md:flex-row"
                          : "md:flex-row"
                      }`}
                    >
                      {item?.features && item?.features.length > 0 && (
                        <>
                          {item?.type === "ecosystem" ? (
                            <div className="flex flex-wrap gap-2 mb-6 md:mt-20">
                              {item?.features.map((feature, i) => (
                                <span
                                  key={i}
                                  className="px-4 py-2 bg-amber-150 capitalize text-dark rounded-full text-base font-medium whitespace-nowrap border border-dark"
                                >
                                  {feature}
                                </span>
                              ))}
                              <h4 className="text-green-550 md:mt-12">
                                It’s a reminder that innovation isn’t siloed —
                                it’s shared.
                              </h4>
                            </div>
                          ) : (
                            <ul
                              className={`
                            flex flex-col gap-2 mb-6 w-fit bg-white/10 rounded-2xl px-6 text-base 
                            ${item?.type === "popup" ? "py-[3.8em]" : item?.type === "residency" ? "w-full py-10" : item?.type === "conference" ? "md:my-12 p-4 border rounded-2xl" : "py-10"}
                            `}
                            >
                              {item?.features.map((feature, i) => (
                                <li
                                  key={i}
                                  className="md:w-max font-medium my-1 flex items-center gap-2"
                                >
                                  <Image
                                    src="/icons/cartoon-arrow.png"
                                    alt="arrow"
                                    width={16}
                                    height={16}
                                  />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      )}

                      {(item?.participants || item?.duration) && (
                        <aside
                          className={`${
                            item?.type === "residency" || item?.type === "popup"
                              ? "w-full"
                              : "w-full md:w-72 2xl:w-84"
                          } space-y-4 bg-white/10 p-6 rounded-2xl`}
                        >
                          <h4>Audience Forcast</h4>
                          {item?.participants && (
                            <div
                              className={`bg-black/30 p-4 rounded-2xl ${item?.type === "popup" ? "bg-orange-500 text-dark" : "bg-green-550 text-peach-250"}`}
                            >
                              Participants: <br />
                              <span
                                className={`flex items-center gap-2 ${item?.type === "popup" ? "text-dark" : "text-white"}`}
                              >
                                <Icon
                                  icon="mdi:account-group"
                                  width={24}
                                  height={24}
                                />
                                <h2>{item?.participants}</h2>
                              </span>
                            </div>
                          )}
                          {item?.duration && (
                            <div
                              className={`p-4 rounded-2xl ${item?.type === "popup" ? "bg-orange-500 text-dark" : "bg-green-550 text-peach-250"}`}
                            >
                              Duration: <br />
                              <span
                                className={`flex items-center gap-2 ${item?.type === "popup" ? "text-dark" : "text-white"}`}
                              >
                                <Icon
                                  icon="mdi:calendar"
                                  width={24}
                                  height={24}
                                />
                                <h2>{item?.duration}</h2>
                              </span>
                            </div>
                          )}
                        </aside>
                      )}

                      {item?.targetAudience && (
                        <aside className="w-full space-y-4 md:mt-20">
                          <h4 className="text-green-750 font-semibold">
                            Who is this for?
                          </h4>
                          <div className="w-full flex items-center gap-4 flex-wrap mx-auto">
                            {item.targetAudience.map((audience, index) => (
                              <div
                                key={index}
                                className="w-26 h-26 2xl:w-32 2xl:h-32 p-5 flex flex-col items-center justify-center gap-2 text-gray-900 bg-white rounded-lg text-center"
                              >
                                <Image
                                  src={getAudienceIcon(audience)}
                                  alt={audience}
                                  width={36}
                                  height={36}
                                />
                                <span>{audience}</span>
                              </div>
                            ))}
                          </div>
                        </aside>
                      )}
                    </section>
                  </aside>
                  <div
                    className={`relative ${item?.type === "residency" || item?.type === "popup" ? "w-full lg:hidden 2xl:block 2xl:max-w-md" : "w-max"} h-full`}
                  >
                    <Image
                      src={item?.image}
                      alt={item?.title}
                      title={item?.title}
                      width={isMobile ? 300 : 700}
                      height={isMobile ? 300 : 700}
                      className="object-contain"
                      style={{
                        rotate: item?.type === "popup" ? "-5deg" : "0deg",
                      }}
                    />
                  </div>
                </div>

                {item?.type !== "ecosystem" &&
                  item?.type !== "research" &&
                  (item?.link &&
                  item?.link !== "/builder-residency-application" ? (
                    <Link href={item?.link} className="w-max no-underline">
                      <Button
                        className={`w-max flex items-center gap-3 ${item?.type === "residency" ? "!bg-orange-650 !text-dark" : "bg-green-550"} text-white hover:bg-amber-750`}
                        design="rounded"
                      >
                        {buttonText}
                      </Button>
                    </Link>
                  ) : item?.link === "/builder-residency-application" ? (
                    <Button
                      className={`w-max flex items-center gap-3 !bg-orange-650 !text-dark hover:bg-amber-750`}
                      design="rounded"
                      onClick={() => setshowBuilderModal(true)}
                    >
                      {buttonText}
                    </Button>
                  ) : (
                    <Button
                      className={`w-max flex items-center gap-3 ${item?.type === "residency" ? "!bg-orange-650 !text-dark" : "bg-green-550"} text-white hover:bg-amber-750`}
                      design="rounded"
                      onClick={handleToggelModal}
                    >
                      {buttonText}
                    </Button>
                  ))}
              </div>
            );
          })}
        </section>
      </div>

      <LinksDisplayModal isOpen={show} onClose={handleToggelModal} />
      <BuilderEndedModal
        show={showBuilderModal}
        onClose={handleBuilderCloseModal}
      />
    </>
  );
};

export default Banner;
