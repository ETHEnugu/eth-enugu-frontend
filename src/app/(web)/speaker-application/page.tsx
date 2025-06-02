"use client";
import { useState } from "react";
import StepOtherInfo from "@/components/ui/SpeakerForm/StepOtherInfo";
import StepSessionDetails from "@/components/ui/SpeakerForm/StepSessionDetails";
import StepPersonalInfo from "@/components/ui/SpeakerForm/StepPersonalInfo";
import { SpeakerProps } from "@/types";
import { useRouter } from "next/navigation";
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

const SpeakerApplicationForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const { mutate, isPending } = usePostMutation(
    SPEAKER.CREATE,
    "create_builder"
  );

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SpeakerProps>({
    resolver: yupResolver(speakerValidation) as Resolver<SpeakerProps>,
    defaultValues: {
      fullName: "",
      email: "",
      whatsappNumber: "",
      location: "",
      twitterProfile: "",
      linkedinProfile: "",
      website: "",
      sessionType: "",
      sessionLength: "",
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

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const onSubmit = (data: SpeakerProps) => {
    console.log("Submitting...", data);

    mutate(data, {
      onSuccess: () => {
        toast.success("Speaker application submitted successfully");
        router.push("/success");
      },
      onError: (error) => {
        toast.error("Failed to submit application. Please try again.");
        console.error("Submission error:", error);
      },
    });
  };

  return (
    <div className="bg-[url('/bg/bg3.png')] py-16">
      <div className="mx-auto w-[90%] md:w-1/2 p-6 rounded-xl border shadow-md bg-white">
        <div className="border-b-2 mb-10 flex justify-between items-center border-light-dark">
          <h2 className="text-xl font-semibold text-green-550 mb-4">
            {steps[step]}
          </h2>
          <div className="flex justify-center items-center gap-1 mb-5">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index <= step ? "bg-orange-500 w-7" : "bg-gray-300 w-7"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {step === 0 && (
          <StepPersonalInfo
            register={register}
            errors={errors}
            setValue={setValue}
            formData={formData}
            onNext={handleNext}
          />
        )}

        {step === 1 && (
          <StepSessionDetails
            register={register}
            errors={errors}
            setValue={setValue}
            formData={formData}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}

        {step === 2 && (
          <StepOtherInfo
            register={register}
            errors={errors}
            setValue={setValue}
            formData={formData}
            onBack={handleBack}
            submitForm={() => handleSubmit(onSubmit)}
            isSubmitting={isPending}
          />
        )}
      </div>
    </div>
  );
};

export default SpeakerApplicationForm;
