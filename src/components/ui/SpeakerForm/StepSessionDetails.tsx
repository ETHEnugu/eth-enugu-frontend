"use client";
import Dropdown from "@/components/common/dropdown";
import { Button } from "@/components/common/button";
import FormInput from "@/components/common/form/FormInput";
import { SpeakerProps } from "@/types";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import { Icon } from "@iconify/react";

interface StepSessionDetailsProps {
  onBack: () => void;
  onNext: () => void;
  register: UseFormRegister<SpeakerProps>;
  errors: FieldErrors<SpeakerProps>;
  setValue: UseFormSetValue<SpeakerProps>;
  formData: SpeakerProps;
  isValid?: boolean;
}

const sessionOptions = [
  { label: "Talk", value: "TALK" },
  { label: "Panel", value: "PANEL" },
  { label: "Workshop", value: "WORKSHOP" },
  { label: "Fireside Chat", value: "FIRESIDE_CHAT" },
  { label: "Other", value: "OTHER" },
];

const timeOptions = [
  { label: "15 minutes", value: "MINUTES_15" },
  { label: "30 minutes", value: "MINUTES_30" },
  { label: "45 minutes", value: "MINUTES_45" },
  { label: "60 minutes", value: "MINUTES_60" },
];

const slideOptions = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
];

const StepSessionDetails = ({
  onBack,
  onNext,
  register,
  errors,
  setValue,
  formData,
  isValid = false,
}: StepSessionDetailsProps) => {
  return (
    <div className="space-y-7">
      {/* Session Type */}
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          What type of session are you proposing?{" "}
          <span className="text-red-500">*</span>
        </label>
        <Dropdown
          placeholder="Talk, Panel, Workshop, Fireside Chat, Other"
          onValueChange={(selected) =>
            setValue("sessionType", selected.value.toString(), {
              shouldValidate: true,
            })
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

      {/* Session Length */}
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Estimated session length <span className="text-red-500">*</span>
        </label>
        <Dropdown
          placeholder="15, 30, 45, 60 minutes"
          onValueChange={(selected) =>
            setValue("sessionLength", selected.value.toString(), {
              shouldValidate: true,
            })
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

      {/* Talk Title */}
      <div className="flex flex-col">
        <label className="block font-bold text-dark text-base mb-1">
          Talk Title <span className="text-red-500">*</span>
        </label>
        <FormInput
          label=""
          type="text"
          placeholder="Enter your talk title..."
          {...register("talkTitle")}
          error={errors.talkTitle?.message}
        />
      </div>

      {/* Talk Description */}
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Talk Description <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("talkDescription")}
          placeholder="Describe your talk/session in detail..."
          rows={4}
          className="w-full border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
        />
        {errors.talkDescription && (
          <p className="text-red-500 text-sm mt-1">
            {errors.talkDescription.message}
          </p>
        )}
      </div>

      {/* Presentation Available */}
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Is your presentation slide or deck already available?{" "}
          <span className="text-red-500">*</span>
        </label>
        <Dropdown
          placeholder="Select..."
          onValueChange={(selected) =>
            setValue("presentationAvailable", selected.value === "true", {
              shouldValidate: true,
            })
          }
          className="text-dark"
          options={slideOptions}
        />
        {errors.presentationAvailable && (
          <p className="text-red-500 text-sm mt-1">
            {errors.presentationAvailable.message}
          </p>
        )}
      </div>

      {/* Presentation Link - Conditional */}
      {formData.presentationAvailable && (
        <div className="flex flex-col">
          <label className="block font-bold text-dark text-base mb-1">
            Please share the link to your presentation:
          </label>
          <FormInput
            label=""
            type="url"
            placeholder="Paste link here..."
            {...register("presentationLink")}
            error={errors.presentationLink?.message}
          />
        </div>
      )}

      {/* Setup Requirements */}
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Do you need any specific setup or tools? (Optional)
        </label>
        <textarea
          {...register("setupRequirements")}
          placeholder="Write here..."
          rows={4}
          className="w-full border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
        />
        {errors.setupRequirements && (
          <p className="text-red-500 text-sm mt-1">
            {errors.setupRequirements.message}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex md:flex-row flex-col-reverse gap-4 pt-4">
        <Button
          type="button"
          className="bg-white text-black rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
          onClick={onBack}
        >
          <span className="flex items-center gap-2">
            <Icon icon="solar:arrow-left-linear" width="16" height="16" />
            Go Back
          </span>
        </Button>

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

      {!isValid && (
        <p className="text-amber-600 text-sm text-center">
          Please complete all required fields before continuing
        </p>
      )}
    </div>
  );
};

export default StepSessionDetails;
