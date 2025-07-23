"use client";

import { useState } from "react";
import { POPUP_CITY } from "@/config/ENDPOINTS";
import { useGetQuery } from "@/hooks/useApi";
import ReusableTable, { TableColumn } from "@/layout/dashboard/resuable-table";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Globe } from "lucide-react";
import ExportsDropdown, {
  ExportColumn,
} from "@/layout/dashboard/exports-dropdown";

type PopupCityRegistration = {
  fullName: string;
  email: string;
  gender: string;
  country: string;
  state: string;
  whatsappNumber: string;
  canAttendIRL?: boolean;
  attendDay1?: string;
  attendDay2?: string;
  isCertificateNeeded?: boolean;
  joinOnlineCommunity?: string;
  web3Familiarity?: string;
  role?: string | string[];
  otherRole?: string;
  walletAddress?: string;
  referralSource?: string;
  participateInERV?: boolean;
  volunteeringInterest?: string;
  dietaryAccessibilityNeeds?: string;
  freeLunchConsideration?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default function PopUpCityPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading } = useGetQuery(
    `${POPUP_CITY.GET_ALL}`,
    `get_popup_city_${currentPage}`
  );

  const popupData: PopupCityRegistration[] = data?.registrations || [];
  const paginationData = {
    total: data?.total || 0,
    page: data?.page || 1,
    limit: data?.limit || 10,
    totalPages: data?.totalPages || 1,
  };

  // Export columns for ExportsDropdown
  const exportColumns: ExportColumn[] = [
    { key: "fullName", header: "Full Name" },
    { key: "email", header: "Email" },
    { key: "gender", header: "Gender" },
    { key: "country", header: "Country" },
    { key: "state", header: "State" },
    { key: "whatsappNumber", header: "WhatsApp Number" },
    {
      key: "canAttendIRL",
      header: "Can Attend IRL",
      exportFormat: (value: boolean) => (value ? "Yes" : "No"),
    },
    { key: "attendDay1", header: "Day 1 Attendance" },
    { key: "attendDay2", header: "Day 2 Attendance" },
    {
      key: "isCertificateNeeded",
      header: "Certificate Needed",
      exportFormat: (value: boolean) => (value ? "Yes" : "No"),
    },
    { key: "joinOnlineCommunity", header: "Join Online Community" },
    { key: "web3Familiarity", header: "Web3 Familiarity" },
    {
      key: "role",
      header: "Role",
      exportFormat: (value: string | string[]) =>
        typeof value === "string"
          ? value.replace(/,/g, ", ")
          : Array.isArray(value)
            ? value.join(", ")
            : value || "",
    },
    { key: "otherRole", header: "Other Role" },
    { key: "walletAddress", header: "Wallet Address" },
    { key: "referralSource", header: "Referral Source" },
    {
      key: "participateInERV",
      header: "Participate in ERV",
      exportFormat: (value: boolean) => (value ? "Yes" : "No"),
    },
    { key: "volunteeringInterest", header: "Volunteering Interest" },
    { key: "dietaryAccessibilityNeeds", header: "Dietary/Accessibility Needs" },
    { key: "freeLunchConsideration", header: "Free Lunch Consideration" },
    { key: "status", header: "Status" },
    {
      key: "createdAt",
      header: "Created At",
      exportFormat: (value: string) =>
        value ? new Date(value).toLocaleString() : "",
    },
    {
      key: "updatedAt",
      header: "Updated At",
      exportFormat: (value: string) =>
        value ? new Date(value).toLocaleString() : "",
    },
  ];

  // Define table columns
  const columns: TableColumn[] = [
    {
      key: "fullName",
      header: "Full Name",
      render: (value: string) => <div className="font-medium">{value}</div>,
    },
    {
      key: "email",
      header: "Email",
      render: (value: string) => (
        <div className="text-sm text-gray-600">{value}</div>
      ),
    },
    {
      key: "gender",
      header: "Gender",
      render: (value: string) => <Badge variant="outline">{value}</Badge>,
    },
    {
      key: "country",
      header: "Country",
    },
    {
      key: "status",
      header: "Status",
      render: (value: string) => (
        <Badge
          variant={
            value === "APPROVED"
              ? "default"
              : value === "PENDING"
                ? "secondary"
                : "destructive"
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  // Custom modal content to show all registration details
  const renderModalContent = (row: PopupCityRegistration) => (
    <div className="space-y-6 px-4">
      <div className="flex items-center space-x-3">
        <User className="h-6 w-6 text-blue-500" />
        <div>
          <h3 className="text-lg font-semibold">{row.fullName}</h3>
          <p className="text-sm text-gray-500">{row.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Personal Information */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3 flex items-center">
            <User className="h-4 w-4 mr-2" />
            Personal Information
          </h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <strong>Gender:</strong> {row.gender}
            </div>
            <div>
              <strong>Country:</strong> {row.country}
            </div>
            <div>
              <strong>State:</strong> {row.state}
            </div>
            <div>
              <strong>WhatsApp:</strong> {row.whatsappNumber}
            </div>
          </div>
        </div>

        {/* Event Participation */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Event Participation
          </h4>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Can Attend IRL:</strong> {row.canAttendIRL ? "Yes" : "No"}
            </div>
            <div>
              <strong>Day 1 Attendance:</strong> {row.attendDay1 || "Not set"}
            </div>
            <div>
              <strong>Day 2 Attendance:</strong> {row.attendDay2 || "Not set"}
            </div>
            <div>
              <strong>Certificate Needed:</strong>{" "}
              {row.isCertificateNeeded ? "Yes" : "No"}
            </div>
            <div>
              <strong>Join Online Community:</strong>{" "}
              {row.joinOnlineCommunity || "Not set"}
            </div>
          </div>
        </div>

        {/* Web3 & Professional Info */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3 flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Web3 & Professional Info
          </h4>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Web3 Familiarity:</strong>{" "}
              {row.web3Familiarity || "Not set"}
            </div>
            <div>
              <strong>Role:</strong>{" "}
              {row.role && typeof row.role === "string"
                ? row.role.replace(/,/g, ", ")
                : Array.isArray(row.role)
                  ? row.role.join(", ")
                  : row.role || "Not set"}
            </div>
            {row.otherRole && (
              <div>
                <strong>Other Role:</strong> {row.otherRole}
              </div>
            )}
            <div>
              <strong>Wallet Address:</strong>
              <span className="font-mono text-xs ml-1">
                {row.walletAddress}
              </span>
            </div>
            <div>
              <strong>Referral Source:</strong> {row.referralSource}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3">Additional Information</h4>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Participate in ERV:</strong>{" "}
              {row.participateInERV ? "Yes" : "No"}
            </div>
            <div>
              <strong>Volunteering Interest:</strong>{" "}
              {row.volunteeringInterest || "Not set"}
            </div>
            <div>
              <strong>Dietary/Accessibility Needs:</strong>{" "}
              {row.dietaryAccessibilityNeeds || "Not set"}
            </div>
            {row.freeLunchConsideration && (
              <div>
                <strong>Free Lunch Consideration:</strong>{" "}
                {row.freeLunchConsideration}
              </div>
            )}
          </div>
        </div>

        {/* Status & Dates */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3">Status & Dates</h4>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Status:</strong>
              <Badge
                className="ml-2"
                variant={
                  row.status === "APPROVED"
                    ? "default"
                    : row.status === "PENDING"
                      ? "secondary"
                      : "destructive"
                }
              >
                {row.status}
              </Badge>
            </div>
            <div>
              <strong>Created:</strong>{" "}
              {row.createdAt
                ? new Date(row.createdAt).toLocaleString()
                : "Not set"}
            </div>
            <div>
              <strong>Updated:</strong>{" "}
              {row.updatedAt
                ? new Date(row.updatedAt).toLocaleString()
                : "Not set"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pop-up City Registrations</h1>
          <p className="text-gray-600">
            Manage event registrations ({paginationData.total} total
            registrations)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportsDropdown
            data={popupData}
            columns={exportColumns}
            filename="popup_city_registrations"
            disabled={isLoading}
          />
        </div>
      </div>

      <ReusableTable
        data={popupData}
        columns={columns}
        loading={isLoading}
        viewModalTitle="Registration Details"
        viewModalContent={renderModalContent}
        emptyMessage="No registrations found"
        serverSidePagination
        pagination={paginationData}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
