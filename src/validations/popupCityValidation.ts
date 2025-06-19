// import { PopupCityProps } from "@/types";
// import * as Yup from "yup";

// export const popupCityValidation: Yup.ObjectSchema<PopupCityProps> =
//   Yup.object().shape({
//     fullName: Yup.string().required("Full name is required"),

//     email: Yup.string().email("Invalid email").required("Email is required"),

//     gender: Yup.string().required("Gender is required"),

//     whatsappNumber: Yup.string()
//       .matches(/^\+?[\d\s-]{10,}$/, "Invalid Phone number")
//       .required("Phone number is required"),

//     country: Yup.string().required("Country is required"),

//     state: Yup.string().required("State is required"),

//     city: Yup.string().nullable(),

//     role: Yup.array()
//       .of(Yup.string().required("Current role is required"))
//       .min(1, "Select at least one role"),

//     web3Familiarity: Yup.string().required("Web3 familiarity is required"),

//     preferredDates: Yup.array()
//       .of(
//         Yup.string()
//           .required("Each date is required")
//           .matches(
//             /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
//             "Date must be in YYYY-MM-DD format"
//           )
//       )
//       .when("canAttendIRL", {
//         is: (canAttendIRL: string | boolean) =>
//           canAttendIRL === true || canAttendIRL === "true",
//         then: (schema) =>
//           schema
//             .min(1, "Select at least one date")
//             .required("Preferred dates are required"),
//         otherwise: (schema) => schema.nullable().notRequired(),
//       }),

//     volunteeringInterest: Yup.string().required(
//       "Volunteering interest is required"
//     ),

//     dietaryAccessibilityNeeds: Yup.string().required(
//       "Dietary needs information is required"
//     ),

//     referralSource: Yup.string().required("Referral source is required"),

//     otherRole: Yup.string()
//       .trim()
//       .when("role", {
//         is: (role: string[] | undefined) => role?.includes("OTHER"),
//         then: (schema) =>
//           schema
//             .required("Please specify your role")
//             .min(3, "Your response should be at least 3 characters"),
//         otherwise: (schema) => schema.optional().nullable(),
//       }),

//     participateInERV: Yup.boolean().required("Please select an option"),

//     ervInvolvement: Yup.string()
//       .nullable()
//       .when("participateInERV", {
//         is: true,
//         then: (schema) =>
//           schema.required("Please select how you'd like to get involved"),
//         otherwise: (schema) => schema.nullable().notRequired(),
//       }),

//     canAttendIRL: Yup.boolean().required("Please select an option"),

//     walletAddress: Yup.string().when("isCertificateNeeded", {
//       is: true,
//       then: (schema) =>
//         schema
//           .required("Wallet address is required for NFT minting")
//           .min(26, "Wallet address must be at least 26 characters"),
//       otherwise: (schema) => schema.optional(),
//     }),
//     isCertificateNeeded: Yup.boolean()
//       .required("Please select an option")
//       .transform((value, originalValue) =>
//         originalValue === "true"
//           ? true
//           : originalValue === "false"
//             ? false
//             : value
//       ),

//     joinOnlineCommunity: Yup.string().required(),

//     socials: Yup.string()
//       .required("Your Social link is required")
//       .matches(
//         /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/,
//         "Enter a valid URL"
//       ),

//     portfolioUrl: Yup.string()
//       .required("Your Portfolio Url is required")
//       .matches(
//         /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/,
//         "Enter a valid URL"
//       ),
//   });
