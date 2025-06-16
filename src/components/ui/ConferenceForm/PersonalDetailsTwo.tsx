"use client";

import Dropdown from "@/components/common/dropdown";
import FormInput from "@/components/common/form/FormInput";
import { ConferenceProps } from "@/types";
import { useEffect } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface PersonalDetailsTwoProps {
  register: UseFormRegister<ConferenceProps>;
  errors: FieldErrors<ConferenceProps>;
  setValue: UseFormSetValue<ConferenceProps>;
  setError: UseFormSetError<ConferenceProps>;
  watch: UseFormWatch<ConferenceProps>;
}

export default function PersonalDetailsTwo({
  errors,
  register,
  setValue,
  watch,
}: PersonalDetailsTwoProps) {
  const roles = [
    { label: "Student", value: "STUDENT" },
    { label: "Developer", value: "DEVELOPER" },
    { label: "Designer", value: "DESIGNER" },
    { label: "Entrepreneur", value: "ENTREPRENEUR" },
    { label: "Web3 Enthusiast", value: "WEB3 ENTHUSIAST" },
    { label: "Other", value: "OTHER" },
  ];

  const attendanceType = [
    { label: "Attendee", value: "ATTENDEE" },
    { label: "Volunteer", value: "VOLUNTEER" },
    { label: "Speaker [if open]", value: "SPEAKER" },
    { label: "Exhibitor [if open]", value: "EXHIBITOR" },
  ];
  const certificateNeeded = [
    { label: "Yes", value: "YES" },
    { label: "No", value: "NO" },
  ];

  const joinOnlineCommunity = [
    { label: "Yes", value: "YES" },
    { label: "No", value: "NO" },
  ];

  const roleDescription = watch("roleDescription");

  useEffect(() => {
    if (roleDescription && roleDescription !== "OTHER") {
      setValue("otherRole", "", {
        shouldValidate: false,
        shouldDirty: false,
      });
    }
  }, [roleDescription, setValue]);

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 ">
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          What best describes you?
        </label>
        <Dropdown
          placeholder="Student/Developer/Designer/Entrepreneur/Web3 Enthusiast/Other"
          className="text-dark"
          isTypeable={false}
          options={roles}
          onValueChange={(selected) =>
            setValue("roleDescription", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          {...register("roleDescription", {
            required: "Please select a description",
          })}
        />
        {errors.roleDescription && (
          <p className="text-red-500 text-sm mt-1">
            {errors.roleDescription.message}{" "}
          </p>
        )}
      </div>

      {roleDescription === "OTHER" && (
        <FormInput
          type="text"
          label="Please enter a description"
          {...register("otherRole", {
            required: "Please enter your role Description",
            minLength: {
              value: 3,
              message: "Your response must be at least 3 characters long",
            },
          })}
          error={errors.otherRole?.message}
        />
      )}

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          What are you hoping to gain from the conference?
        </label>
        <textarea
          {...register("expectedGains", {
            required: "Please fill in this field",
            minLength: {
              value: 3,
              message: "Your response must be at least 3 characters long",
            },
          })}
          placeholder="Write here..."
          rows={4}
          className="w-full border rounded-lg px-4 py-3 text-lg"
        />
        {errors.expectedGains && (
          <p className="text-red-500 text-sm mt-1">
            {errors.expectedGains.message}{" "}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Do you want to attend as
        </label>
        <Dropdown
          placeholder="Attendee, Volunteer, Speaker [if open], Exhibitor [if open]"
          className="text-dark"
          isTypeable={false}
          options={attendanceType}
          onValueChange={(selected) =>
            setValue("attendanceType", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          {...register("attendanceType", {
            required: "Please selected an option",
          })}
        />
        {errors.attendanceType && (
          <p className="text-red-500 text-sm mt-1">
            {errors.attendanceType.message}{" "}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Do you need a participation certificate?
        </label>
        <Dropdown
          placeholder="Choose option"
          className="text-dark"
          isTypeable={false}
          options={certificateNeeded}
          onValueChange={(selected) =>
            setValue("certificateNeeded", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          {...register("certificateNeeded", {
            required: "Please select an option",
          })}
        />
        {errors.certificateNeeded && (
          <p className="text-red-500 text-sm mt-1">
            {errors.certificateNeeded.message}{" "}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Any dietary or accessibility needs?
        </label>
        <textarea
          placeholder="Write here..."
          rows={4}
          className="w-full border rounded-lg px-4 py-3 text-lg"
          {...register("dietaryAccessibilityNeeds", {
            required: "Please fill in this field",
            minLength: {
              value: 3,
              message: "Your response must be at least 3 characters long",
            },
          })}
        />
        {errors.dietaryAccessibilityNeeds && (
          <p className="text-red-500 text-sm mt-1">
            {errors.dietaryAccessibilityNeeds.message}{" "}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          How did you hear about ETH Enugu ‘25?
        </label>
        <textarea
          placeholder="Write here..."
          rows={4}
          className="w-full border rounded-lg px-4 py-3 text-lg"
          {...register("referralSource", {
            required: "Please fill in this field",
            minLength: {
              value: 3,
              message: "Your response must be at least 3 characters long",
            },
          })}
        />
        {errors.referralSource && (
          <p className="text-red-500 text-sm mt-1">
            {errors.referralSource.message}{" "}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Would you like to join the ETH Enugu online community
          (Telegram/WhatsApp)?
        </label>
        <Dropdown
          placeholder="Select Option"
          className="text-dark"
          options={joinOnlineCommunity}
          onValueChange={(selected) =>
            setValue("joinOnlineCommunity", selected.value, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          {...register("joinOnlineCommunity", {
            required: "Please select an option",
          })}
        />
        {errors.joinOnlineCommunity && (
          <p className="text-red-500 text-sm mt-1">
            {errors.joinOnlineCommunity.message}{" "}
          </p>
        )}
      </div>
    </div>
  );
}
