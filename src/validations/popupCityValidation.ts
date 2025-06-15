import { PopupCityProps } from "@/types";
import * as Yup from "yup";

export const popupCityValidation: Yup.ObjectSchema<PopupCityProps> =
  Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    gender: Yup.string().required("Gender is required"),
    whatsappNumber: Yup.string()
      .matches(/^\+?[\d\s-]{10,}$/, "Invalid WhatsApp number")
      .required("WhatsApp number is required"),
    location: Yup.string().required("Location is required"),
    currentRole: Yup.string().required("Current role is required"),
    web3Familiarity: Yup.string().required("Web3 familiarity is required"),
    preferredDates: Yup.array()
      .of(
        Yup.string()
          .required("Each date is required")
          .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      )
      .min(1, "Select at least one date")
      .required("Preferred dates are required"),

    freeLunchConsideration: Yup.string().required(
      "Lunch consideration is required"
    ),
    volunteeringInterest: Yup.string().required(
      "Volunteering interest is required"
    ),
    dietaryAccessibilityNeeds: Yup.string().required(
      "Dietary needs information is required"
    ),
    referralSource: Yup.string().required("Referral source is required"),
    joinOnlineCommunity: Yup.string().required(
      "Online community join preference is required"
    ),
    otherCurrentRole: Yup.string().required("Other current role is required"),
    setupRequirements: Yup.string().required("Setup requirements are required"),
    spApplicationType: Yup.string().required("Application type is required"),
  });
