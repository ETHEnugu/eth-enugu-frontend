import { HTMLAttributes, ReactNode } from "react";

export type TypographyProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLHeadingElement>;

export type ParagraphProps = {
  children: ReactNode;
  className?: string;
  isGray?: boolean;
} & HTMLAttributes<HTMLParagraphElement>;

export interface Column<T> {
  title: string;
  key: keyof T;
  render?: (rowData: T, index: number) => ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (rowData: T) => void;
  isLoading: boolean;
  isCoin?: boolean;
  isHeader?: boolean;
  isTrow?: boolean;
  selectedRows?: T[];
  onCheckboxChange?: (rowData: T) => void;
  onHeaderCheckboxChange?: () => void;
  isSelectable?: boolean;
}

export type SubscribersProps = {
  id: string;
  name: string;
  email: string;
  isSubscribed: boolean;
};

export interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type LoginProps = Pick<RegisterProps, "email" | "password">;

export type ModalProps = {
  children: ReactNode;
  title?: string;
  desc?: string;
  show: boolean;
  closeModal: () => void;
  isSideModal?: boolean;
};

export interface AppointmentProps {
  clientName: string;
  clientEmail: string;
  serviceId: string;
  start_time: string;
  end_time: string;
}

export interface ServiceProps {
  serviceName: string;
  description: string;
  duration: string;
  timeAvailable: string[];
  availableWeekDays: string[];
  price: number;
  _id?: string;
  service?: string;
}
export interface AccountDetailsProps {
  account_number: string;
  bank_name: string;
}

export interface SpeakerProps {
  // Personal Information
  fullName: string;
  email: string;
  whatsappNumber: string;
  location: string;
  twitterProfile?: string | null;
  linkedinProfile?: string | null;
  website?: string | null;

  // Session Details
  sessionType: string;
  sessionLength: string;
  presentationAvailable: boolean;
  presentationLink?: string | null;
  setupRequirements?: string | null;
  talkTitle: string;
  talkDescription: string;

  // Other Information
  expectedArrivalDate: string;
  willingToSpeakWithoutSupport: boolean;
  referralSource?: string | null;
  joinOnlineCommunity?: string;
}

export interface ConferenceProps {
  fullName: string;
  email: string;
  whatsappNumber: string;
  location: string | number | boolean;
  age: string | number | boolean;
  gender: string | number | boolean;
  roleDescription: string | number | boolean;
  expectedGains: string;
  attendanceType: string | number | boolean;
  certificateNeeded: string | number | boolean;
  dietaryAccessibilityNeeds: string;
  referralSource: string;
  joinOnlineCommunity: string | number | boolean;
}

export interface PopupCityProps {
  fullName: string;
  email: string;
  gender: string | number | boolean;
  whatsappNumber: string;
  location: string | number | boolean;
  currentRole: string | number | boolean;
  web3Familiarity: string | number | boolean;
  preferredDates: string[] | null;
  freeLunchConsideration: string | number | boolean;
  volunteeringInterest: string | number | boolean;
  dietaryAccessibilityNeeds: string | number | boolean;
  referralSource: string | number | boolean;
  joinOnlineCommunity: string | number | boolean;
}

export interface BuildersResidencyProps {
  fullName: string;
  email: string;
  gender: string | number | boolean;
  whatsappNumber: string;
  location: string | number | boolean;
  githubProfile: string;
  twitterProfile: string;
  linkedinProfile: string;
  portfolioUrl: string;
  primaryRole: string | number | boolean;
  backgroundAndSkills: string;
  currentlyBuilding: string;
  previousBuilderPrograms: string | number | boolean;
  joinReason: string;
  projectInterest: string | number | boolean;
  openToCollaboration: string | number | boolean;
  needsAccommodation: string | number | boolean;
  dietaryAccessibilityNeeds: string | number | boolean;
  referralSource: string | number | boolean;
  joinOnlineCommunity: string | number | boolean;
}
