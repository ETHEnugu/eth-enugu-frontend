"use client";
import type { BuildersResidencyProps } from "@/types";
import {
  type UseFormRegister,
  type UseFormSetValue,
  type FieldErrors,
  type UseFormWatch,
  Controller,
  type Control,
} from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useRef } from "react";

interface StepTwoInfoProps {
  register: UseFormRegister<BuildersResidencyProps>;
  errors: FieldErrors<BuildersResidencyProps>;
  setValue: UseFormSetValue<BuildersResidencyProps>;
  watch: UseFormWatch<BuildersResidencyProps>;
  control: Control<BuildersResidencyProps>;
}

const buildOptions = [
  {
    label: "Yes, I have been part of a BUILDER RESIDENCY program",
    value: "YES_BUILDER_RESIDENCY",
  },
  {
    label: "Yes, I have been part of a POP-UP CITY in the past",
    value: "YES_POP_CITY",
  },
  {
    label: "Yes, I have been part of hackathons before in the past",
    value: "YES_HACKATHON",
  },
  {
    label: "No, I have not been involved in any",
    value: "NO",
  },
];

const willBeLiveOptions = [
  {
    label:
      "Yes, I will be attending the ETH-Enugu Builder Residency IRL on select days.",
    value: "true",
    id: "will-be-live-yes",
  },
  {
    label:
      "No, I may not be able to attend IRL but I can participate virtually if there are provisions for it.",
    value: "false",
    id: "will-be-live-no",
  },
];

const BStepTwoDetails = ({
  register,
  errors,
  control,
  watch,
  setValue,
}: StepTwoInfoProps) => {
  const selectedBuildOption = watch("previousBuilderPrograms");
  const lastProcessedValue = useRef<string[]>([]);

  useEffect(() => {
    if (
      selectedBuildOption &&
      selectedBuildOption.includes("NO") &&
      JSON.stringify(selectedBuildOption) !==
        JSON.stringify(lastProcessedValue.current) &&
      selectedBuildOption.length > 1
    ) {
      lastProcessedValue.current = ["NO"];
      setValue("previousBuilderPrograms", ["NO"]);
    } else if (selectedBuildOption) {
      lastProcessedValue.current = selectedBuildOption;
    }
  }, [selectedBuildOption, setValue]);

  return (
    <div className="space-y-7">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <p className="block text-base font-medium mb-1">
          <span className="text-green-550 font-extrabold">Note:</span> We&apos;d
          fully cover accommodation and breakfast for two weeks for all 50
          residents whose applications are approved. However we may not be able
          to cover travel cost.
        </p>
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-2">
          Can you make it to Enugu IRL for the Builder Residency?{" "}
          <span className="text-red-500">*</span>
        </label>

        <Controller
          name="willBeLive"
          control={control}
          render={({ field }) => (
            <RadioGroup
              onValueChange={(value) => field.onChange(value === "true")}
              value={
                field.value === undefined ? "" : field.value ? "true" : "false"
              }
              className="flex flex-col gap-2"
            >
              {willBeLiveOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.id}
                    className="h-4 w-4 rounded-full border border-[#F3A035] data-[state=checked]:border-[#F3A035] data-[state=checked]:bg-[#F3A035] cursor-pointer"
                  />
                  <label htmlFor={option.id} className="cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          )}
        />

        {errors.willBeLive && (
          <p className="text-red-500 text-sm mt-1">
            {errors.willBeLive.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <label
          htmlFor="previousBuilderPrograms"
          className="font-bold text-dark text-base mb-1 items-start"
        >
          Have you been part of any builder program, Pop-up city or hackathons
          before?
          <span className="text-red-500">*</span>
        </label>

        <Controller
          control={control}
          name="previousBuilderPrograms"
          defaultValue={[]}
          render={({ field }) => (
            <div className="flex flex-col items-start gap-3 w-full justify-between">
              {buildOptions.map((option, index) => {
                const isChecked = field.value?.includes(option.value);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      className="border-1 border-[#F3A035] data-[state=checked]:bg-[#F3A035] data-[state=checked]:border-[#F3A035] text-white cursor-pointer"
                      id={option.value}
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        if (option.value === "NO") {
                          if (checked) {
                            field.onChange(["NO"]);
                          } else {
                            field.onChange([]);
                          }
                        } else {
                          const currentValue = field.value || [];
                          if (checked && !currentValue.includes(option.value)) {
                            const newValue = currentValue.filter(
                              (v) => v !== "NO"
                            );
                            field.onChange([...newValue, option.value]);
                          } else if (!checked) {
                            field.onChange(
                              currentValue.filter((v) => v !== option.value)
                            );
                          }
                        }
                      }}
                    />
                    <label
                      htmlFor={option.value}
                      className="cursor-pointer text-sm"
                    >
                      {option.label}
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        />

        {errors.previousBuilderPrograms && (
          <p className="text-red-500 text-sm mt-1">
            {errors.previousBuilderPrograms.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Share a bit more about your background and skills{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("backgroundAndSkills", {
            required: "Please fill in this form",
            minLength: {
              value: 10,
              message: "Your response must be at least 10 characters",
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
          Have you currently built something or plan to build during the Pop-up
          city? Share some details about it with us.{" "}
          <span className="text-red-500">*</span>
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
    </div>
  );
};

export default BStepTwoDetails;
