"use client";
import Dropdown from "@/components/common/dropdown";
import { Button } from "@/components/common/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SpeakerProps } from "@/types";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";

interface StepOtherInfoProps {
  onBack: () => void;
  onNext: () => void;
  register: UseFormRegister<SpeakerProps>;
  errors: FieldErrors<SpeakerProps>;
  setValue: UseFormSetValue<SpeakerProps>;
  formData: SpeakerProps;
  isSubmitting?: boolean;
}

const sessionOptions = [
  { label: "Aug 14", value: "Aug 14" },
  { label: "Aug 15", value: "Aug 15" },
  { label: "Aug 16", value: "Aug 16" },
];

const timeOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const slideOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const StepOtherInfo = ({
  onBack,
  onNext,
  register,
  errors,
  setValue,
  formData,
  isSubmitting = false,
}: StepOtherInfoProps) => {
  return (
    <div className="space-y-7">
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          When do you expect to arrive in Enugu?
        </label>
        <Dropdown
          placeholder="Select or type date – e.g. Aug 14, 15, 16"
          onValueChange={(selected) =>
            setValue("arrivalDate", selected.value, { shouldValidate: true })
          }
          className="text-dark"
          options={sessionOptions}
        />
        {errors.arrivalDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.arrivalDate.message}
          </p>
        )}
      </div>
      <div>
        <p className="block text-lg font-medium mb-1">
          <span className="text-green-550">Note:</span> While we may not be able
          to cover travel or accommodation for speakers, we’d still love to host
          you if you’re able to attend.
        </p>
      </div>
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Would you still be open to speaking under these conditions?
        </label>
        <Dropdown
          placeholder="Choose option"
          onValueChange={(selected) =>
            setValue("agreeToSpeak", selected.value, { shouldValidate: true })
          }
          className="text-dark"
          options={timeOptions}
        />
        {errors.agreeToSpeak && (
          <p className="text-red-500 text-sm mt-1">
            {errors.agreeToSpeak.message}
          </p>
        )}
      </div>
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          How did you hear about ETH Enugu &lsquo;25?
        </label>
        <textarea
          {...register("referralSource")}
          placeholder="Write here..."
          rows={3}
          className="w-full border rounded-lg px-4 py-3 text-lg"
        />
      </div>
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Would you like to join the ETH Enugu online community
          (Telegram/WhatsApp)?
        </label>
        <Dropdown
          placeholder="Select Option"
          onValueChange={(selected) =>
            setValue("joinCommunity", selected.value, { shouldValidate: true })
          }
          className="text-dark"
          options={slideOptions}
        />
      </div>
      <div className="flex gap-4">
        <Button
          className="bg-white text-black rounded-full border border-gray-300"
          onClick={onBack}
          disabled={isSubmitting}
        >
          <span className="flex items-center gap-2">
            <ArrowLeft size={16} /> Go Back
          </span>
        </Button>
        <Button
          className="bg-orange-500 text-black rounded-full"
          onClick={onNext}
          disabled={
            isSubmitting || !formData.arrivalDate || !formData.agreeToSpeak
          }
        >
          <span className="flex items-center gap-2">
            {isSubmitting ? "Submitting..." : "Submit"}{" "}
            {!isSubmitting && <ArrowRight size={16} />}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default StepOtherInfo;
