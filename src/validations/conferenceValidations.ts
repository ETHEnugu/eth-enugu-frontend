// import { ConferenceProps } from "@/types";
// import * as Yup from "yup";

// export const conferenceValidation: Yup.ObjectSchema<ConferenceProps> =
//   Yup.object().shape({
//     fullName: Yup.string().trim(3,  "Your response must be at least 3 characters long").required("Full name is required"),

//     email: Yup.string().email("Invalid email").required("Email is required"),

//     gender: Yup.string().required("Gender is required"),

//     whatsappNumber: Yup.string()
//       .matches(/^\+?[\d\s-]{10,}$/, "Invalid WhatsApp number")
//       .required("WhatsApp number is required"),

//     country: Yup.string().required("Country is required"),

//     state: Yup.string().required("State is required"),

//     city: Yup.string().notRequired(),

//     twitterProfile: Yup.string().required("Twitter Profile is required"),

//     linkedinProfile: Yup.string().optional(),

//     role: Yup.array()
//       .of(Yup.string().required("Please select a role"))
//       .min(1, "Select at least one role")
//       .required("Role is required"),

//     otherRole: Yup.string()
//       .trim()
//       .notRequired()
//       .when("role", {
//         is: (role: string[] | undefined) => role?.includes("OTHER"),
//         then: (schema) =>
//           schema.min(3, "Your response must be at least 3 characters long"),
//         otherwise: (schema) => schema.notRequired(),
//       }),

//     referralSource: Yup.string().required("Referral source is required"),

//     walletAddress: Yup.string()
//       .optional()
//       .min(26, "Wallet address must be at least 26 characters"),
//     certificateNeeded: Yup.boolean()
//       .required("Let us know if you're open to collaboration")
//       .transform((value, originalValue) =>
//         originalValue === "true"
//           ? true
//           : originalValue === "false"
//             ? false
//             : value
//       ),

//     volunteering: Yup.string().required("Please select an option"),

//     web3Familiarity: Yup.string().required("Web3 familiarity is required"),
//   });
