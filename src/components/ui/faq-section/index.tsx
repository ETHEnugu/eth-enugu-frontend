import { Accordion } from "@/components/common/accordion";
import { accordion_data } from "./_data";

export default function FaqSection() {
  return (
    <section
      id="faq"
      className=" w-full flex items-start flex-col md:flex-row justify-between gap-12 px-5 pt-20 md:p-20  "
    >
      <div className="w-full md:max-w-sm flex flex-col gap-8 items-start ">
        <h2 className="w-full max-w-[300px] font-extrabold text-2xl md:text-[32px] text-dark leading-[100%]  ">
          Frequently Asked Questions
        </h2>
        <p className=" text-sm md:text-base font-medium text-dark">
          Find quick answers to common queries in our FAQs section, designed to
          address your most pressing questions and provide you with the
          information you need.
        </p>
      </div>

      {/* accordion section */}

      <div className=" w-full max-w-2xl ">
        <Accordion items={accordion_data} allowMultiple={false} />
      </div>
    </section>
  );
}
