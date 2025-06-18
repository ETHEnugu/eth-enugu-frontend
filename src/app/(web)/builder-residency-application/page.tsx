"use client";
import { Button } from "@/components/common/button";
import Spinner from "@/components/common/spinner";
import BStepOneDetails from "@/components/ui/BuilderResidencyForm/BStepOneDetails";
import BStepThreeDetails from "@/components/ui/BuilderResidencyForm/BStepThreeDetails";
import BStepTwoDetails from "@/components/ui/BuilderResidencyForm/BStepTwoDetails";
import BuildersInfo from "@/components/ui/BuilderResidencyForm/BuildersInfo";
import { BUILDER_RESIDENCY } from "@/config/ENDPOINTS";
import { usePostMutation } from "@/hooks/useApi";
import { BuildersResidencyProps } from "@/types";
import { buildersResidencyValidation } from "@/validations/buildersResidencyValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const BuildersResidency = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[50vh] flex items-center justify-center ">
          {" "}
          <Spinner />{" "}
        </div>
      }
    >
      <BuildersResidencyPage />
    </Suspense>
  );
};

const BuildersResidencyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStep = Number(searchParams.get("step")) || 0;

  const { mutate, isPending } = usePostMutation(
    BUILDER_RESIDENCY.CREATE,
    "create_builders_residency"
  );

  const savedData =
    typeof window !== "undefined"
      ? localStorage.getItem("BuildersResidencyFormData")
      : null;

  const defaultValues: BuildersResidencyProps = savedData
    ? JSON.parse(savedData)
    : {
        fullName: "",
        email: "",
        gender: "",
        age: "",
        whatsappNumber: "",
        country: "",
        city: "",
        state: "",
        primaryRole: [],
        otherPrimaryRole: "",
        social: "",
        portfolioUrl: "",
        willBeLive: undefined,
        backgroundAndSkills: "",
        currentlyBuilding: "",
        previousBuilderPrograms: [],
        joinReason: "",
        comfortableSharingAccomodation: undefined,
        referralSource: "",
        ervInvolvement: "",
        participateInERV: undefined,
        walletAddress: "",
        needCertificate: undefined,
        hasRegisteredForTheHackathon: undefined,
        githubProfile: "",
        dietaryAccessibilityNeeds: "",
      };

  const methods = useForm<BuildersResidencyProps>({
    resolver: yupResolver(buildersResidencyValidation),
    defaultValues,
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    control,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem("BuildersResidencyFormData", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [methods]);

  const handleNext = async () => {
    if (currentStep == 0) {
      updateStepInURL(currentStep + 1);
    }
    if (currentStep === 1) {
      const stepOneFields: (keyof BuildersResidencyProps)[] = [
        "fullName",
        "email",
        "gender",
        "age",
        "whatsappNumber",
        "country",
        "state",
        "primaryRole",
        "social",
        "portfolioUrl",
      ];

      const isValid = await trigger(stepOneFields, { shouldFocus: true });

      if (isValid) {
        updateStepInURL(currentStep + 1);
      }
    } else if (currentStep == 2) {
      const stepTwoFields: (keyof BuildersResidencyProps)[] = [
        "willBeLive",
        "backgroundAndSkills",
        "currentlyBuilding",
        "previousBuilderPrograms",
      ];

      const isValid = await trigger(stepTwoFields, { shouldFocus: true });

      if (isValid) {
        updateStepInURL(currentStep + 1);
      }
    }
  };

  const handleBack = () => updateStepInURL(currentStep - 1);

  const onSubmit = async (data: BuildersResidencyProps) => {
    const stepThreeFields: (keyof BuildersResidencyProps)[] = [
      "hasRegisteredForTheHackathon",
      "joinReason",
      "comfortableSharingAccomodation",
      "referralSource",
      "needCertificate",
      "participateInERV",
      "dietaryAccessibilityNeeds",
    ];

    const isValid = await trigger(stepThreeFields, { shouldFocus: true });

    if (isValid) {
      mutate(data, {
        onSuccess: () => {
          console.log(data);
          toast.success("Builders Residency form submitted succefully");
          router.replace("/success?form=BuilderResidency");
          methods.reset();
          localStorage.removeItem("BuildersResidencyFormData");
        },
      });
    }
  };

  const updateStepInURL = (step: number) => {
    router.push(`?step=${step}`);
  };

  const formValues = watch();
  console.log(formValues);

  return (
    <div className="bg-[url('/bg/bg3.png')] py-16 px-6">
      <div className="mx-auto md:w-1/2 p-6 rounded-xl border shadow-md bg-white">
        {currentStep === 0 && <BuildersInfo onNext={handleNext} />}

        {currentStep > 0 && (
          <FormProvider {...methods}>
            {currentStep !== 0 && (
              <div className="border-b mb-10 flex md:flex-row flex-col justify-between items-center border-light-gray">
                <h2 className="text-base font-semibold text-green-550 mb-4">
                  Builder’s Residency Form
                </h2>
                <div className="flex justify-center items-center gap-1 mb-5">
                  {[1, 2, 3].map((s) => (
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
              <BStepOneDetails
                register={register}
                errors={errors}
                setValue={setValue}
                watch={watch}
                control={control}
              />
            )}
            {currentStep === 2 && (
              <BStepTwoDetails
                register={register}
                errors={errors}
                control={control}
                setValue={setValue}
                watch={watch}
              />
            )}

            {currentStep === 3 && (
              <BStepThreeDetails
                register={register}
                errors={errors}
                setValue={setValue}
                control={control}
                watch={watch}
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
                className="bg-orange-500 text-dark rounded-full"
                onClick={currentStep < 3 ? handleNext : handleSubmit(onSubmit)}
                disabled={isPending}
              >
                <span className="flex items-center gap-2">
                  {isPending ? (
                    <Spinner />
                  ) : currentStep < 3 ? (
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

export default BuildersResidency;
