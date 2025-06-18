"use client";

import Dropdown from "@/components/common/dropdown";
import FormInput from "@/components/common/form/FormInput";
import { ConferenceProps } from "@/types";
import { useEffect } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Checkbox } from "../checkbox";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { confRolesOptions } from "@/data/confRoles";

interface PersonalDetailsTwoProps {
  register: UseFormRegister<ConferenceProps>;
  errors: FieldErrors<ConferenceProps>;
  setValue: UseFormSetValue<ConferenceProps>;
  setError: UseFormSetError<ConferenceProps>;
  watch: UseFormWatch<ConferenceProps>;
  control: Control<ConferenceProps>;
}

export default function PersonalDetailsTwo({
  errors,
  register,
  setValue,
  watch,
  control,
}: PersonalDetailsTwoProps) {
  const volunteeringOptions = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "No" },
  ];

  const certificateNeeded = [
    {
      label: "Yes",
      value: true,
    },
    {
      label: "No",
      value: false,
    },
  ];
  const web3Options = [
    { label: "newbie (has zero knowledge)", value: "NEW" },
    {
      label: " Intermediate (Heard about it and have learnt deeply about it )",
      value: "DABBLED",
    },
    {
      label: " Pro (I am actively building and use the technology daily)",
      value: "ACTIVELY_BUILDING",
    },
  ];

  const willBeLiveOptions = [
    {
      value: "true",
      id: "willBeLiveYes",
      label:
        "Yes, I will be attending the ETH-Enugu Conference/Summit on the 16th of August 2025.",
    },
    {
      value: "false",
      id: "willBeLiveNo",
      label: " No, I am uncertain yet of my physical presence.",
    },
  ];

  const watchedRole = watch("roleDescription");
  const isCertificateNeeded = watch("certificateNeeded");

  useEffect(() => {
    const hasOther = watchedRole?.includes("OTHER");
    const hasNonOther =
      Array.isArray(watchedRole) && watchedRole.some((r) => r !== "OTHER");

    if (hasOther && hasNonOther) {
      if (watchedRole?.[watchedRole.length - 1] === "OTHER") {
        setValue("roleDescription", ["OTHER"]);
      } else {
        setValue(
          "roleDescription",
          watchedRole?.filter((r) => r !== "OTHER") || []
        );
      }
      if (!hasOther) {
        setValue("otherRole", "");
      }
    }
  }, [watchedRole, setValue]);

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 ">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <p className="block text-base font-medium mb-1">
          <span className="text-green-550 font-extrabold">Note:</span> The
          conference phase is a one-day in-person event happening on the 16th of
          August in Enugu.
        </p>
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-2">
          <span className=" ">
            {" "}
            Can you make it to Enugu IRL for the Conference/Summit?{" "}
            <span className="text-red-500">*</span>{" "}
          </span>
        </label>

        <Controller
          name="willBeLive"
          control={control}
          render={({ field }) => {
            return (
              <RadioGroup
                onValueChange={(value) => field.onChange(value === "true")}
                value={
                  field.value === undefined
                    ? ""
                    : field.value === null
                      ? ""
                      : field.value
                        ? "true"
                        : "false"
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
                      className="min-h-3 min-w-3 h-3 w-3 rounded-full border border-[#F3A035] data-[state=checked]:border-[#F3A035] data-[state=checked]:bg-[#F3A035] cursor-pointer "
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

        {errors.willBeLive && (
          <p className="text-red-500 text-sm mt-1">
            {errors.willBeLive.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          How familiar are you with Web3/Blockchain{" "}
          <span className="text-red-500">*</span>
        </label>
        <Dropdown
          placeholder="Choose Option"
          onValueChange={(selected) =>
            setValue("web3Familiarity", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          className="text-dark"
          options={web3Options}
          isTypeable={false}
        />
        {errors.web3Familiarity && (
          <p className="text-red-500 text-sm mt-1">
            {errors.web3Familiarity.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 ">
        <label
          htmlFor="roleDescriptions"
          className=" font-bold text-dark text-base mb-1 flex flex-col gap-[2px] items-start "
        >
          <span>
            Which of these best defines you?{" "}
            <span className="text-red-500"> *</span>
          </span>
          <span>Select all that apply (Not just one)</span>
        </label>

        <Controller
          control={control}
          name="roleDescription"
          defaultValue={[]}
          render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full  justify-between">
              {confRolesOptions.map((role, index) => {
                const isChecked = field.value?.includes(role.value);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 cursor-pointer "
                  >
                    <Checkbox
                      className="border-1 border-[#F3A035] data-[state=checked]:bg-[#F3A035] data-[state=checked]:border-[#F3A035] text-white cursor-pointer"
                      id={role.value}
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        const value = [...(field.value || [])];
                        if (checked && !value.includes(role.value)) {
                          field.onChange([...value, role.value]);
                        } else {
                          field.onChange(value.filter((v) => v !== role.value));
                        }
                      }}
                    />
                    <label
                      htmlFor={role.value}
                      className="cursor-pointer text-sm"
                    >
                      {role.label}
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        ></Controller>

        {errors.roleDescription && (
          <p className="text-red-500 text-sm mt-1">
            {" "}
            {errors.roleDescription.message}{" "}
          </p>
        )}
      </div>
      {watchedRole?.includes("OTHER") && (
        <FormInput
          type="text"
          label="Please specify your role"
          {...register("otherRole")}
          error={errors.otherRole?.message}
        />
      )}

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          We’ll be minting NFTs for everyone who registers and attends the
          Conference/Summit. Would you like to have the NFT?
          <span className="text-red-500"> *</span>
        </label>
        <Dropdown
          placeholder="Select Option"
          onValueChange={(selected) =>
            setValue("certificateNeeded", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          className="text-dark"
          options={certificateNeeded}
        />
        {errors.certificateNeeded && (
          <p className="text-red-500 text-sm mt-1">
            {errors.certificateNeeded?.message}
          </p>
        )}
      </div>

      {isCertificateNeeded && (
        <div>
          <label
            htmlFor=""
            className="block font-bold text-dark text-base mb-1"
          >
            Please provide the an Ethereum wallet address where you&apos;d like
            your NFT to be sent. <span className="text-red-500"> *</span>
          </label>
          <FormInput
            label=" "
            type="text"
            placeholder="eg. 0x1234abcd..."
            {...register("walletAddress")}
            error={errors.walletAddress?.message}
          />
        </div>
      )}

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Would you be interested in volunteering for the conference?{" "}
          <span className="text-red-500"> *</span>
        </label>
        <Dropdown
          placeholder="Select an option"
          className="text-dark"
          isTypeable={false}
          options={volunteeringOptions}
          onValueChange={(selected) =>
            setValue("openToVolunteer", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          {...register("openToVolunteer", {
            required: "Please selected an option",
          })}
        />
        {errors.openToVolunteer && (
          <p className="text-red-500 text-sm mt-1">
            {errors.openToVolunteer.message}{" "}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          How did you hear about ETH Enugu ‘25?{" "}
          <span className="text-red-500"> *</span>
        </label>
        <textarea
          placeholder="Write here..."
          rows={4}
          className="w-full border rounded-lg px-4 py-3 text-lg"
          {...register("referralSource", {
            required: "Please fill in this field",
            minLength: {
              value: 3,
              message: "Your response must be at least 3 characters long",
            },
          })}
        />
        {errors.referralSource && (
          <p className="text-red-500 text-sm mt-1">
            {errors.referralSource.message}{" "}
          </p>
        )}
      </div>
    </div>
  );
}
