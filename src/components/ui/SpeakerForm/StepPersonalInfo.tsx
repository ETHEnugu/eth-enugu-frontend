"use client";
import FormInput from "@/components/common/form/FormInput";
import Dropdown, { type DropdownOption } from "@/components/common/dropdown";
import { Button } from "@/components/common/button";
import { countryOptions } from "@/data/countries";
import { useEffect, useMemo, useState } from "react";
import type { SpeakerProps } from "@/types";
import {
  type UseFormRegister,
  type UseFormSetValue,
  type FieldErrors,
  Controller,
  type Control,
  type UseFormWatch,
} from "react-hook-form";
import { Icon } from "@iconify/react";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Checkbox } from "../checkbox";
import { State } from "country-state-city";
import Spinner from "@/components/common/spinner";
import { rolesOptions } from "@/data/roles";

interface StepPersonalInfoProps {
  register: UseFormRegister<SpeakerProps>;
  errors: FieldErrors<SpeakerProps>;
  setValue: UseFormSetValue<SpeakerProps>;
  onNext: () => void;
  isValid?: boolean;
  control: Control<SpeakerProps>;
  watch: UseFormWatch<SpeakerProps>;
}

const StepPersonalInfo = ({
  register,
  errors,
  setValue,
  control,
  onNext,
  watch,
  isValid = false,
}: StepPersonalInfoProps) => {
  const options = useMemo(() => countryOptions, []);
  const genderOption = [
    { label: "Male", value: "MALE" },
    { label: "Female", value: "FEMALE" },
    { label: "Rather not say", value: "OTHER" },
  ];

  const participationTypeOptions = [
    {
      label: "Mentor on any of the days during the Pop-up city (Aug 4th-15th)",
      id: "option1",
      value: "MENTOR_ONLY",
    },
    {
      label: "Speak on the Conf/Summit day (Aug 16th)",
      id: "speak-only",
      value: "SPEAK_ONLY",
    },
    {
      label: "Both",
      id: "mentor-only",
      value: "BOTH",
    },
  ];

  const watchedRolesValue = watch("roles") || [];

  const watchedRole = useMemo(
    () => watchedRolesValue,
    [watchedRolesValue.join(",")]
  );

  const watchedCountry = watch("country");
  const watchedState = watch("state");

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
        if (
          watchedState &&
          !stateOptions.find((s) => s.value === watchedState)
        ) {
          setValue("state", "", { shouldValidate: true });
        }
      } else {
        setStatesOptions([]);
        setValue("state", "", { shouldValidate: true });
      }
    }
  }, [watchedCountry, setValue, watchedState]);

  useEffect(() => {
    const hasOther = watchedRole?.includes("OTHER");
    const hasNonOther = watchedRole?.some((r) => r !== "OTHER");

    if (hasOther && hasNonOther) {
      if (watchedRole?.[watchedRole.length - 1] === "OTHER") {
        setValue("roles", ["OTHER"], { shouldValidate: true });
      } else {
        setValue("roles", watchedRole?.filter((r) => r !== "OTHER") || [], {
          shouldValidate: true,
        });
      }
    }
  }, [watchedRole, setValue]);

  useEffect(() => {
    if (!watchedRole.includes("OTHER")) {
      setValue("otherRole", "");
    }
  }, [watchedRole, setValue]);

  return (
    <div className="space-y-7">
      <FormInput
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        {...register("fullName")}
        error={errors.fullName?.message}
        required
        isRequired={true}
      />

      <div className="flex justify-between md:flex-row flex-col gap-2">
        <div className="md:w-lg">
          <FormInput
            label="Email Address"
            type="email"
            placeholder="johndoe@mail.com"
            {...register("email")}
            error={errors.email?.message}
            isRequired={true}
          />
        </div>

        <div className="md:w-2xs w-full">
          <label className="block font-bold text-dark text-base mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Dropdown
                placeholder="Select gender"
                onValueChange={(selected) => {
                  field.onChange(selected.value);
                  setValue("gender", selected.value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                className="text-dark"
                options={genderOption}
                isTypeable={false}
              />
            )}
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
        {...register("whatsappNumber")}
        error={errors.whatsappNumber?.message}
        required
        isRequired={true}
      />

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Country
          <span className="text-red-500"> *</span>
        </label>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <Dropdown
              placeholder="Country of residence"
              onValueChange={(selected) => {
                field.onChange(selected.value);
                setValue("country", selected.value.toString(), {
                  shouldValidate: true,
                });
              }}
              className="text-dark"
              options={options}
              isTypeable={true}
            />
          )}
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

      <div className="flex flex-col gap-3">
        <label
          htmlFor="roleDescriptions"
          className="font-bold text-dark text-base mb-1 flex flex-col gap-[2px] items-start"
        >
          <span>
            Which of these best defines you?{" "}
            <span className="text-red-500">*</span>
          </span>
          <span>Select all that apply (Not just one)</span>
        </label>

        <Controller
          control={control}
          name="roles"
          defaultValue={[]}
          render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full justify-between">
              {rolesOptions.map((roles, index) => {
                const isChecked = field.value?.includes(roles.value);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Checkbox
                      className="border-1 border-[#F3A035] data-[state=checked]:bg-[#F3A035] data-[state=checked]:border-[#F3A035] text-white cursor-pointer"
                      id={roles.value}
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        const value = [...(field.value || [])];
                        if (checked && !value.includes(roles.value)) {
                          const newValue = [...value, roles.value];
                          field.onChange(newValue);
                          setValue("roles", newValue, { shouldValidate: true });
                        } else {
                          const newValue = value.filter(
                            (v) => v !== roles.value
                          );
                          field.onChange(newValue);
                          setValue("roles", newValue, { shouldValidate: true });
                        }
                      }}
                    />
                    <label
                      htmlFor={roles.value}
                      className="cursor-pointer text-sm"
                    >
                      {roles.label}
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        />

        {errors.roles && (
          <p className="text-red-500 text-sm mt-1">{errors.roles.message}</p>
        )}
      </div>

      {watchedRole.includes("OTHER") && (
        <FormInput
          type="text"
          label="Please specify your role"
          {...register("otherRole")}
          error={errors.otherRole?.message}
        />
      )}

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Bio <span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Write your full bio to help us describe you better on our visual fliers and social posts"
          rows={5}
          className="w-full border rounded-lg px-4 py-3 text-lg"
          {...register("bio")}
        />
        {errors.bio && (
          <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
        )}
      </div>

      <FormInput
        label="Twitter (X) or LinkedIn Url"
        placeholder="Enter the URL to your X Profile.  Ensure you start the link with https://"
        type="url"
        {...register("social")}
        error={errors.social?.message}
        isRequired={true}
      />

      <FormInput
        label="Link to your portfolio (Github, Behance etc) "
        placeholder="Enter the URL to your Portfolio. Ensure you start the link with https://"
        type="url"
        {...register("portfolioUrl")}
        error={errors.portfolioUrl?.message}
        isRequired={true}
      />

      <div className=" flex flex-col items-start gap-2 ">
        <p className="block font-bold text-dark text-base mb-1">
          Are you applying to mentor during the Pop-up city OR speak on the
          Conf/Summit day? <span className="text-red-500">*</span>
        </p>

        <Controller
          name="participationType"
          control={control}
          render={({ field }) => (
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                setValue("participationType", value, { shouldValidate: true });
              }}
              value={field.value}
              className="flex flex-col gap-2"
            >
              {participationTypeOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <RadioGroupItem
                    value={option.value}
                    id={option.id}
                    className=" min-h-3 min-w-3 h-3 w-3 rounded-full border border-[#F3A035] data-[state=checked]:border-[#F3A035] data-[state=checked]:bg-[#F3A035] cursor-pointer"
                  />
                  <label htmlFor={option.id} className="cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
        {errors.participationType && (
          <p className="text-red-500 text-sm mt-1">
            {errors.participationType.message}
          </p>
        )}
      </div>

      <Button
        type="button"
        className={`rounded-full transition-all duration-200 ${
          isValid
            ? "bg-orange-500 hover:bg-orange-600 text-black"
            : "bg-gray-300 cursor-not-allowed text-gray-500"
        }`}
        onClick={onNext}
        disabled={!isValid}
      >
        <span className="flex items-center gap-2">
          Continue
          <Icon icon="solar:arrow-right-linear" width="16" height="16" />
        </span>
      </Button>
    </div>
  );
};

export default StepPersonalInfo;
