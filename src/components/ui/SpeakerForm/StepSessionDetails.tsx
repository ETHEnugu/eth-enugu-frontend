"use client";
import Dropdown from "@/components/common/dropdown";
import { Button } from "@/components/common/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FormInput from "@/components/common/form/FormInput";
import { SpeakerProps } from "@/types";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";

interface StepSessionDetailsProps {
  onBack: () => void;
  onNext: () => void;
  register: UseFormRegister<SpeakerProps>;
  errors: FieldErrors<SpeakerProps>;
  setValue: UseFormSetValue<SpeakerProps>;
  formData: SpeakerProps;
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
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Estimated session length
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

      <div className="flex flex-col">
        <label className="block font-bold text-dark text-base mb-1">
          Talk Title
        </label>
        <FormInput
          label=""
          type="text"
          placeholder="Enter your talk title..."
          {...register("talkTitle")}
          error={errors.talkTitle?.message}
        />
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Talk Description
        </label>
        <textarea
          {...register("talkDescription")}
          placeholder="Describe your talk/session in detail..."
          rows={4}
          className="w-full border rounded-lg px-4 py-3 text-lg"
        />
        {errors.talkDescription && (
          <p className="text-red-500 text-sm mt-1">
            {errors.talkDescription.message}
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
      <div className="flex flex-col">
        <label className="block font-bold text-dark text-base mb-1">
          If yes, please share the link:
        </label>
        <FormInput
          label=""
          type="url"
          placeholder="Paste link here..."
          {...register("presentationLink")}
          error={errors.presentationLink?.message}
        />
      </div>
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Do you need any specific setup or tools? (Optional)
        </label>
        <textarea
          {...register("setupRequirements")}
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
            formData.presentationAvailable === undefined ||
            !formData.talkTitle ||
            !formData.talkDescription
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
