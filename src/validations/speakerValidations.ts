import * as yup from "yup";

export const speakerValidation = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  gender: yup.string().required(),
  whatsappNumber: yup.string().required(),
  location: yup.string().required(),
  githubProfile: yup.string().url().required(),
  twitterProfile: yup.string().url().required(),
  linkedinProfile: yup.string().url().required(),
  portfolioUrl: yup.string().url().required(),
  primaryRole: yup.string().required(),
  backgroundAndSkills: yup.string().required(),
  currentlyBuilding: yup.string().required(),
  previousBuilderPrograms: yup.boolean().required(),
  joinReason: yup.string().required(),
  projectInterest: yup.string().required(),
  openToCollaboration: yup.boolean().required(),
  needsAccommodation: yup.boolean().required(),
  dietaryAccessibilityNeeds: yup.string().required(),
  referralSource: yup.string().required(),
  joinOnlineCommunity: yup.boolean().required(),
});
