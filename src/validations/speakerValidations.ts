import * as yup from "yup";

export const speakerValidation = yup.object().shape({
  // Personal Information
  fullName: yup
    .string()
    .trim()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must not exceed 100 characters"),

  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required")
    .lowercase(),

  whatsappNumber: yup
    .string()
    .trim()
    .required("WhatsApp number is required")
    .matches(/^\+?[\d\s\-\(\)]+$/, "Please enter a valid phone number"),

  location: yup
    .string()
    .trim()
    .required("Location is required")
    .min(2, "Location must be at least 2 characters"),

  twitterProfile: yup
    .string()
    .url("Please enter a valid URL")
    .optional()
    .nullable()
    .transform((value) => value || undefined),

  linkedinProfile: yup
    .string()
    .url("Please enter a valid URL")
    .optional()
    .nullable()
    .transform((value) => value || undefined),

  website: yup
    .string()
    .url("Please enter a valid URL")
    .optional()
    .nullable()
    .transform((value) => value || undefined),

  // Session Details
  sessionType: yup
    .string()
    .required("Please select a session type")
    .oneOf(
      ["TALK", "PANEL", "WORKSHOP", "FIRESIDE_CHAT", "OTHER"],
      "Invalid session type"
    ),

  sessionLength: yup
    .string()
    .required("Please select session length")
    .oneOf(
      ["MINUTES_15", "MINUTES_30", "MINUTES_45", "MINUTES_60"],
      "Invalid session length"
    ),

  presentationAvailable: yup
    .boolean()
    .required("Please specify if presentation is available"),

  presentationLink: yup
    .string()
    .url("Please enter a valid URL")
    .optional()
    .nullable()
    .transform((value) => value || undefined)
    .when("presentationAvailable", {
      is: true,
      then: (schema) => schema.required("Please provide the presentation link"),
    }),

  setupRequirements: yup
    .string()
    .optional()
    .nullable()
    .max(1000, "Setup requirements must not exceed 1000 characters")
    .transform((value) => value || undefined),

  talkTitle: yup
    .string()
    .trim()
    .required("Talk title is required")
    .min(5, "Talk title must be at least 5 characters")
    .max(200, "Talk title must not exceed 200 characters"),

  talkDescription: yup
    .string()
    .trim()
    .required("Talk description is required")
    .min(50, "Talk description must be at least 50 characters")
    .max(2000, "Talk description must not exceed 2000 characters"),

  // Other Information
  expectedArrivalDate: yup
    .string()
    .required("Expected arrival date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date"),

  willingToSpeakWithoutSupport: yup
    .boolean()
    .required("Please specify if you're willing to speak without support"),

  referralSource: yup
    .string()
    .optional()
    .nullable()
    .max(500, "Referral source must not exceed 500 characters")
    .transform((value) => value || undefined),

  joinOnlineCommunity: yup
    .string()
    .optional()
    .nullable()
    .oneOf(
      ["WANTS_TO_JOIN", "ALREADY_MEMBER", "NOT_INTERESTED", ""],
      "Invalid community preference"
    )
    .transform((value) => value || undefined),
});
