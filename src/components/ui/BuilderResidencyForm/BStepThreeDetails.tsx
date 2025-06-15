"use client";
import Dropdown from "@/components/common/dropdown";
import { BuildersResidencyProps } from "@/types";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";

interface StepOtherInfoProps {
  register: UseFormRegister<BuildersResidencyProps>;
  errors: FieldErrors<BuildersResidencyProps>;
  setValue: UseFormSetValue<BuildersResidencyProps>;
}

const openOptions = [
  {
    label: "Yes, I am open to it. It will help me bond with others",
    value: true,
  },
  { label: "No, I am not open to it", value: false },
];
// fix this to the Dropdown,

const BStepThreeDetails = ({
  register,
  errors,
  setValue,
}: StepOtherInfoProps) => {
  return (
    <div className="space-y-7">
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Why do you want to join the ETH Enugu Residency?{" "}
          <span className="text-red-500">*</span>
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
          Are you open to sharing a room with one other person? (We plan to
          house 2 persons per room) <span className="text-red-500">*</span>
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
          options={openOptions}
        />
        {errors.openToCollaboration && (
          <p className="text-red-500 text-sm mt-1">
            {errors.openToCollaboration.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Any dietary or accessibility needs?{" "}
          <span className="text-red-500">*</span>
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
          How did you hear about ETH Enugu ‘25?{" "}
          <span className="text-red-500">*</span>
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
    </div>
  );
};

export default BStepThreeDetails;
