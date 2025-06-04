"use client";
import Dropdown from "@/components/common/dropdown";
import { Button } from "@/components/common/button";
import { SpeakerProps } from "@/types";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import { Icon } from "@iconify/react";

interface StepOtherInfoProps {
  onBack: () => void;
  onSubmit: () => void; // Changed from submitForm to onSubmit for clarity
  register: UseFormRegister<SpeakerProps>;
  errors: FieldErrors<SpeakerProps>;
  setValue: UseFormSetValue<SpeakerProps>;
  formData: SpeakerProps;
  isSubmitting?: boolean;
  isValid?: boolean; // Added validation prop
}

const arrivalDateOptions = [
  { label: "June 14, 2025", value: "2025-06-14" },
  { label: "June 15, 2025", value: "2025-06-15" },
  { label: "June 16, 2025", value: "2025-06-16" },
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
  onSubmit,
  register,
  errors,
  setValue,
  formData,
  isSubmitting = false,
  isValid = false,
}: StepOtherInfoProps) => {
  // Handle form submission with validation
  const handleSubmit = () => {
    if (!formData.expectedArrivalDate) {
      return; // Let the form validation handle this
    }
    if (formData.willingToSpeakWithoutSupport === undefined) {
      return; // Let the form validation handle this
    }
    onSubmit();
  };

  return (
    <div className="space-y-7">
      {/* Expected Arrival Date */}
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          When do you expect to arrive in Enugu?{" "}
          <span className="text-red-500">*</span>
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

      {/* Information Note */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <p className="block text-base font-medium mb-1">
          <span className="text-green-550 font-bold">Note:</span> While we may
          not be able to cover travel or accommodation for speakers, we&apos;d
          still love to host you if you&apos;re able to attend.
        </p>
      </div>

      {/* Willingness to Speak */}
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Would you still be open to speaking under these conditions?{" "}
          <span className="text-red-500">*</span>
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

      {/* Referral Source */}
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          How did you hear about ETH Enugu &lsquo;25?
        </label>
        <textarea
          {...register("referralSource")}
          placeholder="Write here..."
          rows={3}
          className="w-full border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
        />
        {errors.referralSource && (
          <p className="text-red-500 text-sm mt-1">
            {errors.referralSource.message}
          </p>
        )}
      </div>

      {/* Online Community */}
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
        {errors.joinOnlineCommunity && (
          <p className="text-red-500 text-sm mt-1">
            {errors.joinOnlineCommunity.message}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex md:flex-row flex-col-reverse gap-4 pt-4">
        <Button
          type="button"
          className="bg-white text-black rounded-full border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
          onClick={onBack}
          disabled={isSubmitting}
        >
          <span className="flex items-center gap-2">
            <Icon icon="solar:arrow-left-linear" width="16" height="16" />
            Go Back
          </span>
        </Button>

        <Button
          type="button"
          className={`rounded-full transition-all duration-200 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : isValid
                ? "bg-orange-500 hover:bg-orange-600 text-black"
                : "bg-gray-300 cursor-not-allowed text-gray-500"
          }`}
          onClick={handleSubmit}
          disabled={isSubmitting || !isValid}
        >
          <span className="flex items-center gap-2">
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                Submit Application
                <Icon icon="solar:arrow-right-linear" width="16" height="16" />
              </>
            )}
          </span>
        </Button>
      </div>

      {/* Validation Message */}
      {!isValid && !isSubmitting && (
        <p className="text-amber-600 text-sm text-center mt-2">
          Please complete all required fields before submitting
        </p>
      )}
    </div>
  );
};

export default StepOtherInfo;
