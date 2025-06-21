"use client";
import { Suspense, useEffect } from "react";
import StepOtherInfo from "@/components/ui/SpeakerForm/StepOtherInfo";
import StepSessionDetails from "@/components/ui/SpeakerForm/StepSessionDetails";
import StepPersonalInfo from "@/components/ui/SpeakerForm/StepPersonalInfo";
import type { SpeakerProps } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { type Resolver, useForm } from "react-hook-form";
import { usePostMutation } from "@/hooks/useApi";
import { SPEAKER } from "@/config/ENDPOINTS";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { speakerValidation } from "@/validations/speakerValidations";
import Spinner from "@/components/common/spinner";

const steps = [
  "Personal Information",
  "Expertise And Session Details",
  "Other Information",
];

const SpeakerForm = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[50vh] ">
          {" "}
          <Spinner />{" "}
        </div>
      }
    >
      <SpeakerApplicationForm />
    </Suspense>
  );
};

const SpeakerApplicationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStep = Number(searchParams.get("step")) || 0;
  const FORM_KEY = "speakerForm";
  const { mutate, isPending } = usePostMutation(
    SPEAKER.CREATE,
    "create_speaker"
  );

  const updateStepInURL = (step: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("step", step.toString());
    router.push(url.toString());
  };

  // Initialize react-hook-form with better error handling
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    control,
    formState: { errors },
  } = useForm<SpeakerProps>({
    resolver: yupResolver(speakerValidation) as Resolver<SpeakerProps>,
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      fullName: "",
      email: "",
      whatsappNumber: "",
      country: "",
      state: "",
      city: "",
      social: "",
      portfolioUrl: "",
      sessionType: "",
      otherSessionType: " ",
      sessionLength: "",
      presentationAvailable: false,
      presentationLink: "",
      talkTitle: "",
      talkDescription: "",
      expectedArrivalDates: [],
      participationType: "",
      gender: "",
      roles: [],
      bio: "",
      otherRole: " ",
      comfortableWithTopicChange: null,
      canMakeItToEnugu: null,
      participateInERV: null,
      ervInvolvement: "",
    },
  });

  const formData = watch();
  console.log(formData);

  // storing form data to local storage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(FORM_KEY) || "{}");
    if (savedData) {
      Object.keys(savedData).forEach((key) => {
        setValue(key as keyof SpeakerProps, savedData[key]);
      });
    }
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem(FORM_KEY, JSON.stringify(formData));
  }, [formData]);

  // Enhanced navigation with validation
  const handleNext = async () => {
    let fieldsToValidate: (keyof SpeakerProps)[] = [];

    if (currentStep === 0) {
      fieldsToValidate = [
        "fullName",
        "email",
        "whatsappNumber",
        "country",
        "state",
        "participationType",
        "gender",
        "bio",
        "roles",
        "social",
        "portfolioUrl",
      ];
    } else if (currentStep === 1) {
      fieldsToValidate = [
        "sessionType",
        "sessionLength",
        "talkTitle",
        "talkDescription",
        "comfortableWithTopicChange",
        "presentationAvailable",
      ];
    }

    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      updateStepInURL(currentStep + 1);
    } else {
      toast.error(
        "Please fill in all required fields correctly before proceeding."
      );
    }
  };

  const handleBack = () => updateStepInURL(currentStep - 1);

  // Optimized form submission
  const onSubmit = async (data: SpeakerProps) => {
    try {
      // Clean up the data before submission
      const cleanedData = {
        ...data,
        // Ensure boolean fields are properly formatted
        presentationAvailable: Boolean(data.presentationAvailable),
        canMakeItToEnugu: Boolean(data.canMakeItToEnugu),
        participateInERV: Boolean(data.participateInERV),
        comfortableWithTopicChange: Boolean(data.comfortableWithTopicChange),

        ervInvolvement:
          data.participateInERV && data.ervInvolvement.trim()
            ? data.ervInvolvement.trim()
            : undefined,
      };

      // Remove any undefined or extra fields that might cause issues
      const { ...finalData } = cleanedData;

      mutate(finalData, {
        onSuccess: () => {
          toast.success("Speaker application submitted successfully!");
          localStorage.removeItem(FORM_KEY);
          // Clear form data
          router.push("/success?form=Speaker");
        },
        onError: (error: unknown) => {
          console.error("Submission error:", error);
          const errorMessage =
            (error as { response?: { data?: { message?: string } } })?.response
              ?.data?.message ||
            (error as Error)?.message ||
            "Failed to submit application. Please try again.";
          toast.error(errorMessage);
        },
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleFormSubmit = async () => {
    const finalStepValid = await trigger([
      "expectedArrivalDates",
      "canMakeItToEnugu",
      "participateInERV",
    ]);

    if (!finalStepValid) {
      toast.error("Please fill up the required fields");
      return;
    }

    handleSubmit(onSubmit)();
  };

  // Check if current step has required fields filled
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0:
        return !!(
          formData.fullName &&
          formData.email &&
          formData.whatsappNumber &&
          formData.country &&
          formData.state &&
          formData.participationType &&
          formData.gender &&
          formData.roles &&
          formData.roles.length > 0 &&
          formData.bio
        );
      case 1:
        return !!(
          formData.sessionType &&
          formData.sessionLength &&
          formData.comfortableWithTopicChange &&
          formData.talkTitle &&
          formData.talkDescription &&
          formData.presentationAvailable !== undefined
        );
      case 2:
        return !!(
          formData.expectedArrivalDates &&
          formData.expectedArrivalDates.length > 0 &&
          formData.canMakeItToEnugu !== undefined &&
          formData.participateInERV !== undefined
        );
      default:
        return false;
    }
  };

  return (
    <div className="bg-[url('/bg/bg3.png')] py-16 min-h-screen">
      <div className="mx-auto md:w-1/2 p-6 rounded-xl md:border shadow-md bg-white">
        {/* Progress Header */}
        <div className="border-b-2 mb-10 flex justify-between items-center border-light-dark">
          <h2 className="text-xl font-semibold text-green-550 mb-4">
            {steps[currentStep]}
          </h2>
          <div className="flex justify-center items-center gap-1 mb-5">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep ? "bg-orange-500 w-7" : "bg-gray-300 w-7"
                }`}
                aria-label={`Step ${index + 1} ${index <= currentStep ? "completed" : "pending"}`}
              />
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {currentStep === 0 && (
            <StepPersonalInfo
              register={register}
              errors={errors}
              setValue={setValue}
              onNext={handleNext}
              isValid={isCurrentStepValid()}
              control={control}
              watch={watch}
            />
          )}

          {currentStep === 1 && (
            <StepSessionDetails
              register={register}
              errors={errors}
              setValue={setValue}
              formData={formData}
              onBack={handleBack}
              onNext={handleNext}
              isValid={isCurrentStepValid()}
              watch={watch}
              control={control}
            />
          )}

          {currentStep === 2 && (
            <StepOtherInfo
              register={register}
              errors={errors}
              setValue={setValue}
              formData={formData}
              onBack={handleBack}
              onSubmit={handleFormSubmit}
              isSubmitting={isPending}
              isValid={isCurrentStepValid()}
              watch={watch}
              control={control}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default SpeakerForm;
