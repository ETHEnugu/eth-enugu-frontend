"use client";

import { Button } from "@/components/common/button";
import ConfInfoBanner from "@/components/ui/Conf-Info-Banner";
import PersonalDetailsOne from "@/components/ui/ConferenceForm/PersonalDetailsOne";
import PersonalDetailsTwo from "@/components/ui/ConferenceForm/PersonalDetailsTwo";
import ScrollingText from "@/components/ui/Scrolling-text";
import { ConferenceProps } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ConferenceProps>({
    defaultValues: {
      fullName: "",
      email: "",
      whatsappNumber: "",
      location: "",
      age: "",
      gender: "",
      roleDescription: "",
      expectedGains: "",
      attendanceType: "",
      certificateNeeded: "",
      dietaryAccessibilityNeeds: "",
      referralSource: "",
      joinOnlineCommunity: "",
    },
  });

  const formData = watch();

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentStep !== 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit: SubmitHandler<ConferenceProps> = async (
    data: ConferenceProps
  ) => {
    try {
      setIsSubmitting(true);
      console.log("Form submitted successfully", data); // ✅ This logs the actual user input
      router.push("/application-success");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-[url('/conf-sumit-page-bg/AbstractBg.svg')] bg-no-repeat bg-cover min-h-[50vh] flex items-start justify-center p-2  ">
        {currentStep === 0 && <ConfInfoBanner handleNext={handleNext} />}

        {currentStep > 0 && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="md:w-1/2 bg-[var(--background)] border-[1px] border-[#000000] rounded-2xl flex flex-col items-start justify-center gap-10 p-6 md:p-10 "
          >
            <div className="flex flex-col items-start gap-7 w-full ">
              <div className="w-full flex flex-col md:flex-row items-center justify-between md:items-center gap-4 border-b-[1px] border-[#D9D9D9] pb-6  ">
                <h3 className="text-[var(--color-amber-750)] leading-[100%] ">
                  Conference/Summit ‘25 Form
                </h3>

                <div className="flex items-center gap-1 ">
                  <span
                    className={`w-8 h-2 bg-[#D9D9D9] rounded-[100px] ${currentStep > 0 ? "bg-[var(--color-amber-750)] " : null}`}
                  ></span>
                  <span
                    className={`w-8 h-2 bg-[#D9D9D9] rounded-[100px] ${currentStep > 1 ? "bg-[var(--color-amber-750)] " : null}`}
                  ></span>
                </div>
              </div>
            </div>

            {currentStep === 1 && (
              <PersonalDetailsOne
                register={register}
                errors={errors}
                setValue={setValue}
              />
            )}

            {currentStep === 2 && (
              <PersonalDetailsTwo
                register={register}
                errors={errors}
                setValue={setValue}
              />
            )}

            <div className="w-full flex flex-col-rever md:flex-row items-center justify-start gap-3 ">
              <Button
                onClick={handlePrev}
                className="flex items-center gap-3 md:w-fit w-full"
                type="button"
                variant="plain"
                design="rounded"
              >
                <Icon icon="solar:arrow-left-linear" width={18} height={18} />
                Go back
              </Button>

              <Button
                onClick={currentStep < 2 ? handleNext : handleSubmit(onSubmit)}
                type="button"
                variant="default"
                design="rounded"
                className="flex items-center gap-3 md:w-fit w-full"
                disabled={!formData}
              >
                {isSubmitting
                  ? "Submitting..."
                  : currentStep < 2
                    ? "Continue"
                    : "Submit"}
                <Icon icon="solar:arrow-right-linear" width={18} height={18} />
              </Button>
            </div>
          </form>
        )}
      </section>

      <ScrollingText />
    </>
  );
}
