"use client";
import Dropdown from "@/components/common/dropdown";
import type { PopupCityProps } from "@/types";
import {
  type UseFormRegister,
  type UseFormSetValue,
  type FieldErrors,
  Controller,
  Control,
  UseFormWatch,
} from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import Link from "next/link";

interface StepOtherInfoProps {
  register: UseFormRegister<PopupCityProps>;
  errors: FieldErrors<PopupCityProps>;
  setValue: UseFormSetValue<PopupCityProps>;
  control: Control<PopupCityProps>;
  watch: UseFormWatch<PopupCityProps>;
}

const volunteerOptions = [
  { label: "Yes", value: "YES" },
  { label: "No", value: "NO" },
  { label: "Maybe", value: "MAYBE" },
];

const StepTwoDetails = ({
  register,
  errors,
  setValue,
  control,
  watch,
}: StepOtherInfoProps) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const minDate = new Date("2025-08-04");
  const maxDate = new Date("2025-08-16");

  const handleDateChange = (date: Date | null) => {
    if (!date) return;

    setSelectedDates((prevDates) => {
      const dateExists = prevDates.some(
        (d) => d.toDateString() === date.toDateString()
      );
      const updatedDates = dateExists
        ? prevDates.filter((d) => d.toDateString() !== date.toDateString())
        : [...prevDates, date];

      const formatted = updatedDates.map((d) => d.toISOString().split("T")[0]);
      setValue("preferredDates", formatted, {
        shouldDirty: true,
        shouldValidate: true,
      });

      return updatedDates;
    });
  };

  const clearAllDates = () => {
    setSelectedDates([]);
    setValue("preferredDates", [], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const participateInERVOptions = [
    {
      label: "   Yes, I'd love to get involved",
      value: true,
      id: "option1ERV",
    },
    {
      label: "  Not interested",
      value: false,
      id: "option2ERV",
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
    <div className="space-y-7">
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <p className="block text-base font-medium mb-1">
          <span className="text-green-550 font-extrabold">Note:</span> The
          Pop-up city is open for 2 weeks to all who can attend - not just
          residents or locals. There is no accomodation provided for the popup
          city, However there would be lunch provided occasionally
        </p>
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          <span className="my-3">
            {" "}
            Can you make it to Enugu IRL for this Pop-up city if accepted ?{" "}
            <span className="text-red-500">*</span>{" "}
          </span>
          {/* Add adequate spacing before the options  */}
          {/* Depends on the selected radio from step one  */}
        </label>

        <RadioGroup
          defaultValue=""
          onValueChange={(value) => console.log(value)}
          {...register("spApplicationType", {
            required: "Please select a category",
          })}
        >
          <div className="flex items-center space-x-2 cursor-pointer">
            <RadioGroupItem
              value="option1"
              id="option1"
              className="h-3 w-3 rounded-full border border-[#F3A035] data-[state=checked]:border-[#F3A035] data-[state=checked]:bg-[#F3A035] cursor-pointer"
            />
            <label htmlFor="option1" className="cursor-pointer">
              Yes, I will be attending the ETH-Enugu Pop-up City IRL on select
              days
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="option2"
              id="option2"
              className="h-3 w-3 rounded-full border border-[#F3A035] data-[state=checked]:border-[#F3A035] data-[state=checked]:bg-[#F3A035] cursor-pointer  "
            />
            <label htmlFor="option2" className="cursor-pointer">
              No yet certain that i will be able to attend IRL
            </label>
          </div>
        </RadioGroup>
        <p className="text-red-500 text-sm mt-1">
          {" "}
          {errors.spApplicationType?.message}{" "}
        </p>

        {errors.setupRequirements && (
          <p className="text-red-500 text-sm mt-1">
            {errors.setupRequirements.message}
          </p>
        )}
      </div>

      {/* Would you likw to paricipate in the ETHEnugu '25 popup city hackathon */}

      <div>
        {/* this input is dependent on if they will be attending IRL, implement the condiotn */}
        <label className="block font-bold text-dark text-base mb-1">
          What days are you likely to attend?{" "}
          <span className="text-red-500">*</span>
        </label>

        <div className="space-y-3">
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
                  className="text-red-500 text-sm hover:text-red-700"
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
        </div>
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Would you like to be considered for free lunch during the program?{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("freeLunchConsideration")}
          placeholder="Write here..."
          rows={3}
          className="w-full border rounded-lg px-4 py-3 text-lg"
        />
        {errors.freeLunchConsideration && (
          <p className="text-red-500 text-sm mt-1">
            {errors.freeLunchConsideration.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Would you be open to volunteering or helping during the event?{" "}
          <span className="text-red-500">*</span>
        </label>
        <Dropdown
          placeholder="Choose Answer"
          onValueChange={(selected) =>
            setValue("volunteeringInterest", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          className="text-dark"
          options={volunteerOptions}
        />
        {errors.volunteeringInterest && (
          <p className="text-red-500 text-sm mt-1">
            {errors.volunteeringInterest.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Any Medical, Physical or Accessibility needs?{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("dietaryAccessibilityNeeds")}
          placeholder="Write here..."
          rows={3}
          className="w-full border rounded-lg px-4 py-3 text-lg"
        />
        {errors.dietaryAccessibilityNeeds && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dietaryAccessibilityNeeds.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          How did you hear about ETH Enugu &apos;25?{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("referralSource")}
          placeholder="Write here..."
          rows={3}
          className="w-full border rounded-lg px-4 py-3 text-lg"
        />
        {errors.referralSource && (
          <p className="text-red-500 text-sm mt-1">
            {errors.referralSource.message}
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
          <p className="!text-sm my-2 ">
            For: Devs, Technical Writers, Node Runners, Protocol Engineers,
            Researchers & Academic papers
          </p>
        </label>

        <Controller
          control={control}
          name="participateInERV"
          render={({ field }) => (
            <RadioGroup
              onValueChange={(value) => {
                const boolValue = value === "true";
                field.onChange(boolValue);
                setValue("participateInERV", boolValue, {
                  shouldValidate: true,
                });
              }}
              value={field.value?.toString()}
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
                    className="h-3 w-3 rounded-full border border-[#F3A035] data-[state=checked]:border-[#F3A035] data-[state=checked]:bg-[#F3A035] cursor-pointer"
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

      {selectedparticipateInERV === true && (
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
                      className="h-3 w-3 rounded-full border border-[#F3A035] data-[state=checked]:border-[#F3A035] data-[state=checked]:bg-[#F3A035] cursor-pointer"
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
      )}
    </div>
  );
};

export default StepTwoDetails;
