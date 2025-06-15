"use client";
import Dropdown from "@/components/common/dropdown";
import { BuildersResidencyProps } from "@/types";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
  UseFormWatch,
  Controller,
  Control,
} from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";

interface StepTwoInfoProps {
  register: UseFormRegister<BuildersResidencyProps>;
  errors: FieldErrors<BuildersResidencyProps>;
  setValue: UseFormSetValue<BuildersResidencyProps>;
  watch: UseFormWatch<BuildersResidencyProps>;
  control: Control<BuildersResidencyProps>;
}

const buildOptions = [
  {
    label: "Yes, I have been part of a builder resisdency/program",
    value: true,
  },
  { label: "Yes, I have been part of a Pop-up city in the past", value: true },
  {
    label: "Yes, I have been part of hackathons before in the past",
    value: true,
  },
  { label: "No, I have not been involved in any", value: false },
];

const canAttendIRLOptions = [
  {
    label: (
      <>
        {" "}
        Yes, I will be attending the ETH-Enugu Builder Residency IRL on select
        days.
      </>
    ),
    value: "YES",
    id: "option1IRL",
  },
  {
    label:
      " No, I may not be able to attend IRL but I can participate if there are provisions for it.",
    value: "NO",
    id: "option2IRl",
  },
];

const BStepTwoDetails = ({
  register,
  errors,
  setValue,
  control,
}: StepTwoInfoProps) => {
  return (
    <div className="space-y-7">
      <div>
        <label className="block font-bold text-dark text-base mb-2">
          <span className=" ">
            {" "}
            Can you make it to Enugu IRL for the Builder Residency ?{" "}
            <span className="text-red-500">*</span>{" "}
          </span>
        </label>

        <Controller
          name="canAttendIRL"
          control={control}
          render={({ field }) => {
            return (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col gap-2"
              >
                {canAttendIRLOptions.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.id}
                      className="h-3 w-3 rounded-full border border-[#F3A035] data-[state=checked]:border-[#F3A035] data-[state=checked]:bg-[#F3A035] cursor-pointer "
                    />
                    <label htmlFor={option.id} className="cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            );
          }}
        ></Controller>

        {errors.canAttendIRL && (
          <p className="text-red-500 text-sm mt-1">
            {errors.canAttendIRL.message}
          </p>
        )}
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <p className="block text-base font-medium mb-1">
          <span className="text-green-550 font-extrabold">Note:</span> We&apos;d
          fully cover accomodation and breakfast for two weeks for all 50
          residents who&apos;s applications are approved. However we may not be
          able to cover travel cost.
        </p>
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Share a bit more about your background and skills{" "}
          <span className="text-red-500">*</span>
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

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Have you been part of any builder programs, Pop-up city or hackathons
          before? <span className="text-red-500">*</span>
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
