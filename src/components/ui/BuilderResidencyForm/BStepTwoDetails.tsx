"use client";
import Dropdown from "@/components/common/dropdown";
import { BuildersResidencyProps } from "@/types";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";

interface StepTwoInfoProps {
  register: UseFormRegister<BuildersResidencyProps>;
  errors: FieldErrors<BuildersResidencyProps>;
  setValue: UseFormSetValue<BuildersResidencyProps>;
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

const BStepTwoDetails = ({ register, errors, setValue }: StepTwoInfoProps) => {
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

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Share a bit about your background and skills
        </label>
        <textarea
          {...register("backgroundAndSkills")}
          placeholder="Write here..."
          rows={3}
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
