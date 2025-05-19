"use client";
import FormInput from "@/components/common/form/FormInput";
import Dropdown from "@/components/common/dropdown";
import { Button } from "@/components/common/button";
import { countryOptions } from "@/data/countries";
import { useMemo } from "react";
import { PopupCityProps } from "@/types";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import { Icon } from "@iconify/react";

interface StepPersonalInfoProps {
  register: UseFormRegister<PopupCityProps>;
  errors: FieldErrors<PopupCityProps>;
  setValue: UseFormSetValue<PopupCityProps>;
  formData: PopupCityProps;
  onNext: () => void;
  onBack: () => void;
}

const roleOptions = [
  { label: "Student", value: "Student" },
  { label: "Developer", value: "Developer" },
  { label: "Designer", value: "Designer" },
  { label: "Entrepreneur", value: "Entrepreneur" },
  { label: "Web3 Enthusiast", value: "Web3 Enthusiast" },
  { label: "Other", value: "Other" },
];

const web3Options = [
  { label: "I’m new", value: "new" },
  { label: "I’ve dabbled", value: "dabbled" },
  { label: "I’m actively building", value: "building" },
];

const genderOption = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

const StepOneDetails = ({
  register,
  errors,
  setValue,
  formData,
  onNext,
  onBack,
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
              setValue("gender", selected.value, { shouldValidate: true })
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
            setValue("location", selected.value, { shouldValidate: true })
          }
          className="text-dark"
          options={options}
          isTypeable={true}
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          What do you currently do?
        </label>
        <Dropdown
          placeholder="Select Role"
          onValueChange={(selected) =>
            setValue("currentRole", selected.value, { shouldValidate: true })
          }
          className="text-dark"
          options={roleOptions}
          isTypeable={true}
        />
        {errors.currentRole && (
          <p className="text-red-500 text-sm mt-1">
            {errors.currentRole.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          How familiar are you with Web3/Ethereum?
        </label>
        <Dropdown
          placeholder="Choose Option"
          onValueChange={(selected) =>
            setValue("web3Familiarity", selected.value, {
              shouldValidate: true,
            })
          }
          className="text-dark"
          options={web3Options}
          isTypeable={true}
        />
        {errors.web3Familiarity && (
          <p className="text-red-500 text-sm mt-1">
            {errors.web3Familiarity.message}
          </p>
        )}
      </div>

      <div className="flex   md:flex-row flex-col-reverse gap-4">
        <Button
          className="bg-white text-black rounded-full border border-gray-300"
          onClick={onBack}
        >
          <span className="flex items-center gap-2">
            <Icon icon="solar:arrow-left-linear" width="16" height="16" /> Go
            Back
          </span>
        </Button>
        <Button
          className="bg-green-550 text-white rounded-full"
          onClick={onNext}
          disabled={
            !formData.email || !formData.whatsappNumber || !formData.gender
          }
        >
          <span className="flex items-center gap-2">
            Continue{" "}
            <Icon icon="solar:arrow-right-linear" width="16" height="16" />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default StepOneDetails;
