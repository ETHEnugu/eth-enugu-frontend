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
import { rolesOptions } from "@/data/roles";
import { Checkbox } from "../checkbox";

interface StepPersonalInfoProps {
  register: UseFormRegister<PopupCityProps>;
  errors: FieldErrors<PopupCityProps>;
  setValue: UseFormSetValue<PopupCityProps>;
  watch: UseFormWatch<PopupCityProps>;
  control: Control<PopupCityProps>;
}

const genderOption = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Rather not say", value: "PREFER_NOT_TO_SAY" },
];

const StepOneDetails = ({
  register,
  errors,
  setValue,
  watch,
  control,
}: StepPersonalInfoProps) => {
  const options = useMemo(() => countryOptions, []);

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

  const watchedRole = watch("role");
  useEffect(() => {
    const hasOther = watchedRole?.includes("OTHER");
    const hasNonOther =
      Array.isArray(watchedRole) && watchedRole.some((r) => r !== "OTHER");

    if (hasOther && hasNonOther) {
      if (watchedRole?.[watchedRole.length - 1] === "OTHER") {
        setValue("role", ["OTHER"]);
      } else {
        setValue("role", watchedRole?.filter((r) => r !== "OTHER") || []);
      }
    }

    if (!hasOther) {
      setValue("otherRole", "");
    }
  }, [watchedRole, setValue]);

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
              setValue("gender", selected.value.toString(), {
                shouldValidate: true,
                shouldDirty: true,
              })
            }
            className="text-dark"
            options={genderOption}
            isTypeable={false}
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

      <FormInput
        label="City of residence"
        type="text"
        placeholder="eg. Ikorodu, Nsukka etc "
        {...register("city")}
        error={errors.city?.message}
        required={false}
      />

      <div className="flex flex-col gap-3 ">
        <label
          htmlFor="roleDescriptions"
          className=" font-bold text-dark text-base mb-1 flex flex-col gap-[2px] items-start "
        >
          <span>
            Which of these best defines you?{" "}
            <span className="text-red-500">*</span>
          </span>
          <span>Select all that apply (Not just one)</span>
        </label>

        <Controller
          control={control}
          name="role"
          defaultValue={[]}
          render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full  justify-between">
              {rolesOptions.map((role, index) => {
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

        {errors.role && (
          <p className="text-red-500 text-sm mt-1"> {errors.role.message} </p>
        )}
      </div>
      {watchedRole?.includes("OTHER") && (
        <FormInput
          type="text"
          label="Please specify your role"
          {...register("otherRole")}
          error={errors.otherRole?.message}
          isRequired={true}
        />
      )}

      <FormInput
        label="Twitter (X) or LinkedIn Url"
        type="url"
        placeholder="Enter the URL to your X Profile"
        isRequired={true}
        {...register("socials")}
        error={errors.socials?.message}
      />

      <div>
        <label htmlFor="" className="block font-bold text-dark text-base mb-1">
          Link to your portfolio{" "}
          <span className=" text-[#131313]/70 ">
            (Github, Behance etc) <span className="text-red-500"> *</span>
          </span>
        </label>
        <FormInput
          label=" "
          type="url"
          placeholder="Enter the URL of your Portfolio"
          {...register("portfolioUrl")}
          error={errors.portfolioUrl?.message}
        />
      </div>
    </div>
  );
};

export default StepOneDetails;
