"use client";
import Dropdown from "@/components/common/dropdown";
import { PopupCityProps } from "@/types";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";

interface StepOtherInfoProps {
  register: UseFormRegister<PopupCityProps>;
  errors: FieldErrors<PopupCityProps>;
  setValue: UseFormSetValue<PopupCityProps>;
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

const StepTwoDetails = ({ register, errors, setValue }: StepOtherInfoProps) => {
  return (
    <div className="space-y-7">
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          What days are you likely to attend? (Day 1)
        </label>
        <Dropdown
          placeholder="Select date"
          onValueChange={(selected) =>
            setValue("attendDay1", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
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
            setValue("attendDay2", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
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
              shouldDirty: true,
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
              shouldDirty: true,
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
    </div>
  );
};

export default StepTwoDetails;
