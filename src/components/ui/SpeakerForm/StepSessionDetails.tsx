"use client";
import Dropdown from "@/components/common/dropdown";
import { Button } from "@/components/common/button";
import FormInput from "@/components/common/form/FormInput";
import type { SpeakerProps } from "@/types";
import {
  type UseFormRegister,
  type UseFormSetValue,
  type FieldErrors,
  type UseFormWatch,
  Controller,
  type Control,
} from "react-hook-form";
import { Icon } from "@iconify/react";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { useEffect } from "react";

interface StepSessionDetailsProps {
  onBack: () => void;
  onNext: () => void;
  register: UseFormRegister<SpeakerProps>;
  errors: FieldErrors<SpeakerProps>;
  setValue: UseFormSetValue<SpeakerProps>;
  formData: SpeakerProps;
  isValid?: boolean;
  watch: UseFormWatch<SpeakerProps>;
  control: Control<SpeakerProps>;
}

const sessionOptions = [
  { label: "Talk", value: "TALK" },
  { label: "Panel", value: "PANEL" },
  { label: "Workshop", value: "WORKSHOP" },
  { label: "Fireside Chat", value: "FIRESIDE_CHAT" },
  { label: "Other", value: "OTHER" },
];

const timeOptions = [
  { label: "5 minutes", value: "MINUTES_5" },
  { label: "10 minutes", value: "MINUTES_10" },
  { label: "15 minutes", value: "MINUTES_15" },
  { label: "30 minutes", value: "MINUTES_30" },
  { label: "45 minutes", value: "MINUTES_45" },
  { label: "60 minutes", value: "MINUTES_60" },
];

const slideOptions = [
  { label: "Yes, it is", value: "true" },
  { label: "No, not yet", value: "false" },
];

const comfortableWithTopicChangeOptions = [
  {
    label:
      "  Yes, I am flexible and open to having the topic and time adjusted if need be",
    value: true,
    id: "yes-I-am",
  },
  {
    label:
      "    No, I can only speak/mentor on the topic and timeframe I entered",
    value: false,
    id: "no-I-am-not",
  },
];

const StepSessionDetails = ({
  onBack,
  onNext,
  register,
  errors,
  setValue,
  formData,
  watch,
  control,
  isValid = false,
}: StepSessionDetailsProps) => {
  const sessionType = watch("sessionType");

  useEffect(() => {
    if (sessionType !== "OTHER") {
      setValue("otherSessionType", "");
    }
  }, [sessionType, setValue]);

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

      {sessionType === "OTHER" && (
        <FormInput
          label="Please input session type"
          type="text"
          {...register("otherSessionType")}
          error={errors.otherSessionType?.message}
        />
      )}

      {/* Session Length */}
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Estimated session length <span className="text-red-500">*</span>
        </label>
        <Dropdown
          placeholder="5, 10, 15, 30, 45, 60 minutes"
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

      <div className="flex flex-col gap-[2px]">
        <label className="block font-bold text-dark text-base ">
          We will send you a response if you are approved to speak or mentor.{" "}
          <span className="text-[#131313]/80 ">
            {" "}
            However, as the dates draw near, it is also likely that the topic
            you submit and its duration might be adjusted
          </span>{" "}
          a bit to align more with the event&apos;s focus.{" "}
          <span className="text-red-500">*</span>
        </label>
        <span className="my-3 block font-bold text-dark text-base mb-1">
          {" "}
          Are you comfortable with this?
        </span>
        <Controller
          name="comfortableWithTopicChange"
          control={control}
          render={({ field }) => (
            <RadioGroup
              onValueChange={(value) => field.onChange(value === "true")}
              value={
                field.value === undefined
                  ? ""
                  : field.value === null
                    ? ""
                    : field.value
                      ? "true"
                      : "false"
              }
              className="flex flex-col gap-2"
            >
              {comfortableWithTopicChangeOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <RadioGroupItem
                    value={option.value.toString()}
                    id={option.id}
                    className="min-h-3 min-w-3 w-3 h-3 rounded-full border border-[#F3A035] data-[state=checked]:border-[#F3A035] data-[state=checked]:bg-[#F3A035] cursor-pointer"
                  />
                  <label htmlFor={option.id} className="cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
        {errors.comfortableWithTopicChange && (
          <p className="text-red-500 text-sm mt-1">
            {errors.comfortableWithTopicChange.message}
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
    </div>
  );
};

export default StepSessionDetails;
