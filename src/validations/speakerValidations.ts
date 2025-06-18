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
    .matches(/^\+?[\d\s\-$$$$]+$/, "Please enter a valid phone number"),

  country: yup.string().trim().required("Country of residence is required"),

  state: yup.string().trim().required("State of residence is required"),

  roles: yup
    .array()
    .of(yup.string().required("Please select a role"))
    .min(1, "Select at least one role")
    .required("Role is required"),

  otherRole: yup.string().trim().optional(),

  bio: yup
    .string()
    .trim()
    .required("Please enter your bio")
    .min(10, "Your bio must be at least 10 characters"),

  participationType: yup.string().trim().required("Please select a category"),

  // Session Details
  sessionType: yup
    .string()
    .required("Please select a session type")
    .oneOf(
      ["TALK", "PANEL", "WORKSHOP", "FIRESIDE_CHAT", "OTHER"],
      "Invalid session type"
    ),

  otherSessionType: yup.string().optional(),

  sessionLength: yup
    .string()
    .required("Please select session length")
    .oneOf(
      [
        "MINUTES_5",
        "MINUTES_10",
        "MINUTES_15",
        "MINUTES_30",
        "MINUTES_45",
        "MINUTES_60",
      ],
      "Invalid session length"
    ),

  gender: yup.string().required("Please select an option"),

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

  comfortableWithTopicChange: yup.boolean().required("Please select an option"),

  // Other Information
  canMakeItToEnugu: yup.boolean().required("Please select an option"),

  expectedArrivalDates: yup
    .array()
    .of(
      yup
        .string()
        .required("Each date is required")
        .matches(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
          "Date must be in ISO format"
        )
    )
    .min(1, "Select at least one date")
    .required("Preferred dates are required"),

  participateInERV: yup.boolean().required("Please select an option"),
  ervInvolvement: yup.string().optional(),
});
