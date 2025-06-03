"use client";
import PopupCityInfo from "@/components/ui/popup-city-form/PopupCityInfo";
import StepOneDetails from "@/components/ui/popup-city-form/StepOneDetails";
import StepTwoDetails from "@/components/ui/popup-city-form/StepTwoDetails";
import { POPUP_CITY } from "@/config/ENDPOINTS";
import { usePostMutation } from "@/hooks/useApi";
import { PopupCityProps } from "@/types";
import { popupCityValidation } from "@/validations/popupCityValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const PopupCity = () => {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
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
    "create_popup"
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
        location: "",
        currentRole: "",
        web3Familiarity: "",
        attendDay1: "",
        attendDay2: "",
        freeLunchConsideration: "",
        volunteeringInterest: "",
        dietaryAccessibilityNeeds: "",
        referralSource: "",
        joinOnlineCommunity: "",
      };

  const methods = useForm<PopupCityProps>({
    resolver: yupResolver(popupCityValidation),
    defaultValues,
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  // const formData = watch();

  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem("popupCityFormData", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  const handleNext = () => updateStepInURL(currentStep + 1);
  const handleBack = () => updateStepInURL(currentStep - 1);

  const onSubmit = async (data: PopupCityProps) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Popup City form submitted succefully");
        router.replace("/success?form=popup");
        methods.reset();
        localStorage.removeItem("popupCityFormData");
      },
    });
  };

  const updateStepInURL = (step: number) => {
    router.push(`?step=${step}`);
  };

  return (
    <div className="bg-[url('/bg/bg3.png')] py-16 px-6">
      <div className="mx-auto md:w-1/2 p-6 rounded-xl border shadow-md bg-white">
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
                      currentStep >= s ? "bg-orange-500 w-7" : "bg-gray-300 w-7"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 0 && <PopupCityInfo onNext={handleNext} />}

          {currentStep === 1 && (
            <StepOneDetails
              register={register}
              errors={errors}
              setValue={setValue}
              onBack={handleBack}
              onNext={handleNext}
            />
          )}
          {currentStep === 2 && (
            <StepTwoDetails
              register={register}
              errors={errors}
              setValue={setValue}
              onBack={handleBack}
              onNext={handleSubmit(onSubmit)}
              isPending={isPending}
            />
          )}
        </FormProvider>
      </div>
    </div>
  );
};

export default PopupCity;
