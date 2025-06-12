"use client";
import Dropdown from "@/components/common/dropdown";
import FormInput from "@/components/common/form/FormInput";
import { BuildersResidencyProps } from "@/types";
import { useEffect } from "react";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";

interface StepTwoInfoProps {
  register: UseFormRegister<BuildersResidencyProps>;
  errors: FieldErrors<BuildersResidencyProps>;
  setValue: UseFormSetValue<BuildersResidencyProps>;
  watch: UseFormWatch<BuildersResidencyProps>;
}

const roleOptions = [
  { label: "Developer", value: "DEVELOPER" },
  { label: "Designer", value: "DESIGNER" },
  { label: "Founder", value: "FOUNDER" },
  { label: "Researcher", value: "RESEARCHER" },
  { label: "Other", value: "OTHER" },
];

const buildOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const BStepTwoDetails = ({
  register,
  errors,
  setValue,
  watch,
}: StepTwoInfoProps) => {
  const primaryRole = watch("primaryRole");

  useEffect(() => {
    if (primaryRole && primaryRole !== "OTHER") {
      setValue("otherPrimaryRole", "", {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [primaryRole, setValue]);

  return (
    <div className="space-y-7">
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          What’s your primary role?
        </label>
        <Dropdown
          placeholder="Select role"
          onValueChange={(selected) =>
            setValue("primaryRole", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          className="text-dark"
          options={roleOptions}
        />
        {errors.primaryRole && (
          <p className="text-red-500 text-sm mt-1">
            {errors.primaryRole.message}
          </p>
        )}
      </div>

      {primaryRole === "OTHER" && (
        <FormInput
          type="text"
          label="Please enter your primary role"
          placeholder="e.g. Community Manager"
          {...register("otherPrimaryRole", {
            required: "Please enter your role",
            minLength: {
              value: 3,
              message: "Your response must be at least 10 characters long",
            },
          })}
          error={errors.otherPrimaryRole?.message}
        />
      )}

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Share a bit about your background and skills
        </label>
        <textarea
          {...register("backgroundAndSkills", {
            required: "Please fill in this form ",
            minLength: {
              value: 10,
              message: "Your repsonse must be at least 10 characters",
            },
          })}
          placeholder="Write here..."
          rows={4}
          className="w-full border rounded-lg px-4 py-3 text-lg"
        />
        {errors.backgroundAndSkills && (
          <p className="text-red-500 text-sm mt-1">
            {errors.backgroundAndSkills.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Are you currently building something? (Yes/No — if Yes, tell us more)
        </label>
        <textarea
          {...register("currentlyBuilding")}
          placeholder="Write here..."
          rows={3}
          className="w-full border rounded-lg px-4 py-3 text-lg"
        />
        {errors.currentlyBuilding && (
          <p className="text-red-500 text-sm mt-1">
            {errors.currentlyBuilding.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Have you been part of any builder programs or hackathons before?
        </label>
        <Dropdown
          placeholder="Choose option"
          onValueChange={(selected) =>
            setValue("previousBuilderPrograms", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          className="text-dark"
          options={buildOptions}
        />
        {errors.previousBuilderPrograms && (
          <p className="text-red-500 text-sm mt-1">
            {errors.previousBuilderPrograms.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BStepTwoDetails;
