"use client";

import Dropdown, { DropdownOption } from "@/components/common/dropdown";
import FormInput from "@/components/common/form/FormInput";
import Spinner from "@/components/common/spinner";
import { countryOptions } from "@/data/countries";
import { ConferenceProps } from "@/types";
import { State } from "country-state-city";
import { useEffect, useMemo, useState } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface PersonalDetailsOneProps {
  register: UseFormRegister<ConferenceProps>;
  errors: FieldErrors<ConferenceProps>;
  setValue: UseFormSetValue<ConferenceProps>;
  watch: UseFormWatch<ConferenceProps>;
  control: Control<ConferenceProps>;
}

export default function PersonalDetailsOne({
  register,
  errors,
  setValue,
  watch,
  control,
}: PersonalDetailsOneProps) {
  const options = useMemo(() => countryOptions, []);

  const gender = [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Other", value: "OTHER" },
  ];

  const watchedCountry = watch("country");
  const [statesOptions, setStatesOptions] = useState<DropdownOption[]>([]);

  useEffect(() => {
    if (watchedCountry) {
      const selectedCountry = countryOptions.find(
        (country) => country.value === watchedCountry
      );

      if (selectedCountry && selectedCountry.iso) {
        const fetchedStates = State.getStatesOfCountry(selectedCountry.iso);

        const stateOptions = fetchedStates.map((state) => ({
          label: state.name,
          value: state.name,
        }));

        setStatesOptions(stateOptions);
      }
    }
  }, [watchedCountry, setValue]);

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8">
      <FormInput
        label="Full Name"
        type="text"
        placeholder="Full name"
        isRequired={true}
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
        isRequired={true}
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
        label="Phone Number"
        type="text"
        isRequired={true}
        placeholder="+234 XXXX XXX XXX"
        {...register("whatsappNumber", {
          required: "Your Phone number is required",
          pattern: {
            value:
              /^\+?\d{1,4}?[-.\s]?(\(?\d{1,4}\)?)[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
            message: "Enter a valid phone number",
          },
          minLength: {
            value: 10,
            message: "please a minimum of 10 digits is required",
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
          Country <span className="text-red-500"> *</span>
        </label>
        <Dropdown
          placeholder="Select Location"
          className="text-dark"
          isTypeable={true}
          options={options}
          onValueChange={(selected) =>
            setValue("country", selected.value.toLocaleString(), {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          {...register("country", { required: "Please select a country" })}
        />
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          State
          <span className="text-red-500"> *</span>
        </label>
        {!watchedCountry ? (
          <div className="w-full border rounded-lg px-4 py-3 text-gray-500 bg-gray-100">
            Please select a country first
          </div>
        ) : statesOptions.length === 0 ? (
          <Spinner />
        ) : (
          <Controller
            name="state"
            control={control}
            rules={{ required: "Please select a state" }}
            render={({ field }) => (
              <Dropdown
                key={watchedCountry}
                placeholder="State of residence"
                onValueChange={(selected) => {
                  field.onChange(selected.value);
                  setValue("state", selected.value.toString(), {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                className="text-dark"
                options={statesOptions}
                isTypeable={true}
              />
            )}
          />
        )}
        {errors.state && (
          <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
        )}
      </div>

      <FormInput
        label="City of residence"
        type="text"
        placeholder="eg. Ikorodu, Nsukka etc "
        {...register("city", {
          minLength: {
            value: 3,
            message: "Your response must be at least three character",
          },
        })}
        error={errors.city?.message}
        required={false}
      />

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

      <FormInput
        label="Twitter (X) or LinkedIn Url"
        placeholder="Enter the URL to your X Profile"
        type="url"
        {...register("social", {
          required: "Please enter your social Url",
          pattern: {
            value:
              /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com|linkedin\.com)\/[A-Za-z0-9_/-]+$/,
            message: "Only Twitter (X) or LinkedIn URLs are allowed",
          },
        })}
        error={errors.social?.message}
        isRequired={true}
      />
    </div>
  );
}
