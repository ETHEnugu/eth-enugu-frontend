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
    attendDay1: Yup.string().required("Attendance for Day 1 is required"),
    attendDay2: Yup.string().required("Attendance for Day 2 is required"),
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
  });
