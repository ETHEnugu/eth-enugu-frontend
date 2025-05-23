"use client";

import Dropdown from "@/components/common/dropdown";
import FormInput from "@/components/common/form/FormInput";
import { countryOptions } from "@/data/countries";
import { ConferenceProps } from "@/types";
import { useMemo } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface PersonalDetailsOneProps {
  register: UseFormRegister<ConferenceProps>;
  errors: FieldErrors<ConferenceProps>;
  setValue: UseFormSetValue<ConferenceProps>;
}

export default function PersonalDetailsOne({
  register,
  errors,
  setValue,
}: PersonalDetailsOneProps) {
  const options = useMemo(() => countryOptions, []);

  const ages = [
    { label: "Under 18", value: "Under 18" },
    { label: "18 - 24", value: "18 - 24" },
    { label: "25 - 34", value: "25 - 34" },
    { label: "35 - 44", value: "35 - 44" },
    { label: "45 - 54", value: "45 - 54" },
    { label: "55 - 64", value: "55 - 64" },
    { label: "65 and above", value: "65 and above" },
  ];

  const gender = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  return (
    <div className="w-full flex flex-col gap-8 ">
      <FormInput
        label="Full Name"
        type="text"
        placeholder="Full name"
        {...register("fullName")}
        error={errors.fullName?.message}
      />

      <FormInput
        label="Email Address"
        type="email"
        placeholder="johndoe@mail.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <FormInput
        label="WhatsApp Phone Number"
        type="text"
        placeholder="+234 XXXX XXX XXX"
        {...register("whatsappNumber")}
        error={errors.whatsappNumber?.message}
      />

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Country, State & City of Residence
        </label>
        <Dropdown
          placeholder="Select Location"
          className="text-dark"
          isTypeable={true}
          options={options}
          onValueChange={(selected) =>
            setValue("location", selected.value, { shouldValidate: true })
          }
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">
            {errors.location.message}{" "}
          </p>
        )}
      </div>

      <div className="w-full flex items-center gap-3 justify-between">
        <div className="w-full">
          <label className="block font-bold text-dark text-base mb-1">
            Age
          </label>
          <Dropdown
            placeholder="16 - 19"
            className="text-dark"
            isTypeable={false}
            options={ages}
            onValueChange={(selected) =>
              setValue("age", selected.value, { shouldValidate: true })
            }
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message} </p>
          )}
        </div>

        <div className="w-full">
          <label className="block font-bold text-dark text-base mb-1">
            Gender
          </label>
          <Dropdown
            placeholder="Male"
            className="text-dark"
            isTypeable={false}
            options={gender}
            onValueChange={(selected) =>
              setValue("gender", selected.value, { shouldValidate: true })
            }
          />
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">
              {errors.gender.message}{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
