"use client";
import FormInput from "@/components/common/form/FormInput";
import Dropdown from "@/components/common/dropdown";
import { Button } from "@/components/common/button";
import { countryOptions } from "@/data/countries";
import { useMemo } from "react";
import { SpeakerProps } from "@/types";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import { Icon } from "@iconify/react";

interface StepPersonalInfoProps {
  register: UseFormRegister<SpeakerProps>;
  errors: FieldErrors<SpeakerProps>;
  setValue: UseFormSetValue<SpeakerProps>;
  formData: SpeakerProps;
  onNext: () => void;
  isValid?: boolean;
}

const StepPersonalInfo = ({
  register,
  errors,
  setValue,
  // formData,
  onNext,
  isValid = false,
}: StepPersonalInfoProps) => {
  const options = useMemo(() => countryOptions, []);

  return (
    <div className="space-y-7">
      <FormInput
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        {...register("fullName")}
        error={errors.fullName?.message}
        required
      />

      <FormInput
        label="Email Address"
        type="email"
        placeholder="johndoe@mail.com"
        {...register("email")}
        error={errors.email?.message}
        required
      />

      <FormInput
        label="WhatsApp Phone Number"
        placeholder="+234 XXXX XXX XXX"
        type="tel"
        {...register("whatsappNumber")}
        error={errors.whatsappNumber?.message}
        required
      />

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Country, State & City of Residence{" "}
          <span className="text-red-500">*</span>
        </label>
        <Dropdown
          placeholder="Select or type your location"
          onValueChange={(selected) =>
            setValue("location", selected.value.toString(), {
              shouldValidate: true,
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
        label="Twitter(X)"
        placeholder="Enter the URL to your X Profile"
        type="url"
        {...register("twitterProfile")}
        error={errors.twitterProfile?.message}
      />

      <FormInput
        label="LinkedIn"
        placeholder="Enter the URL to your LinkedIn Profile"
        type="url"
        {...register("linkedinProfile")}
        error={errors.linkedinProfile?.message}
      />

      <FormInput
        label="Website"
        placeholder="Enter the URL of your website"
        type="url"
        {...register("website")}
        error={errors.website?.message}
      />

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

      {!isValid && (
        <p className="text-amber-600 text-sm text-center">
          Please complete all required fields before continuing
        </p>
      )}
    </div>
  );
};

export default StepPersonalInfo;
