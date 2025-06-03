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
  fullName: string;
  email: string;
  phone: string;
  location: string | number;
  twitter: string;
  linkedin: string;
  website: string;
  sessionType: string | number;
  sessionLength: string | number;
  slideAvailable: string | number;
  slideLink: string | number;
  setupNeeds: string | number;
  arrivalDate: string | number;
  agreeToSpeak: string | number;
  referralSource: string | number;
  joinCommunity: string | number;
}

export interface PopupCityProps {
  fullName: string;
  email: string;
  gender: string | number;
  whatsappNumber: string;
  location: string | number;
  currentRole: string | number;
  web3Familiarity: string | number;
  attendDay1: string | number;
  attendDay2: string | number;
  freeLunchConsideration: string | number;
  volunteeringInterest: string | number;
  dietaryAccessibilityNeeds: string | number;
  referralSource: string | number;
  joinOnlineCommunity: string | number;
}
