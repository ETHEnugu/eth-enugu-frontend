"use client";
import Dropdown from "@/components/common/dropdown";
import { BuildersResidencyProps } from "@/types";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
  Controller,
  Control,
  UseFormWatch,
} from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import Link from "next/link";

interface StepOtherInfoProps {
  register: UseFormRegister<BuildersResidencyProps>;
  errors: FieldErrors<BuildersResidencyProps>;
  setValue: UseFormSetValue<BuildersResidencyProps>;
  control: Control<BuildersResidencyProps>;
  watch: UseFormWatch<BuildersResidencyProps>;
}

const openOptions = [
  {
    label: "Yes, I am open to it. It will help me bond with others",
    value: true,
  },
  { label: "No, I am not open to it", value: false },
];

const participateInERVOptions = [
  {
    label: "   Yes, I'd love to get involved",
    value: true,
    id: "option1ERV",
  },
  {
    label: "  Not interested",
    value: false,
    id: "option2ERV",
  },
];

const ervInvolvementTypeOptions = [
  {
    label: "  Mentor during the Ethereum Research Village",
    value: "MENTOR_DURING_ERV",
    id: "involvementOption1",
  },
  {
    label: "Learn during the Ethereum Research Village",
    value: "LEARN_DURING_ERV",
    id: "involvementOption2",
  },
];

const BStepThreeDetails = ({
  register,
  errors,
  setValue,
  control,
  watch,
}: StepOtherInfoProps) => {
  const selectedparticipateInERV = watch("participateInERV");

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
            setValue("shareRoom", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          className="text-dark"
          options={openOptions}
        />
        {errors.shareRoom && (
          <p className="text-red-500 text-sm mt-1">
            {errors.shareRoom.message}
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

      <div>
        <label className=" font-bold text-dark text-base mb-1 flex flex-col gap-1">
          <p>
            {" "}
            Would you like to be involved in the Ethereum Research Village?{" "}
            <span className=" text-sm text-[#131313]/70">
              ( A 4 week initiative - 2 weeks during the Pop-up city + 2 weeks
              virtually post EthEnugu &apos;25)
            </span>
            <Link
              href={
                "https://x.com/eth_enugu/status/1926906551274541056?s=46&t=zaDhrGydSI43aMot8l9mIg"
              }
            >
              {" "}
              <span className="underline text-sm text-blue-600">
                See details
              </span>{" "}
            </Link>
          </p>
          <p className="!text-sm my-2 ">
            For: Devs, Technical Writers, Node Runners, Protocol Engineers,
            Researchers & Academic papers
          </p>
        </label>

        <Controller
          control={control}
          name="participateInERV"
          render={({ field }) => (
            <RadioGroup
              onValueChange={(value) => {
                const boolValue = value === "true";
                field.onChange(boolValue);
                setValue("participateInERV", boolValue, {
                  shouldValidate: true,
                });
              }}
              value={field.value?.toString()}
              className="flex flex-col gap-2"
            >
              {participateInERVOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <RadioGroupItem
                    value={option.value.toString()}
                    id={option.id}
                    className="h-3 w-3 rounded-full border border-[#F3A035] data-[state=checked]:border-[#F3A035] data-[state=checked]:bg-[#F3A035] cursor-pointer"
                  />
                  <label htmlFor={option.id} className="cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          )}
        />

        {errors.participateInERV && (
          <p className="text-red-500 text-sm mt-1">
            {errors.participateInERV.message}
          </p>
        )}
      </div>

      {selectedparticipateInERV === true && (
        <div>
          <label className="block font-bold text-dark text-base mb-1">
            How would you like to get involved?
          </label>

          <Controller
            control={control}
            name="ervInvolvement"
            render={({ field }) => (
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue("ervInvolvement", value, { shouldValidate: true });
                }}
                value={field.value}
                className="flex flex-col gap-2"
              >
                {ervInvolvementTypeOptions.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.id}
                      className="h-3 w-3 rounded-full border border-[#F3A035] data-[state=checked]:border-[#F3A035] data-[state=checked]:bg-[#F3A035] cursor-pointer"
                    />
                    <label htmlFor={option.id} className="cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />

          {errors.ervInvolvement && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ervInvolvement.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BStepThreeDetails;
