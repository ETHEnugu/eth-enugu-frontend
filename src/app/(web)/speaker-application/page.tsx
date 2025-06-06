"use client";
import { Suspense } from "react";
import StepOtherInfo from "@/components/ui/SpeakerForm/StepOtherInfo";
import StepSessionDetails from "@/components/ui/SpeakerForm/StepSessionDetails";
import StepPersonalInfo from "@/components/ui/SpeakerForm/StepPersonalInfo";
import { SpeakerProps } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { Resolver, useForm } from "react-hook-form";
import { usePostMutation } from "@/hooks/useApi";
import { SPEAKER } from "@/config/ENDPOINTS";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { speakerValidation } from "@/validations/speakerValidations";

const steps = [
  "Personal Information",
  "Expertise And Session Details",
  "Other Information",
];

const SpeakerForm = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading form...</p>
          </div>
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
    formState: { errors },
  } = useForm<SpeakerProps>({
    resolver: yupResolver(speakerValidation) as Resolver<SpeakerProps>,
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      fullName: "",
      email: "",
      whatsappNumber: "",
      location: "",
      twitterProfile: "",
      linkedinProfile: "",
      website: "",
      sessionType: "TALK",
      sessionLength: "MINUTES_30",
      presentationAvailable: false,
      presentationLink: "",
      setupRequirements: "",
      talkTitle: "",
      talkDescription: "",
      expectedArrivalDate: "",
      willingToSpeakWithoutSupport: false,
      referralSource: "",
      joinOnlineCommunity: "",
    },
  });

  const formData = watch();

  // Enhanced navigation with validation
  const handleNext = async () => {
    let fieldsToValidate: (keyof SpeakerProps)[] = [];

    if (currentStep === 0) {
      fieldsToValidate = ["fullName", "email", "whatsappNumber", "location"];
    } else if (currentStep === 1) {
      fieldsToValidate = [
        "sessionType",
        "sessionLength",
        "talkTitle",
        "talkDescription",
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
      // Validate final step before submission
      const finalStepValid = await trigger([
        "expectedArrivalDate",
        "willingToSpeakWithoutSupport",
      ]);

      if (!finalStepValid) {
        toast.error("Please complete all required fields in the final step.");
        return;
      }

      // Clean up the data before submission
      const cleanedData = {
        ...data,
        // Ensure boolean fields are properly formatted
        presentationAvailable: Boolean(data.presentationAvailable),
        willingToSpeakWithoutSupport: Boolean(
          data.willingToSpeakWithoutSupport
        ),
        // Remove empty optional fields
        twitterProfile: data.twitterProfile?.trim() || null,
        linkedinProfile: data.linkedinProfile?.trim() || null,
        website: data.website?.trim() || null,
        presentationLink: data.presentationLink?.trim() || null,
        setupRequirements: data.setupRequirements?.trim() || null,
        referralSource: data.referralSource?.trim() || null,
      };

      mutate(cleanedData, {
        onSuccess: () => {
          toast.success("Speaker application submitted successfully!");
          // Clear form data
          router.push("/success");
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

  // Check if current step has required fields filled
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0:
        return !!(
          formData.fullName &&
          formData.email &&
          formData.whatsappNumber &&
          formData.location
        );
      case 1:
        return !!(
          formData.sessionType &&
          formData.sessionLength &&
          formData.talkTitle &&
          formData.talkDescription &&
          formData.presentationAvailable !== undefined
        );
      case 2:
        return !!(
          formData.expectedArrivalDate &&
          formData.willingToSpeakWithoutSupport !== undefined
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
              formData={formData}
              onNext={handleNext}
              isValid={isCurrentStepValid()}
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
            />
          )}

          {currentStep === 2 && (
            <StepOtherInfo
              register={register}
              errors={errors}
              setValue={setValue}
              formData={formData}
              onBack={handleBack}
              onSubmit={handleSubmit(onSubmit)}
              isSubmitting={isPending}
              isValid={isCurrentStepValid()}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default SpeakerForm;
