"use client";
import FormInput from "@/components/common/form/FormInput";
import Dropdown from "@/components/common/dropdown";
import { countryOptions } from "@/data/countries";
import { useMemo } from "react";
import { BuildersResidencyProps } from "@/types";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";

interface StepPersonalInfoProps {
  register: UseFormRegister<BuildersResidencyProps>;
  errors: FieldErrors<BuildersResidencyProps>;
  setValue: UseFormSetValue<BuildersResidencyProps>;
}

const genderOption = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

const BStepOneDetails = ({
  register,
  errors,
  setValue,
}: StepPersonalInfoProps) => {
  const options = useMemo(() => countryOptions, []);

  return (
    <div className="space-y-7">
      <FormInput
        label="Full Name"
        type="text"
        placeholder="Full Name"
        {...register("fullName")}
        error={errors.fullName?.message}
      />

      <div className="flex justify-between md:flex-row flex-col gap-2">
        <div className="md:w-lg">
          <FormInput
            label="Email Address"
            type="email"
            placeholder="johndoe@mail.com"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div className="md:w-2xs w-full">
          <label className="block font-bold text-dark text-base mb-1">
            Gender
          </label>
          <Dropdown
            placeholder="Select gender"
            onValueChange={(selected) =>
              setValue("gender", selected.value, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            className="text-dark"
            options={genderOption}
            isTypeable={true}
          />
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>
      </div>

      <FormInput
        label="WhatsApp Phone Number"
        placeholder="+234 XXXX XXX XXX"
        type="tel"
        {...register("whatsappNumber")}
        error={errors.whatsappNumber?.message}
      />
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Country, State & City of Residence
        </label>
        <Dropdown
          placeholder="Select Location"
          onValueChange={(selected) =>
            setValue("location", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          className="text-dark"
          options={options}
          isTypeable={true}
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
        )}
      </div>

      <FormInput
        label="Github Profile"
        type="url"
        placeholder="Enter the URL of your Github user page"
        {...register("githubProfile")}
        error={errors.githubProfile?.message}
      />

      <FormInput
        label="Twitter(X)"
        type="url"
        placeholder="Enter the URL to your X Profile"
        {...register("twitterProfile")}
        error={errors.twitterProfile?.message}
      />

      <FormInput
        label="Linkedin"
        type="url"
        placeholder="Enter the URl to your Linkedin Profile"
        {...register("linkedinProfile")}
        error={errors.linkedinProfile?.message}
      />

      <FormInput
        label="Portfolio"
        type="url"
        placeholder="Enter the URL of your Portfolio"
        {...register("portfolioUrl")}
        error={errors.portfolioUrl?.message}
      />
    </div>
  );
};

export default BStepOneDetails;
