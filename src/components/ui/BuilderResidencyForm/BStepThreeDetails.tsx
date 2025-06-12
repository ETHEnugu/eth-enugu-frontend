"use client";
import Dropdown from "@/components/common/dropdown";
import { BuildersResidencyProps } from "@/types";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";

interface StepOtherInfoProps {
  register: UseFormRegister<BuildersResidencyProps>;
  errors: FieldErrors<BuildersResidencyProps>;
  setValue: UseFormSetValue<BuildersResidencyProps>;
}

const volunteerOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];
const openOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const joinOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const BStepThreeDetails = ({
  register,
  errors,
  setValue,
}: StepOtherInfoProps) => {
  return (
    <div className="space-y-7">
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Why do you want to join the ETH Enugu Residency?
        </label>
        <textarea
          {...register("joinReason", {
            minLength: {
              value: 10,
              message: "Your response must be at least 3 characters long",
            },
          })}
          placeholder="Write here..."
          rows={3}
          className="w-full border rounded-lg px-4 py-3 text-lg"
        />
        {errors.joinReason && (
          <p className="text-red-500 text-sm mt-1">
            {errors.joinReason.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          What would you like to work on during the residency?
        </label>

        <textarea
          placeholder="Write here..."
          rows={4}
          className="w-full border rounded-lg px-4 py-3 text-lg"
          {...register("projectInterest", {
            required: "Please fill in this field",
            minLength: {
              value: 10,
              message: "Your response must be at least 3 characters long",
            },
          })}
        />

        {errors.projectInterest && (
          <p className="text-red-500 text-sm mt-1">
            {errors.projectInterest.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Are you open to collaborating with others?
        </label>
        <Dropdown
          placeholder="Select Option"
          onValueChange={(selected) =>
            setValue("openToCollaboration", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          className="text-dark"
          options={volunteerOptions}
        />
        {errors.openToCollaboration && (
          <p className="text-red-500 text-sm mt-1">
            {errors.openToCollaboration.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Will you need accommodation provided?
        </label>
        <Dropdown
          placeholder="Choose Option"
          onValueChange={(selected) =>
            setValue("needsAccommodation", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          className="text-dark"
          options={openOptions}
        />
        {errors.needsAccommodation && (
          <p className="text-red-500 text-sm mt-1">
            {errors.needsAccommodation.message}
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

export default BStepThreeDetails;
