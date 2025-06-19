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
  UseFormClearErrors,
  UseFormSetError,
} from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useMemo, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import Link from "next/link";
import FormInput from "@/components/common/form/FormInput";

interface StepOtherInfoProps {
  register: UseFormRegister<PopupCityProps>;
  errors: FieldErrors<PopupCityProps>;
  setValue: UseFormSetValue<PopupCityProps>;
  control: Control<PopupCityProps>;
  watch: UseFormWatch<PopupCityProps>;
  clearErrors: UseFormClearErrors<PopupCityProps>;
  setError: UseFormSetError<PopupCityProps>;
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
  setError,
  clearErrors,
}: StepOtherInfoProps) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const minDate = new Date("2025-08-04");
  const maxDate = new Date("2025-08-16");

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

    const formatted = newDates.map((d) => d.toISOString());
    setValue("preferredDates", formatted, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setValue("preferredDates", formatted, {
      shouldDirty: false,
      shouldValidate: false,
    });
  }, [selectedDates, setValue, formatted]);

  const clearAllDates = () => {
    setSelectedDates([]);
    setValue("preferredDates", [], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  const selectedCanAttendIrlOption = watch("canAttendIRL");
  console.log(selectedCanAttendIrlOption);

  useEffect(() => {
    if (selectedCanAttendIrlOption === true) {
      if (selectedDates.length === 0) {
        setError("preferredDates", {
          type: "manual",
          message: "Please select at least one date",
        });
      } else {
        clearErrors("preferredDates");
      }
    } else {
      clearErrors("preferredDates");
    }
  }, [selectedCanAttendIrlOption, selectedDates, setError, clearErrors]);

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

  const canAttendIRLOptions = [
    {
      label: (
        <>
          {" "}
          Yes, I will be attending the ETH-Enugu Pop-up city IRL on select days.
        </>
      ),
      value: true,
      id: "option1IRL",
    },
    {
      label:
        " No, I may not be able to attend IRL but I can participate virtually if there are provisions for it.",
      value: false,
      id: "option2IRl",
    },
  ];

  const web3Options = [
    { label: "newbie (has zero knowledge)", value: "NEW" },
    {
      label: " Intermediate (Heard about it and have learnt deeply about it )",
      value: "DABBLED",
    },
    {
      label: " Pro (I am actively building and use the technology daily)",
      value: "ACTIVELY_BUILDING",
    },
  ];

  const certificateNeeded = [
    {
      label: "Yes",
      value: true,
    },
    {
      label: "No",
      value: false,
    },
  ];

  const isCertificateNeeded = watch("isCertificateNeeded");

  useEffect(() => {
    if (isCertificateNeeded !== true) {
      setValue("walletAddress", "");
    }
  }, [isCertificateNeeded, setValue]);

  useEffect(() => {
    if (selectedparticipateInERV !== true) {
      setValue("ervInvolvement", null);
    }
  }, [selectedparticipateInERV, setValue]);

  return (
    <div className="space-y-7">
      <div>
        <label className="block font-bold text-dark text-base mb-1">
          How familiar are you with Web3/Blockchain{" "}
          <span className="text-red-500">*</span>
        </label>
        <Dropdown
          placeholder="Choose Option"
          onValueChange={(selected) =>
            setValue("web3Familiarity", selected.value.toString(), {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          {...register("web3Familiarity", {
            required: "Please select an option",
          })}
          className="text-dark"
          options={web3Options}
          isTypeable={false}
        />
        {errors.web3Familiarity && (
          <p className="text-red-500 text-sm mt-1">
            {errors.web3Familiarity.message}
          </p>
        )}
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
        <p className="block text-base font-medium mb-1">
          <span className="text-green-550 font-extrabold">Note:</span> The
          Pop-up city is open for 2 weeks to all who can attend - not just
          residents or locals. There is no accomodation provided for the popup
          city, However there would be lunch provided occasionally
        </p>
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-2">
          <span className=" ">
            {" "}
            Can you make it to Enugu IRL for the Pop-Up city?{" "}
            <span className="text-red-500">*</span>{" "}
          </span>
        </label>

        <Controller
          name="canAttendIRL"
          rules={{
            validate: (value) =>
              value === true || value === false || "Please select an option",
          }}
          control={control}
          render={({ field }) => {
            return (
              <RadioGroup
                onValueChange={field.onChange}
                value={String(field.value)}
                className="flex flex-col gap-2"
              >
                {canAttendIRLOptions.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.id}
                      className="h-3 w-3 rounded-full border border-[#F3A035] data-[state=checked]:border-[#F3A035] data-[state=checked]:bg-[#F3A035] cursor-pointer "
                    />
                    <label htmlFor={option.id} className="cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            );
          }}
        ></Controller>

        {errors.canAttendIRL && (
          <p className="text-red-500 text-sm mt-1">
            {errors.canAttendIRL.message}
          </p>
        )}
      </div>

      {selectedCanAttendIrlOption === true && (
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

            {errors.preferredDates && (
              <p className="text-red-500 text-sm mt-1">
                {errors.preferredDates.message}
              </p>
            )}
          </div>
        </div>
      )}

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Would you be open to volunteering or helping during the event?{" "}
          <span className="text-red-500">*</span>
        </label>
        <Dropdown
          placeholder="Choose Answer"
          onValueChange={(selected) =>
            setValue("volunteeringInterest", selected.value.toString(), {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          className="text-dark"
          options={volunteerOptions}
          {...register("volunteeringInterest", {
            required: "Please select an option",
          })}
        />
        {errors.volunteeringInterest && (
          <p className="text-red-500 text-sm mt-1">
            {errors.volunteeringInterest.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          Any Medical, Dietary, Physical or Accessibility needs?{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("dietaryAccessibilityNeeds")}
          placeholder="Write here..."
          rows={3}
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
            {errors.dietaryAccessibilityNeeds.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          We&apos;ll be minting NFTs for everyone who registers and attends the
          Conference/Summit. Would you like to have the NFT?
          <span className="text-red-500">*</span>
        </label>
        <Dropdown
          placeholder="Select Option"
          onValueChange={(selected) =>
            setValue("isCertificateNeeded", Boolean(selected.value), {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          className="text-dark"
          options={certificateNeeded}
          {...register("isCertificateNeeded", {
            validate: (value) =>
              value === true || value === false || "Please select an option",
          })}
        />
        {errors.isCertificateNeeded && (
          <p className="text-red-500 text-sm mt-1">
            {errors.isCertificateNeeded?.message}
          </p>
        )}
      </div>

      {isCertificateNeeded && (
        <div>
          <label
            htmlFor=""
            className="block font-bold text-dark text-base mb-1"
          >
            Please provide the an Ethereum wallet address where you&apos;d like
            your NFT to be sent. <span className="text-red-500"> *</span>
          </label>
          <FormInput
            label=" "
            type="text"
            placeholder="eg. 0x1234abcd..."
            {...register("walletAddress", {
              required: isCertificateNeeded
                ? "Please provide your wallet address"
                : false,
              minLength: {
                value: 25,
                message: "Wallet address must be at least 25 characters",
              },
            })}
            error={errors.walletAddress?.message}
          />
        </div>
      )}

      <div>
        <label className="block font-bold text-dark text-base mb-1">
          How did you hear about ETH Enugu &apos;25?{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("referralSource", {
            required: "Your response is required",
            minLength: {
              value: 3,
              message: "Your response must be at least 3 characters",
            },
          })}
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
          rules={{
            validate: (value) =>
              value === true || value === false || "Please select an option",
          }}
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
            rules={{
              required: selectedparticipateInERV
                ? "This field is required"
                : false,
            }}
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
