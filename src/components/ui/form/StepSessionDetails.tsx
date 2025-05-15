"use client";
import Dropdown from "@/components/common/dropdown";
import { Button } from "@/components/common/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FormInput from "@/components/common/form/FormInput";
import { FormDataType } from "@/types";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";

interface StepSessionDetailsProps {
  onBack: () => void;
  onNext: () => void;
  register: UseFormRegister<FormDataType>;
  errors: FieldErrors<FormDataType>;
  setValue: UseFormSetValue<FormDataType>;
  formData: FormDataType;
}

const sessionOptions = [
  { label: "Talk", value: "Talk" },
  { label: "Panel", value: "Panel" },
  { label: "Workshop", value: "Workshop" },
  { label: "Fireside Chat", value: "Fireside Chat" },
  { label: "Other", value: "Other" },
];

const timeOptions = [
  { label: "15 minutes", value: "15" },
  { label: "30 minutes", value: "30" },
  { label: "45 minutes", value: "45" },
  { label: "60 minutes", value: "60" },
];

const slideOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const StepSessionDetails = ({
  onBack,
  onNext,
  register,
  errors,
  setValue,
  formData,
}: StepSessionDetailsProps) => {
  return (
    <div className="space-y-7">
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          What type of session are you proposing?
        </label>
        <Dropdown
          placeholder="Talk, Panel, Workshop, Fireside Chat, Other"
          onValueChange={(selected) =>
            setValue("sessionType", selected.value, { shouldValidate: true })
          }
          className="text-dark"
          options={sessionOptions}
          isTypeable={true}
        />
        {errors.sessionType && (
          <p className="text-red-500 text-sm mt-1">
            {errors.sessionType.message}
          </p>
        )}
      </div>
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Estimated session length
        </label>
        <Dropdown
          placeholder="15, 30, 45, 60 minutes"
          onValueChange={(selected) =>
            setValue("sessionLength", selected.value, { shouldValidate: true })
          }
          className="text-dark"
          options={timeOptions}
        />
        {errors.sessionLength && (
          <p className="text-red-500 text-sm mt-1">
            {errors.sessionLength.message}
          </p>
        )}
      </div>
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Is your presentation slide or deck already available?
        </label>
        <Dropdown
          placeholder="Select..."
          onValueChange={(selected) =>
            setValue("slideAvailable", selected.value, { shouldValidate: true })
          }
          className="text-dark"
          options={slideOptions}
        />
        {errors.slideAvailable && (
          <p className="text-red-500 text-sm mt-1">
            {errors.slideAvailable.message}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="block font-bold text-dark text-base mb-1">
          If yes, please share the link:
        </label>
        <FormInput
          label=""
          type="url"
          placeholder="Paste link here..."
          {...register("slideLink")}
          error={errors.slideLink?.message}
        />
      </div>
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Do you need any specific setup or tools? (Optional)
        </label>
        <textarea
          {...register("setupNeeds")}
          placeholder="Write here..."
          rows={4}
          className="w-full border rounded-lg px-4 py-3 text-lg"
        />
      </div>
      <div className="flex gap-4">
        <Button
          className="bg-white text-black rounded-full border border-gray-300"
          onClick={onBack}
        >
          <span className="flex items-center gap-2">
            <ArrowLeft size={16} /> Go Back
          </span>
        </Button>
        <Button
          className="bg-orange-500 text-black rounded-full"
          onClick={onNext}
          disabled={
            !formData.sessionType ||
            !formData.sessionLength ||
            !formData.slideAvailable
          }
        >
          <span className="flex items-center gap-2">
            Continue <ArrowRight size={16} />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default StepSessionDetails;
