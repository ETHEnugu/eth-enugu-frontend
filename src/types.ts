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
  country: string;
  state: string;
  socials?: string | null;
  gender: string | number | boolean;
  roles: string[];
  bio: string;
  otherRole: string;
  participationType: string;
  portfolioUrl: string;

  // Session Details
  sessionType: string;
  otherSessionType: string;
  sessionLength: string;
  presentationAvailable: boolean;
  presentationLink?: string | null;
  talkTitle: string;
  talkDescription: string;
  comfortableWithTopicChange: boolean;

  // Other Information
  canMakeItToEnugu: boolean;
  expectedArrivalDates: string[] | null;
  participateInERV: boolean;
  ervInvolvement: string;
}

export interface ConferenceProps {
  fullName: string;
  email: string;
  whatsappNumber: string;
  country?: string;
  state: string;
  city?: string | null;
  gender: string | number | boolean;
  volunteering: string | number | boolean;
  certificateNeeded: string | number | boolean;
  referralSource: string;
  otherRole?: string | null;
  socials?: string | null;
  web3Familiarity: string | number | boolean;
  role?: string[];
  walletAddress?: string;
  willBeLive: string | null | boolean;
}

export interface PopupCityProps {
  fullName: string;
  email: string;
  gender: string | number | boolean;
  whatsappNumber: string;
  country: string;
  state: string;
  city?: string | null;
  role?: string[];
  otherRole?: string;
  web3Familiarity: string | number | boolean;
  canAttendIRL: string;
  preferredDates: string[] | null;
  volunteeringInterest: string | number | boolean;
  dietaryAccessibilityNeeds: string | number | boolean;
  referralSource: string | number | boolean;
  socials?: string | null;
  portfolioUrl: string;
  participateInERV: boolean;
  ervInvolvement?: string | null;
}

export interface BuildersResidencyProps {
  fullName: string;
  email: string;
  gender: string | number | boolean;
  whatsappNumber: string;
  country: string;
  city?: string;
  age: string | number | boolean;
  state: string;
  primaryRole: string[];
  otherPrimaryRole?: string | null;
  social?: string | null;
  portfolioUrl: string;
  willBeLive?: boolean | null;
  backgroundAndSkills: string;
  currentlyBuilding: string;
  previousBuilderPrograms: string[];
  joinReason: string;
  comfortableSharingAccomodation: string | number | boolean;
  referralSource: string | number | boolean;
  participateInERV: boolean;
  ervInvolvement?: string;
  needCertificate: string | number | boolean;
  walletAddress?: string;
  hasRegisteredForTheHackathon: string | number | boolean;
  dietaryAccessibilityNeeds: string | number | boolean;
}
