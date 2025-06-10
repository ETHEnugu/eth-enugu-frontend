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
    { label: "16 - 19", value: "AGE_16_19" },
    { label: "20 - 24", value: "AGE_20_24" },
    { label: "25 - 34", value: "AGE_25_34" },
    { label: "35 - 44", value: "AGE_35_44" },
    { label: "45 and above", value: "AGE_45_PLUS" },
  ];

  const gender = [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Other", value: "OTHER" },
  ];

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8">
      <FormInput
        label="Full Name"
        type="text"
        placeholder="Full name"
        {...register("fullName", {
          required: "Your Full Name is required",
          minLength: {
            value: 3,
            message: "Your response must be at least 3 characters long",
          },
        })}
        error={errors.fullName?.message}
      />

      <FormInput
        label="Email Address"
        type="email"
        placeholder="johndoe@mail.com"
        {...register("email", {
          required: "Your Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email format",
          },
        })}
        error={errors.email?.message}
      />

      <FormInput
        label="WhatsApp Phone Number"
        type="text"
        placeholder="+234 XXXX XXX XXX"
        {...register("whatsappNumber", {
          required: "Your WhatsApp number is required",
          pattern: {
            value:
              /^\+?\d{1,4}?[-.\s]?(\(?\d{1,4}\)?)[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
            message: "Enter a valid phone number",
          },
        })}
        onInput={(e) => {
          const input = e.target as HTMLInputElement;
          input.value = input.value.replace(/[^0-9+\s()-]/g, "");
        }}
        inputMode="tel"
        error={errors.whatsappNumber?.message}
      />

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Country, State & City of Residence{" "}
          <span className="text-red-500">*</span>
        </label>
        <Dropdown
          placeholder="Select Location"
          className="text-dark"
          isTypeable={true}
          options={options}
          onValueChange={(selected) =>
            setValue("location", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          {...register("location", { required: "Please add a location" })}
        />
        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
        )}
      </div>

      <div className="w-full flex items-center flex-col md:flex-row gap-3 justify-between">
        <div className="w-full">
          <label className="block font-bold text-dark text-base mb-1">
            Age <span className="text-red-500">*</span>
          </label>
          <Dropdown
            placeholder="Select Age Range"
            className="text-dark"
            isTypeable={false}
            options={ages}
            onValueChange={(selected) =>
              setValue("age", selected.value, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            {...register("age", { required: "Please select an age range " })}
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        <div className="w-full">
          <label className="block font-bold text-dark text-base mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <Dropdown
            placeholder="Select Gender"
            className="text-dark"
            isTypeable={false}
            options={gender}
            onValueChange={(selected) =>
              setValue("gender", selected.value, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            {...register("gender", { required: "Please select an option" })}
          />
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
