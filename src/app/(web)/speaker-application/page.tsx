"use client";
import { useState } from "react";
import StepOtherInfo from "@/components/ui/form/StepOtherInfo";
import StepSessionDetails from "@/components/ui/form/StepSessionDetails";
import StepPersonalInfo from "@/components/ui/form/StepPersonalInfo";
import { FormDataType } from "@/types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const steps = [
  "Personal Information",
  "Expertise And Session Details",
  "Other Information",
];

const SpeakerApplicationForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormDataType>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      twitter: "",
      linkedin: "",
      website: "",
      sessionType: "",
      sessionLength: "",
      slideAvailable: "",
      slideLink: "",
      setupNeeds: "",
      arrivalDate: "",
      agreeToSpeak: "",
      referralSource: "",
      joinCommunity: "",
    },
  });

  const formData = watch();

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: FormDataType) => {
    try {
      setIsSubmitting(true);
      console.log("Form submitted with data:", data);
      router.push("/success");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[url('/bg/bg3.png')] py-16">
      <div className="mx-auto md:w-1/2 p-6 rounded-xl md:border shadow-md bg-white">
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
            onNext={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default SpeakerApplicationForm;
