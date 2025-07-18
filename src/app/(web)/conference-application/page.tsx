"use client";

import { Button } from "@/components/common/button";
import Spinner from "@/components/common/spinner";
import ConfInfoBanner from "@/components/ui/Conf-Info-Banner";
import PersonalDetailsOne from "@/components/ui/ConferenceForm/PersonalDetailsOne";
import PersonalDetailsTwo from "@/components/ui/ConferenceForm/PersonalDetailsTwo";
import ScrollingText from "@/components/ui/Scrolling-text";
import { CONFERENCE } from "@/config/ENDPOINTS";
import { usePostMutation } from "@/hooks/useApi";
import { ConferenceProps } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Conference() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[50vh] ">
          {" "}
          <Spinner />{" "}
        </div>
      }
    >
      <Page />
    </Suspense>
  );
}

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStep = Number(searchParams.get("steps")) || 0;
  const FORM_KEY = "conferenceForm";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    trigger,
    reset,
    control,
    formState: { errors },
  } = useForm<ConferenceProps>({
    defaultValues: {
      fullName: "",
      email: "",
      whatsappNumber: "",
      country: "",
      state: "",
      city: "",
      gender: "",
      roleDescription: [],
      otherRole: "",
      openToVolunteer: null,
      certificateNeeded: "",
      referralSource: "",
      social: "",
      web3Familiarity: "",
      willBeLive: null,
    },
    mode: "onChange",
  });

  const formData = watch();

  const handleNext = async () => {
    if (currentStep === 0) {
      updateStepInURL(1);
    }

    if (currentStep === 1) {
      const isStepValid = await trigger([
        "fullName",
        "email",
        "whatsappNumber",
        "country",
        "state",
        "gender",
        "social",
      ]);

      if (isStepValid) {
        updateStepInURL(2);
      } else {
        toast.error("Please fill in the required fields");
      }
    }
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(FORM_KEY) || "{}");
    if (savedData) {
      Object.keys(savedData).forEach((key) => {
        setValue(key as keyof ConferenceProps, savedData[key]);
      });
    }
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem(FORM_KEY, JSON.stringify(formData));
  }, [formData]);

  const handlePrev = () => {
    if (currentStep > 0) updateStepInURL(currentStep - 1);
  };

  const { mutate, isPending } = usePostMutation(
    CONFERENCE.CREATE,
    "create_conference"
  );

  const onSubmit = async (data: ConferenceProps) => {
    console.log("the form data to be submitted:", data);
    mutate(data, {
      onSuccess: () => {
        toast.success("Conference/Summit form submitted successfully");
        router.push("/success?form=Conference");
        localStorage.removeItem(FORM_KEY);
        reset();
      },
    });
  };

  const handleFinalSubmit = async () => {
    const finalStepIsValid = await trigger([
      "willBeLive",
      "web3Familiarity",
      "roleDescription",
      "certificateNeeded",
      "openToVolunteer",
      "referralSource",
    ]);
    if (!finalStepIsValid) {
      toast.error("Please fill up the required fields");
      return;
    }

    handleSubmit(onSubmit)();
  };

  const updateStepInURL = (step: number) => {
    router.push(`?steps=${step}`);
  };

  return (
    <>
      <section className="bg-[url('/conf-sumit-page-bg/AbstractBg.svg')] bg-no-repeat bg-cover min-h-[50vh] flex items-start justify-center py-[60px] px-5 md:py-20 md:px-16">
        {currentStep === 0 && <ConfInfoBanner handleNext={handleNext} />}

        {currentStep > 0 && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full min-w-[300px] md:w-1/2 md:max-w-none bg-[var(--background)] border border-black rounded-2xl flex flex-col gap-10 py-6 px-5 md:p-10"
          >
            <div className="flex justify-between flex-col gap-4 md:flex-row items-center border-b border-gray-300 pb-6">
              <h3 className="text-[var(--color-amber-750)] custom-banner-heading ">
                Conference/Summit ‘25 Form
              </h3>
              <div className="flex gap-1">
                <span
                  className={`   w-8 h-1 md:h-2 rounded-full ${currentStep > 0 ? "bg-[var(--color-amber-750)]" : "bg-gray-300"}`}
                />
                <span
                  className={`w-8 h-1 md:h-2 rounded-full ${currentStep > 1 ? "bg-[var(--color-amber-750)]" : "bg-gray-300"}`}
                />
              </div>
            </div>

            {currentStep === 1 && (
              <PersonalDetailsOne
                register={register}
                errors={errors}
                setValue={setValue}
                watch={watch}
                control={control}
              />
            )}

            {currentStep === 2 && (
              <PersonalDetailsTwo
                register={register}
                errors={errors}
                setValue={setValue}
                setError={setError}
                watch={watch}
                control={control}
              />
            )}

            <div className="flex flex-col-reverse md:flex-row items-center gap-3 w-full">
              <Button
                onClick={handlePrev}
                type="button"
                variant="plain"
                design="rounded"
                className="flex items-center gap-3 md:w-fit w-full"
              >
                <Icon icon="solar:arrow-left-linear" width={18} height={18} />
                Go back
              </Button>

              <Button
                onClick={currentStep < 2 ? handleNext : handleFinalSubmit}
                type="button"
                variant="default"
                design="rounded"
                className="flex items-center gap-3 md:w-fit w-full"
                disabled={isPending}
              >
                {isPending ? (
                  <Spinner />
                ) : currentStep < 2 ? (
                  "Continue"
                ) : (
                  <>
                    Submit{" "}
                    <Icon
                      icon="solar:arrow-right-linear"
                      width={18}
                      height={18}
                    />
                  </>
                )}
              </Button>
            </div>

            {errors.root && (
              <p className="text-red-500 text-sm mt-1">{errors.root.message}</p>
            )}
          </form>
        )}
      </section>

      <ScrollingText />
    </>
  );
}
