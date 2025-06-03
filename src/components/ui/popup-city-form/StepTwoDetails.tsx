"use client";
import Dropdown from "@/components/common/dropdown";
import { Button } from "@/components/common/button";
import { PopupCityProps } from "@/types";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
  useFormContext,
} from "react-hook-form";
import { Icon } from "@iconify/react";
import Spinner from "../Spinner";

interface StepOtherInfoProps {
  onBack: () => void;
  onNext: () => void;
  register: UseFormRegister<PopupCityProps>;
  errors: FieldErrors<PopupCityProps>;
  setValue: UseFormSetValue<PopupCityProps>;
  isPending?: boolean;
}

const dateOptions = [
  { label: "August 14, 2025", value: "2025-08-14" },
  { label: "August 15, 2025", value: "2025-08-15" },
  { label: "August 16, 2025", value: "2025-08-16" },
];

const volunteerOptions = [
  { label: "Yes", value: "YES" },
  { label: "No", value: "NO" },
  { label: "Maybe", value: "MAYBE" },
];

const joinOptions = [
  { label: "Yes", value: "YES" },
  { label: "No", value: "NO" },
  { label: "Already a member", value: "ALREADY_MEMBER" },
];

const StepTwoDetails = ({
  onBack,
  onNext,
  register,
  errors,
  setValue,
  isPending,
}: StepOtherInfoProps) => {
  const { trigger } = useFormContext<PopupCityProps>(); // Access form context

  const handleSubmitWithValidation = async () => {
    const stepTwoFields: (keyof PopupCityProps)[] = [
      "attendDay1",
      "attendDay2",
      "freeLunchConsideration",
      "volunteeringInterest",
      "dietaryAccessibilityNeeds",
      "referralSource",
      "joinOnlineCommunity",
    ];

    const isValid = await trigger(stepTwoFields, { shouldFocus: true });

    if (isValid) {
      onNext();
    }
  };

  return (
    <div className="space-y-7">
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          What days are you likely to attend? (Day 1)
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
          What days are you likely to attend? (Day 2)
        </label>
        <Dropdown
          placeholder="Select date"
          onValueChange={(selected) =>
            setValue("attendDay2", selected.value, { shouldValidate: true })
          }
          className="text-dark"
          options={dateOptions}
        />
        {errors.attendDay2 && (
          <p className="text-red-500 text-sm mt-1">
            {errors.attendDay2.message}
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
        {errors.freeLunchConsideration && (
          <p className="text-red-500 text-sm mt-1">
            {errors.freeLunchConsideration.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Would you be open to volunteering or helping during the event?
        </label>
        <Dropdown
          placeholder="Choose Answer"
          onValueChange={(selected) =>
            setValue("volunteeringInterest", selected.value, {
              shouldValidate: true,
            })
          }
          className="text-dark"
          options={volunteerOptions}
        />
        {errors.volunteeringInterest && (
          <p className="text-red-500 text-sm mt-1">
            {errors.volunteeringInterest.message}
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
        {errors.dietaryAccessibilityNeeds && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dietaryAccessibilityNeeds.message}
          </p>
        )}
      </div>
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          How did you hear about ETH Enugu ‘25?
        </label>
        <textarea
          {...register("referralSource")}
          placeholder="Write here..."
          rows={3}
          className="w-full border rounded-lg px-4 py-3 text-lg"
        />
        {errors.referralSource && (
          <p className="text-red-500 text-sm mt-1">
            {errors.referralSource.message}
          </p>
        )}
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
          disabled={isPending}
        >
          <span className="flex items-center gap-2">
            <Icon icon="solar:arrow-left-linear" width="16" height="16" />
            Go Back
          </span>
        </Button>

        <Button
          className="bg-green-550 text-white rounded-full"
          onClick={handleSubmitWithValidation}
          disabled={isPending}
        >
          <span className="flex items-center gap-2">
            {isPending ? <Spinner /> : "Submit"}{" "}
            {!isPending && (
              <Icon icon="solar:arrow-right-linear" width="16" height="16" />
            )}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default StepTwoDetails;
