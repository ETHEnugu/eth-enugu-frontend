// import { PopupCityProps } from "@/types";
// import * as Yup from "yup";

// export const popupCityValidation: Yup.ObjectSchema<PopupCityProps> =
//   Yup.object().shape({
//     fullName: Yup.string().required("Full name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     gender: Yup.string().required("Gender is required"),
//     whatsappNumber: Yup.string()
//       .matches(/^\+?[\d\s-]{10,}$/, "Invalid WhatsApp number")
//       .required("WhatsApp number is required"),
//     country: Yup.string().required("Location is required"),
//     state: Yup.string().required("Location is required"),
//     role: Yup.array().of(Yup.string().required("Current role is required")),

//     twitterProfile: Yup.string()
//       .url("Please enter a valid URL")
//       .required("Please enter your Twitter(X) handle")
//       .nullable()
//       .transform((value) => value || undefined),

//     linkedinProfile: Yup.string()
//       .url("Please enter a valid URL")
//       .optional()
//       .nullable()
//       .transform((value) => value || undefined),

//     web3Familiarity: Yup.string().required("Web3 familiarity is required"),
//     preferredDates: Yup.array()
//       .of(
//         Yup.string()
//           .required("Each date is required")
//           .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
//       )
//       .min(1, "Select at least one date")
//       .required("Preferred dates are required"),

//     volunteeringInterest: Yup.string().required(
//       "Volunteering interest is required"
//     ),
//     dietaryAccessibilityNeeds: Yup.string().required(
//       "Dietary needs information is required"
//     ),
//     referralSource: Yup.string().required("Referral source is required"),
//     otherRole: Yup.string().trim().optional().min(3, "Your response should be at least 3 characters"),
//     participateInERV: Yup.boolean().required("Please select an option"),
//     ervInvolvement: Yup.string().nullable().notRequired(),
//     canAttendIRL: Yup.string().required(),
//   });
