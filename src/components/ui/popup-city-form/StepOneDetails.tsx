"use client";
import FormInput from "@/components/common/form/FormInput";
import Dropdown, { DropdownOption } from "@/components/common/dropdown";
import { countryOptions } from "@/data/countries";
import { useEffect, useMemo, useState } from "react";
import { PopupCityProps } from "@/types";
import {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
  UseFormWatch,
  Controller,
  Control,
} from "react-hook-form";
import Spinner from "@/components/common/spinner";
import { State } from "country-state-city";

interface StepPersonalInfoProps {
  register: UseFormRegister<PopupCityProps>;
  errors: FieldErrors<PopupCityProps>;
  setValue: UseFormSetValue<PopupCityProps>;
  watch: UseFormWatch<PopupCityProps>;
  control: Control<PopupCityProps>;
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

const genderOption = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];

const StepOneDetails = ({
  register,
  errors,
  setValue,
  watch,
  control,
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
        setValue("state", "");
      } else {
        setStatesOptions([]);
        setValue("state", "");
      }
    }
  }, [watchedCountry, setValue]);

  return (
    <div className="space-y-7">
      <FormInput
        label="Full Name"
        type="text"
        placeholder="Full Name"
        isRequired={true}
        {...register("fullName")}
        error={errors.fullName?.message}
      />

      <div className="flex justify-between md:flex-row flex-col gap-2">
        <div className="md:w-lg">
          <FormInput
            label="Email Address"
            type="email"
            placeholder="johndoe@mail.com"
            isRequired={true}
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <div className="md:w-2xs w-full">
          <label className="block font-bold text-dark text-base mb-1">
            Gender <span className="text-red-500">*</span>
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
        label="Phone Number"
        placeholder="+234 XXXX XXX XXX"
        type="tel"
        isRequired={true}
        {...register("whatsappNumber")}
        error={errors.whatsappNumber?.message}
      />
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Country <span className="text-red-500">*</span>
        </label>
        <Dropdown
          placeholder="Select Location"
          onValueChange={(selected) =>
            setValue("country", selected.value.toString(), {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          className="text-dark"
          options={options}
          isTypeable={true}
        />
        {errors.country && (
          <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          State
          <span className="text-red-500">*</span>
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
            render={({ field }) => (
              <Dropdown
                key={watchedCountry}
                placeholder="State of residence"
                onValueChange={(selected) => {
                  field.onChange(selected.value);
                  setValue("state", selected.value.toString(), {
                    shouldValidate: true,
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

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          What do you currently do? <span className="text-red-500">*</span>
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

      <FormInput
        label="Twitter(X)"
        type="url"
        placeholder="Enter the URL to your X Profile"
        isRequired={true}
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
          How familiar are you with Web3/Ethereum?{" "}
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
    </div>
  );
};

export default StepOneDetails;
