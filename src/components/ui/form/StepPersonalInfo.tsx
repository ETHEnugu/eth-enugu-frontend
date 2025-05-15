"use client";
import FormInput from "@/components/common/form/FormInput";
import Dropdown from "@/components/common/dropdown";
import { Button } from "@/components/common/button";
import { ArrowRight } from "lucide-react";
import { countryOptions } from "@/data/countries";
import { useMemo } from "react";
import { FormDataType } from "@/types";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";

interface StepPersonalInfoProps {
  register: UseFormRegister<FormDataType>;
  errors: FieldErrors<FormDataType>;
  setValue: UseFormSetValue<FormDataType>;
  formData: FormDataType;
  onNext: () => void;
}

const StepPersonalInfo = ({
  register,
  errors,
  setValue,
  formData,
  onNext,
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
      <FormInput
        label="Email Address"
        type="email"
        placeholder="johndoe@mail.com"
        {...register("email")}
        error={errors.email?.message}
      />
      <FormInput
        label="WhatsApp Phone Number"
        placeholder="+234 XXXX XXX XXX"
        type="tel"
        {...register("phone")}
        error={errors.phone?.message}
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
      <FormInput
        label="Twitter(X)"
        placeholder="Enter the URL to your X Profile"
        type="url"
        {...register("twitter")}
        error={errors.twitter?.message}
      />
      <FormInput
        label="Linkedin"
        placeholder="Enter the URL to your Linkedin Profile"
        type="url"
        {...register("linkedin")}
        error={errors.linkedin?.message}
      />
      <FormInput
        label="Website"
        placeholder="Enter the URL of your website"
        type="url"
        {...register("website")}
        error={errors.website?.message}
      />
      <Button
        className="bg-orange-500 text-black rounded-full"
        onClick={onNext}
        disabled={
          !formData.fullName ||
          !formData.email ||
          !formData.phone ||
          !formData.location
        }
      >
        <span className="flex items-center gap-2">
          Continue <ArrowRight size={16} />
        </span>
      </Button>
    </div>
  );
};

export default StepPersonalInfo;
