"use client";
import { Button } from "@/components/common/button";
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
import Spinner from "@/components/common/spinner";
import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import Link from "next/link";

interface StepOtherInfoProps {
  onBack: () => void;
  onSubmit: () => void; // Changed from submitForm to onSubmit for clarity
  register: UseFormRegister<SpeakerProps>;
  errors: FieldErrors<SpeakerProps>;
  setValue: UseFormSetValue<SpeakerProps>;
  formData: SpeakerProps;
  isSubmitting?: boolean;
  isValid?: boolean; // Added validation prop
  watch: UseFormWatch<SpeakerProps>;
  control: Control<SpeakerProps>;
}

const StepOtherInfo = ({
  onBack,
  onSubmit,
  errors,
  setValue,
  watch,
  control,
  formData,
  isSubmitting = false,
  isValid = false,
}: StepOtherInfoProps) => {
  // Handle form submission with validation
  const handleSubmit = () => {
    if (!formData.expectedArrivalDates) {
      return; // Let the form validation handle this
    }
    onSubmit();
  };

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const minDate = new Date("2025-08-01");
  const maxDate = new Date("2025-08-31");
  const formatted = useMemo(() => {
    return selectedDates.map((d) => d.toISOString());
  }, [selectedDates]);

  const handleDateChange = (date: Date | null) => {
    if (!date) return;

    const newDates = selectedDates.some(
      (d) => d.toDateString() === date.toDateString()
    )
      ? selectedDates.filter((d) => d.toDateString() !== date.toDateString())
      : [...selectedDates, date];

    setSelectedDates(newDates);

    // Update form value and trigger validation
    const formatted = newDates.map((d) => d.toISOString());
    setValue("expectedArrivalDates", formatted, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setValue("expectedArrivalDates", formatted, {
      shouldDirty: false,
      shouldValidate: false,
    });
  }, [selectedDates, setValue, formatted]);

  const clearAllDates = () => {
    setSelectedDates([]);
    setValue("expectedArrivalDates", [], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const selectedSpApplicationType = watch("participationType");

  const conferenceType = () => {
    if (selectedSpApplicationType === "MENTOR_ON_POPUP_CITY")
      return "Pop-up city";
    else if (selectedSpApplicationType === "SPEAK_ON_THE_CONF")
      return "Conference";
    else return "Pop-up city or Conference";
  };

  const canMakeItToEnuguOptions = [
    {
      label: (
        <>
          {" "}
          Yes, I will be attending the ETH-Enugu {conferenceType()} IRL on
          select days.
        </>
      ),
      value: true,
      id: "option1-IRL",
    },
    {
      label:
        " No, I may not be able to attend IRL but I can speak virtually if there are provisions for it.",
      value: false,
      id: "option2-IRl",
    },
  ];

  const participateInERVOptions = [
    {
      label: "   Yes, I'd love to get involved",
      value: true,
      id: "option1-ERV",
    },
    {
      label: "  Not interested",
      value: false,
      id: "option2-ERV",
    },
  ];

  const selectedparticipateInERV = watch("participateInERV");
  const ervInvolvementTypeOptions = [
    {
      label: "  Mentor during the Ethereum Research Village",
      value: "MENTOR_DURING_ERV",
      id: "involvementOption1",
    },
    {
      label: "Learn during the Ethereum Research Village",
      value: "LEARN_DURING_ERV",
      id: "involvementOption2",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Information Note */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <p className="block text-base font-medium mb-1">
          <span className="text-green-550 font-extrabold">Note:</span> Although
          we may not be able to cover travel costs, we may be able to partially
          cover accommodation (up to 20-50%) for select keynote speakers and
          mentors for few days. We&apos;d love to have you if you&apos;re able
          to attend.
        </p>
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-2">
          <span className=" ">
            {" "}
            Can you make it to Enugu IRL for this session during the{" "}
            {conferenceType()} ? <span className="text-red-500">*</span>{" "}
          </span>
        </label>

        <Controller
          name="canMakeItToEnugu"
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
              {canMakeItToEnuguOptions.map((option, index) => (
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
        {errors.canMakeItToEnugu && (
          <p className="text-red-500 text-sm mt-1">
            {errors.canMakeItToEnugu.message}
          </p>
        )}
      </div>

      {/* Expected Arrival Date */}
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          When do you expect to arrive in Enugu?{" "}
          <span className="text-red-500">*</span>
        </label>

        <DatePicker
          selected={null}
          onChange={handleDateChange}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Click to select multiple dates"
          className="block w-full border rounded-lg px-4 py-3 text-lg cursor-pointer"
          wrapperClassName="w-full"
        />

        {selectedDates.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-medium text-dark">Selected Dates:</p>
              <button
                type="button"
                onClick={clearAllDates}
                className="text-red-500 text-sm hover:text-red-700 cursor-pointer"
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedDates.map((date, index) => (
                <div
                  key={index}
                  className="bg-orange-200 text-orange-500 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  <span>{date.toDateString()}</span>
                  <button
                    type="button"
                    onClick={() => handleDateChange(date)}
                    className="text-orange-500 hover:text-orange-700 font-bold cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {errors.expectedArrivalDates && (
          <p className="text-red-500 text-sm mt-1">
            {errors.expectedArrivalDates.message}
          </p>
        )}
      </div>

      <div>
        <label className=" font-bold text-dark text-base mb-1 flex flex-col gap-1">
          <p>
            {" "}
            Would you like to be involved in the Ethereum Research Village?{" "}
            <span className=" text-sm text-[#131313]/70">
              ( A 4 week initiative - 2 weeks during the Pop-up city + 2 weeks
              virtually post EthEnugu &apos;25)
            </span>
            <Link
              href={
                "https://x.com/eth_enugu/status/1926906551274541056?s=46&t=zaDhrGydSI43aMot8l9mIg"
              }
            >
              {" "}
              <span className="underline text-sm text-blue-600">
                See details
              </span>{" "}
            </Link>
          </p>
          <p className="!text-sm">
            For: Devs, Technical Writers, Node Runners, Protocol Engineers,
            Researchers & Academic papers
          </p>
        </label>

        <Controller
          control={control}
          name="participateInERV"
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
              {participateInERVOptions.map((option, index) => (
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

        {errors.participateInERV && (
          <p className="text-red-500 text-sm mt-1">
            {errors.participateInERV.message}
          </p>
        )}
      </div>

      {selectedparticipateInERV === true ? (
        <div>
          <label className="block font-bold text-dark text-base mb-1">
            How would you like to get involved?
          </label>

          <Controller
            control={control}
            name="ervInvolvement"
            render={({ field }) => (
              <RadioGroup
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue("ervInvolvement", value, { shouldValidate: true });
                }}
                value={field.value}
                className="flex flex-col gap-2"
              >
                {ervInvolvementTypeOptions.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <RadioGroupItem
                      value={option.value}
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

          {errors.ervInvolvement && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ervInvolvement.message}
            </p>
          )}
        </div>
      ) : null}

      {/* Action Buttons */}
      <div className="flex md:flex-row flex-col-reverse gap-4 pt-4">
        <Button
          type="button"
          className="bg-white text-black rounded-full border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
          onClick={onBack}
          disabled={isSubmitting}
        >
          <span className="flex items-center gap-2">
            <Icon icon="solar:arrow-left-linear" width="16" height="16" />
            Go Back
          </span>
        </Button>

        <Button
          type="button"
          className={`rounded-full transition-all duration-200 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : isValid
                ? "bg-orange-500 hover:bg-orange-600 text-black"
                : "bg-gray-300 cursor-not-allowed text-gray-500"
          }`}
          onClick={handleSubmit}
          disabled={isSubmitting || !isValid}
        >
          <span className="flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Spinner />
              </>
            ) : (
              <>
                Submit Application
                <Icon icon="solar:arrow-right-linear" width="16" height="16" />
              </>
            )}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default StepOtherInfo;
