import { BuildersResidencyProps } from "@/types";
import * as Yup from "yup";

export const buildersResidencyValidation: Yup.ObjectSchema<BuildersResidencyProps> =
  Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    gender: Yup.string().required("Gender is required"),

    age: Yup.string().required("Please select an age range"),

    whatsappNumber: Yup.string()
      .matches(/^\+?[\d\s-]{10,}$/, "Invalid WhatsApp number")
      .required("Phone number is required"),

    country: Yup.string().required("Country is required"),

    state: Yup.string().required("State is required"),

    city: Yup.string()
      .min(3, "Your response must be at least 3 characters")
      .optional(),

    social: Yup.string()
      .required("Your Social link is required")
      .matches(
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/,
        "Enter a valid URL"
      ),

    portfolioUrl: Yup.string()
      .required("Portfolio Url is required")
      .matches(
        /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/,
        "Enter a valid URL"
      ),

    willBeLive: Yup.boolean().required("Please select an option").nullable(),

    primaryRole: Yup.array()
      .of(Yup.string().required("Please select a role"))
      .min(1, "Select at least one role")
      .required("Role is required"),

    otherPrimaryRole: Yup.string()
      .trim()
      .notRequired()
      .when("role", {
        is: (role: string[] | undefined) => role?.includes("OTHER"),
        then: (schema) =>
          schema.min(3, "Your response must be at least 3 characters long"),
        otherwise: (schema) => schema.notRequired(),
      }),

    backgroundAndSkills: Yup.string()
      .trim()
      .min(10, "Your response should be at least 10 characters")
      .required("Please share your background and skills"),

    currentlyBuilding: Yup.string()
      .trim()
      .min(10, "Your response should be at least 10 characters")
      .required("Let us know if you’re currently building something"),

    previousBuilderPrograms: Yup.array()
      .of(Yup.string().required("Please select an option"))
      .min(1, "Select at least one option")
      .required("Option is required"),

    joinReason: Yup.string()
      .trim()
      .min(10, "Your response should be at least 10 characters")
      .required("Tell us why you want to join"),

    comfortableSharingAccomodation: Yup.boolean()
      .required("Let us know if you're comfortable sharing a room")
      .transform((value, originalValue) =>
        originalValue === "true"
          ? true
          : originalValue === "false"
            ? false
            : value
      ),

    referralSource: Yup.string().required("Referral source is required"),

    participateInERV: Yup.boolean().required("Please select an option"),

    hasRegisteredForTheHackathon: Yup.boolean()
      .required("Let us know if you're open to collaboration")
      .transform((value, originalValue) =>
        originalValue === "true"
          ? true
          : originalValue === "false"
            ? false
            : value
      ),

    ervInvolvement: Yup.string().optional(),

    walletAddress: Yup.string()
      .optional()
      .min(26, "Wallet address must be at least 26 characters"),
    needCertificate: Yup.boolean()
      .required("Please select an option")
      .transform((value, originalValue) =>
        originalValue === "true"
          ? true
          : originalValue === "false"
            ? false
            : value
      ),

    dietaryAccessibilityNeeds: Yup.string()
      .trim()
      .min(3, "Your response must be at least three characters")
      .required("This information is required"),
  });
