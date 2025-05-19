"use client";
import Dropdown from "@/components/common/dropdown";
import { Button } from "@/components/common/button";
import { PopupCityProps } from "@/types";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import { Icon } from "@iconify/react";

interface StepOtherInfoProps {
  onBack: () => void;
  onNext: () => void;
  register: UseFormRegister<PopupCityProps>;
  errors: FieldErrors<PopupCityProps>;
  setValue: UseFormSetValue<PopupCityProps>;
  isSubmitting?: boolean;
}

const dateOptions = [
  { label: "Aug 14", value: "Aug 14" },
  { label: "Aug 15", value: "Aug 15" },
  { label: "Aug 16", value: "Aug 16" },
];

const vOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const joinOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const StepTwoDetails = ({
  onBack,
  onNext,
  register,
  errors,
  setValue,
  isSubmitting = false,
}: StepOtherInfoProps) => {
  return (
    <div className="space-y-7">
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          What days are you likely to attend?
        </label>
        <Dropdown
          placeholder="Select date"
          onValueChange={(selected) =>
            setValue("attendDay1", selected.value, { shouldValidate: true })
          }
          className="text-dark"
          options={dateOptions}
        />
        {errors.attendDay1 && (
          <p className="text-red-500 text-sm mt-1">
            {errors.attendDay1.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Would you like to be considered for free lunch during the program?
        </label>
        <textarea
          {...register("freeLunchConsideration")}
          placeholder="Write here..."
          rows={3}
          className="w-full border rounded-lg px-4 py-3 text-lg"
        />
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Would you be open to volunteering or helping during the event?
        </label>
        <Dropdown
          placeholder="Choose Answer"
          onValueChange={(selected) =>
            setValue("volunteringInterest", selected.value, {
              shouldValidate: true,
            })
          }
          className="text-dark"
          options={vOptions}
        />
        {errors.volunteringInterest && (
          <p className="text-red-500 text-sm mt-1">
            {errors.volunteringInterest.message}
          </p>
        )}
      </div>
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Any dietary or accessibility needs?
        </label>
        <textarea
          {...register("dietaryAccessibilityNeeds")}
          placeholder="Write here..."
          rows={3}
          className="w-full border rounded-lg px-4 py-3 text-lg"
        />
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
          placeholder="Choose option"
          onValueChange={(selected) =>
            setValue("joinOnlineCommunity", selected.value, {
              shouldValidate: true,
            })
          }
          className="text-dark"
          options={joinOptions}
        />
        {errors.joinOnlineCommunity && (
          <p className="text-red-500 text-sm mt-1">
            {errors.joinOnlineCommunity.message}
          </p>
        )}
      </div>

      <div className="flex md:flex-row flex-col-reverse gap-4">
        <Button
          className="bg-white text-black rounded-full border border-gray-300"
          onClick={onBack}
          disabled={isSubmitting}
        >
          <span className="flex items-center gap-2">
            <Icon icon="solar:arrow-left-linear" width="16" height="16" />
            Go Back
          </span>
        </Button>
        <Button
          className="bg-green-550 text-white rounded-full"
          onClick={onNext}
        >
          <span className="flex items-center gap-2">
            {isSubmitting ? "Submitting..." : "Submit"}{" "}
            {!isSubmitting && (
              <Icon icon="solar:arrow-right-linear" width="16" height="16" />
            )}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default StepTwoDetails;
