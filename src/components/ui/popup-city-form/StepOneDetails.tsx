"use client";
import FormInput from "@/components/common/form/FormInput";
import Dropdown from "@/components/common/dropdown";
import { countryOptions } from "@/data/countries";
import { useEffect, useMemo } from "react";
import { PopupCityProps } from "@/types";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
  UseFormWatch,
} from "react-hook-form";

interface StepPersonalInfoProps {
  register: UseFormRegister<PopupCityProps>;
  errors: FieldErrors<PopupCityProps>;
  setValue: UseFormSetValue<PopupCityProps>;
  watch: UseFormWatch<PopupCityProps>;
}

const roleOptions = [
  { label: "Student", value: "STUDENT" },
  { label: "Developer", value: "DEVELOPER" },
  { label: "Designer", value: "DESIGNER" },
  { label: "Entrepreneur", value: "ENTREPRENEUR" },
  { label: "Web3 Enthusiast", value: "WEB3_ENTHUSIAST" },
  { label: "Other", value: "OTHER" },
];

const web3Options = [
  { label: "I’m new", value: "NEW" },
  { label: "I’ve dabbled", value: "DABBLED" },
  { label: "I’m actively building", value: "ACTIVELY_BUILDING" },
];

const genderOption = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

const StepOneDetails = ({
  register,
  errors,
  setValue,
  watch,
}: StepPersonalInfoProps) => {
  const options = useMemo(() => countryOptions, []);

  const currentRole = watch("currentRole");

  useEffect(() => {
    if (currentRole && currentRole !== "OTHER") {
      setValue("otherCurrentRole", "", {
        shouldDirty: false,
        shouldValidate: false,
      });
    }
  }, [currentRole, setValue]);

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

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          What do you currently do?
        </label>
        <Dropdown
          placeholder="Select Role"
          onValueChange={(selected) =>
            setValue("currentRole", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
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

      {currentRole === "OTHER" && (
        <FormInput
          type="text"
          label="Please enter your current role"
          placeholder="e.g. Blockchain Researcher"
          {...register("otherCurrentRole", {
            required: "Please enter your role",
            minLength: {
              value: 3,
              message: "Your response must be at least 10 characters long",
            },
          })}
          error={errors.otherCurrentRole?.message}
        />
      )}

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          How familiar are you with Web3/Ethereum?
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
          isTypeable={true}
        />
        {errors.web3Familiarity && (
          <p className="text-red-500 text-sm mt-1">
            {errors.web3Familiarity.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default StepOneDetails;
