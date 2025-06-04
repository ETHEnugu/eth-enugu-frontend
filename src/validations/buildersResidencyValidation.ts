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
    location: Yup.string().required("Location is required"),
    githubProfile: Yup.string().required("Github Profile is required"),
    twitterProfile: Yup.string().required("Twitter Profile is required"),
    linkedinProfile: Yup.string().required("Linkedin Profile is required"),
    portfolioUrl: Yup.string().required("Portfolio Url is required"),
    primaryRole: Yup.string().required("Please select your primary role"),
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
