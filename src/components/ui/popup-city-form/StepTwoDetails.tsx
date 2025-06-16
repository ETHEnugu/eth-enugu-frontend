"use client";
import Dropdown from "@/components/common/dropdown";
import type { PopupCityProps } from "@/types";
import type {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
} from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface StepOtherInfoProps {
  register: UseFormRegister<PopupCityProps>;
  errors: FieldErrors<PopupCityProps>;
  setValue: UseFormSetValue<PopupCityProps>;
}

const volunteerOptions = [
  { label: "Yes", value: "YES" },
  { label: "No", value: "NO" },
  { label: "Maybe", value: "MAYBE" },
];

const StepTwoDetails = ({ register, errors, setValue }: StepOtherInfoProps) => {
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
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="option1" />
            <label htmlFor="option1">
              Yes, I will be attending the ETH-Enugu Pop-up City IRL on select
              days
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="option2" />
            <label htmlFor="option2">
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
          What days are you likely to attend?
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
          Would you like to be considered for free lunch during the program?
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
          Would you be open to volunteering or helping during the event?
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
          Any Medical, Physical or Accessibility needs?
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
          How did you hear about ETH Enugu &apos;25?
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

      {/* <div>
        <label className="block font-bold text-dark text-base mb-1">
          Would you like to join the ETH Enugu online community
          (Telegram/WhatsApp)?
        </label>
        <Dropdown
          placeholder="Choose option"
          onValueChange={(selected) =>
            setValue("joinOnlineCommunity", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          className="text-dark"
          options={joinOptions}
        />
        {errors.joinOnlineCommunity && (
          <p className="text-red-500 text-sm mt-1">
            {errors.joinOnlineCommunity.message}
          </p>
        )}
      </div> */}
      {/* this input should be removed form the BE */}
    </div>
  );
};

export default StepTwoDetails;
