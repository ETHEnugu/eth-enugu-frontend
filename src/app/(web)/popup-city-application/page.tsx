"use client";
import { Button } from "@/components/common/button";
import Spinner from "@/components/common/spinner";
import PopupCityInfo from "@/components/ui/popup-city-form/PopupCityInfo";
import StepOneDetails from "@/components/ui/popup-city-form/StepOneDetails";
import StepTwoDetails from "@/components/ui/popup-city-form/StepTwoDetails";
import { POPUP_CITY } from "@/config/ENDPOINTS";
import { usePostMutation } from "@/hooks/useApi";
import { PopupCityProps } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const PopupCity = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[50vh] ">
          {" "}
          <Spinner />{" "}
        </div>
      }
    >
      <PopupCityPage />
    </Suspense>
  );
};

const PopupCityPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStep = Number(searchParams.get("step")) || 0;

  const { mutate, isPending } = usePostMutation(
    POPUP_CITY.CREATE,
    "create_popup_city"
  );

  const savedData =
    typeof window !== "undefined"
      ? localStorage.getItem("popupCityFormData")
      : null;

  const defaultValues: PopupCityProps = savedData
    ? JSON.parse(savedData)
    : {
        fullName: "",
        email: "",
        gender: "",
        whatsappNumber: "",
        country: "",
        state: "",
        city: "",
        role: [],
        web3Familiarity: "",
        preferredDates: [],
        volunteeringInterest: "",
        dietaryAccessibilityNeeds: "",
        referralSource: "",
        otherRole: "",
        socials: "",
        participateInERV: null,
        ervInvolvement: "",
        portfolioUrl: "",
        isCertificateNeeded: null,
        walletAddress: "",
        joinOnlineCommunity: "YES",
        canAttendIRL: null,
      };

  const methods = useForm<PopupCityProps>({
    defaultValues,
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    setError,
    clearErrors,
    control,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem("popupCityFormData", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  const handleNext = async () => {
    if (currentStep == 0) {
      updateStepInURL(currentStep + 1);
    }
    if (currentStep === 1) {
      const stepOneFields: (keyof PopupCityProps)[] = [
        "fullName",
        "email",
        "gender",
        "whatsappNumber",
        "country",
        "state",
        "socials",
        "portfolioUrl",
        "role",
        "otherRole",
      ];

      const isValid = await trigger(stepOneFields, { shouldFocus: true });

      if (isValid) {
        updateStepInURL(currentStep + 1);
      } else {
        toast.error("Please fill in required fields");
      }
    }
  };

  const handleBack = () => updateStepInURL(currentStep - 1);

  const handleFinalSubmit = handleSubmit(
    (data) => {
      mutate(data, {
        onSuccess: () => {
          toast.success("Popup City form submitted succefully");
          router.replace("/success?form=Popup-city");
          methods.reset();
          localStorage.removeItem("popupCityFormData");
        },
      });
    },
    () => {
      toast.error("Please fill up the required fields");
    }
  );

  const updateStepInURL = (step: number) => {
    router.push(`?step=${step}`);
  };

  return (
    <div className="bg-[url('/bg/bg3.png')] py-16 px-6">
      <div className="mx-auto w-full max-w-3xl p-6 rounded-xl border shadow-md bg-white">
        {currentStep === 0 && <PopupCityInfo onNext={handleNext} />}

        {currentStep > 0 && (
          <FormProvider {...methods}>
            {currentStep !== 0 && (
              <div className="border-b mb-10 flex md:flex-row flex-col justify-between items-center border-light-gray">
                <h2 className="text-base font-semibold text-orange-500 mb-4">
                  Pop-Up City Form
                </h2>
                <div className="flex justify-center items-center gap-1 mb-5">
                  {[1, 2].map((s) => (
                    <div
                      key={s}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentStep >= s
                          ? "bg-orange-500 w-7"
                          : "bg-gray-300 w-7"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <StepOneDetails
                register={register}
                errors={errors}
                setValue={setValue}
                watch={watch}
                control={control}
              />
            )}
            {currentStep === 2 && (
              <StepTwoDetails
                register={register}
                errors={errors}
                setValue={setValue}
                control={control}
                watch={watch}
                setError={setError}
                clearErrors={clearErrors}
              />
            )}
            <div className="flex md:flex-row flex-col-reverse gap-4 mt-5">
              <Button
                className="bg-white text-black rounded-full border border-gray-300"
                onClick={handleBack}
                disabled={isPending}
              >
                <span className="flex items-center gap-2">
                  <Icon icon="solar:arrow-left-linear" width="16" height="16" />
                  Go Back
                </span>
              </Button>

              <Button
                className="bg-green-550 text-white rounded-full"
                onClick={currentStep < 2 ? handleNext : handleFinalSubmit}
                disabled={isPending}
              >
                <span className="flex items-center gap-2">
                  {isPending ? (
                    <Spinner />
                  ) : currentStep < 2 ? (
                    "Continue"
                  ) : (
                    "Submit"
                  )}
                  {!isPending && (
                    <Icon
                      icon="solar:arrow-right-linear"
                      width="16"
                      height="16"
                    />
                  )}
                </span>
              </Button>
            </div>
          </FormProvider>
        )}
      </div>
    </div>
  );
};

export default PopupCity;
