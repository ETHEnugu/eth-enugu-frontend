import { BuildersResidencyProps } from "@/types";
import * as Yup from "yup";

export const buildersResidencyValidation: Yup.ObjectSchema<BuildersResidencyProps> =
  Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    whatsappNumber: Yup.string()
      .matches(/^\+?[\d\s-]{10,}$/, "Invalid WhatsApp number")
      .required("WhatsApp number is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    githubProfile: Yup.string().required("Github Profile is required"),
    twitterProfile: Yup.string().required("Twitter Profile is required"),
    linkedinProfile: Yup.string().optional(),
    portfolioUrl: Yup.string().required("Portfolio Url is required"),
    canAttendIRL: Yup.string().required(),

    role: Yup.array()
      .of(Yup.string().required("Please select a role"))
      .min(1, "Select at least one role")
      .required("Role is required"),

    otherRole: Yup.string()
      .trim()
      .optional()
      .min(3, "Your response must be at least 3 characters long"),

    backgroundAndSkills: Yup.string().required(
      "Please share your background and skills"
    ),
    currentlyBuilding: Yup.string().required(
      "Let us know if you’re currently building something"
    ),
    previousBuilderPrograms: Yup.boolean()
      .required(
        "Please tell us if you’ve joined any builder programs or hackathons"
      )
      .transform((value, originalValue) =>
        originalValue === "true"
          ? true
          : originalValue === "false"
            ? false
            : value
      ),

    otherPrimaryRole: Yup.string().required("Please fill in this form"),

    joinReason: Yup.string().required("Tell us why you want to join"),
    projectInterest: Yup.string().required(
      "Share the kind of project you’re interested in"
    ),
    openToCollaboration: Yup.boolean()
      .required("Let us know if you're open to collaboration")
      .transform((value, originalValue) =>
        originalValue === "true"
          ? true
          : originalValue === "false"
            ? false
            : value
      ),
    needsAccommodation: Yup.boolean()
      .required("Please specify if you need any accommodation")
      .transform((value, originalValue) =>
        originalValue === "true"
          ? true
          : originalValue === "false"
            ? false
            : value
      ),
    dietaryAccessibilityNeeds: Yup.string().required(
      "Dietary needs information is required"
    ),
    referralSource: Yup.string().required("Referral source is required"),
    joinOnlineCommunity: Yup.boolean()
      .required("Online community join preference is required")
      .transform((value, originalValue) =>
        originalValue === "true"
          ? true
          : originalValue === "false"
            ? false
            : value
      ),
  });
