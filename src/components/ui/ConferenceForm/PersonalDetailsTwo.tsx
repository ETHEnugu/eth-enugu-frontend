"use client";

import Dropdown from "@/components/common/dropdown";
import { ConferenceProps } from "@/types";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface PersonalDetailsTwoProps {
  register: UseFormRegister<ConferenceProps>;
  errors: FieldErrors<ConferenceProps>;
  setValue: UseFormSetValue<ConferenceProps>;
}

export default function PersonalDetailsTwo({
  errors,
  register,
  setValue,
}: PersonalDetailsTwoProps) {
  const roles = [
    { label: "Student", value: "Student" },
    { label: "Developer", value: "Developer" },
    { label: "Designer", value: "Designer" },
    { label: "Entrepreneur", value: "Entrepreneur" },
    { label: "Web3 Enthusiast", value: "Web3 Enthusiast" },
    { label: "Other", value: "Other" },
  ];

  const attendanceType = [
    { label: "Attendee", value: "Attendee" },
    { label: "Volunteer", value: "Volunteer" },
    { label: "Speaker [if open]", value: "Speaker" },
    { label: "Exhibitor [if open]", value: "Exhibitor" },
  ];
  const certificateNeeded = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  const joinOnlineCommunity = [
    { label: "Yes", value: "true" },
    { label: "No", value: "false" },
  ];

  return (
    <div className="w-full flex flex-col gap-8 ">
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
            })
          }
        />
        {errors.roleDescription && (
          <p className="text-red-500 text-sm mt-1">
            {errors.roleDescription.message}{" "}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          What are you hoping to gain from the conference?
        </label>
        <textarea
          {...register("expectedGains")}
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
          isTypeable={true}
          options={attendanceType}
          onValueChange={(selected) =>
            setValue("attendanceType", selected.value, { shouldValidate: true })
          }
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
          isTypeable={true}
          options={certificateNeeded}
          onValueChange={(selected) =>
            setValue("certificateNeeded", selected.value, {
              shouldValidate: true,
            })
          }
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
          {...register("dietaryAccessibilityNeeds")}
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
          {...register("referralSource")}
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
            })
          }
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
