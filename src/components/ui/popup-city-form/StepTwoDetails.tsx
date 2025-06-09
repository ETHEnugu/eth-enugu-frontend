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

const joinOptions = [
  { label: "Yes", value: "YES" },
  { label: "No", value: "NO" },
  { label: "Already a member", value: "ALREADY_MEMBER" },
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
      <div>
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
          Any dietary or accessibility needs?
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

      <div>
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
      </div>
    </div>
  );
};

export default StepTwoDetails;
