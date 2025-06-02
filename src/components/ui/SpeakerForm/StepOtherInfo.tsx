"use client";
import Dropdown from "@/components/common/dropdown";
import { Button } from "@/components/common/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SpeakerProps } from "@/types";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";

interface StepOtherInfoProps {
  onBack: () => void;
  submitForm: () => void;
  register: UseFormRegister<SpeakerProps>;
  errors: FieldErrors<SpeakerProps>;
  setValue: UseFormSetValue<SpeakerProps>;
  formData: SpeakerProps;
  isSubmitting?: boolean;
}

const arrivalDateOptions = [
  { label: "2025-06-14", value: "2025-06-14" },
  { label: "2025-06-15", value: "2025-06-15" },
  { label: "2025-06-16", value: "2025-06-16" },
];

const yesNoOptions = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

const communityOptions = [
  { label: "Yes, I'd like to join", value: "WANTS_TO_JOIN" },
  { label: "Already a member", value: "ALREADY_MEMBER" },
  { label: "Not interested", value: "NOT_INTERESTED" },
];

const StepOtherInfo = ({
  onBack,
  submitForm,
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
          placeholder="Select or type date - e.g. 2025-06-14, 2025-06-15, 2025-06-16"
          onValueChange={(selected) =>
            setValue("expectedArrivalDate", selected.value.toString(), {
              shouldValidate: true,
            })
          }
          className="text-dark"
          options={arrivalDateOptions}
          isTypeable={true}
        />
        {errors.expectedArrivalDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.expectedArrivalDate.message}
          </p>
        )}
      </div>
      <div>
        <p className="block text-lg font-medium mb-1">
          <span className="text-green-550">Note:</span> While we may not be able
          to cover travel or accommodation for speakers, we&apos;d still love to
          host you if you&apos;re able to attend.
        </p>
      </div>
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Would you still be open to speaking under these conditions?
        </label>
        <Dropdown
          placeholder="Choose option"
          onValueChange={(selected) =>
            setValue(
              "willingToSpeakWithoutSupport",
              selected.value === "true",
              { shouldValidate: true }
            )
          }
          className="text-dark"
          options={yesNoOptions}
        />
        {errors.willingToSpeakWithoutSupport && (
          <p className="text-red-500 text-sm mt-1">
            {errors.willingToSpeakWithoutSupport.message}
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
            setValue("joinOnlineCommunity", selected.value.toString(), {
              shouldValidate: true,
            })
          }
          className="text-dark"
          options={communityOptions}
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
          onClick={submitForm}
          disabled={
            isSubmitting ||
            !formData.expectedArrivalDate ||
            formData.willingToSpeakWithoutSupport === undefined
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
