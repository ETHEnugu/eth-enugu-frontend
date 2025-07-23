"use client";

import { Badge } from "@/components/ui/badge";
import { BUILDER_RESIDENCY } from "@/config/ENDPOINTS";
import { useGetQuery } from "@/hooks/useApi";
import ReusableTable, { TableColumn } from "@/layout/dashboard/resuable-table";
import ExportsDropdown, {
  ExportColumn,
} from "@/layout/dashboard/exports-dropdown";
import { Calendar, Globe, User } from "lucide-react";
import { useState } from "react";

// Define the type for a builder residency registration
type BuilderResidencyRegistration = {
  fullName: string;
  email: string;
  gender: string;
  age?: string;
  country: string;
  state: string;
  city: string;
  whatsappNumber: string;
  primaryRole: string;
  otherPrimaryRole?: string;
  backgroundAndSkills: string;
  currentlyBuilding: string;
  previousBuilderPrograms: string;
  walletAddress: string;
  githubProfile?: string;
  social?: string;
  portfolioUrl?: string;
  hasRegisteredForTheHackathon: boolean;
  joinReason: string;
  comfortableSharingAccomodation: boolean;
  willBeLive: boolean;
  needCertificate: boolean;
  dietaryAccessibilityNeeds: string;
  referralSource: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type PaginationData = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export default function BuilderResidencyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetQuery(
    `${BUILDER_RESIDENCY.GET_ALL}`,
    `get_builder_residency_${currentPage}`
  );

  const builder_data: BuilderResidencyRegistration[] = data?.builders || [];
  const paginationData: PaginationData = {
    total: data?.total || 0,
    page: data?.page || 1,
    limit: data?.limit || 10,
    totalPages: data?.totalPages || 1,
  };

  // Define export columns with custom formatting
  const exportColumns: ExportColumn[] = [
    { key: "fullName", header: "Full Name" },
    { key: "email", header: "Email" },
    { key: "gender", header: "Gender" },
    {
      key: "age",
      header: "Age",
      exportFormat: (value: string) =>
        value?.replace("AGE_", "").replace("_", "-") || "",
    },
    { key: "country", header: "Country" },
    { key: "state", header: "State" },
    { key: "city", header: "City" },
    { key: "whatsappNumber", header: "WhatsApp Number" },
    {
      key: "primaryRole",
      header: "Primary Role",
      exportFormat: (value: string) => value?.replace(/_/g, " ") || "",
    },
    { key: "otherPrimaryRole", header: "Other Primary Role" },
    { key: "backgroundAndSkills", header: "Background & Skills" },
    { key: "currentlyBuilding", header: "Currently Building" },
    { key: "previousBuilderPrograms", header: "Previous Builder Programs" },
    { key: "walletAddress", header: "Wallet Address" },
    { key: "githubProfile", header: "GitHub Profile" },
    { key: "social", header: "Social" },
    { key: "portfolioUrl", header: "Portfolio/LinkedIn" },
    {
      key: "hasRegisteredForTheHackathon",
      header: "Registered for Hackathon",
      exportFormat: (value: boolean) => (value ? "Yes" : "No"),
    },
    { key: "joinReason", header: "Reason for Joining" },
    {
      key: "comfortableSharingAccomodation",
      header: "Comfortable Sharing Accommodation",
      exportFormat: (value: boolean) => (value ? "Yes" : "No"),
    },
    {
      key: "willBeLive",
      header: "Will Be Live",
      exportFormat: (value: boolean) => (value ? "Yes" : "No"),
    },
    {
      key: "needCertificate",
      header: "Need Certificate",
      exportFormat: (value: boolean) => (value ? "Yes" : "No"),
    },
    { key: "dietaryAccessibilityNeeds", header: "Dietary/Accessibility Needs" },
    { key: "referralSource", header: "Referral Source" },
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

  const renderModalContent = (row: BuilderResidencyRegistration) => (
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
              <strong>Age:</strong>{" "}
              {row.age?.replace("AGE_", "").replace("_", "-")}
            </div>
            <div>
              <strong>Country:</strong> {row.country}
            </div>
            <div>
              <strong>State:</strong> {row.state}
            </div>
            <div>
              <strong>City:</strong> {row.city}
            </div>
            <div>
              <strong>WhatsApp:</strong> {row.whatsappNumber}
            </div>
          </div>
        </div>

        {/* Professional & Web3 Info */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3 flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            Professional & Web3 Info
          </h4>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Primary Role:</strong>{" "}
              {row.primaryRole?.replace(/_/g, " ")}
            </div>
            {row.otherPrimaryRole && (
              <div>
                <strong>Other Primary Role:</strong> {row.otherPrimaryRole}
              </div>
            )}
            <div>
              <strong>Background & Skills:</strong> {row.backgroundAndSkills}
            </div>
            <div>
              <strong>Currently Building:</strong> {row.currentlyBuilding}
            </div>
            <div>
              <strong>Previous Builder Programs:</strong>{" "}
              {row.previousBuilderPrograms}
            </div>
            <div>
              <strong>Wallet Address:</strong>
              <span className="font-mono text-xs ml-1">
                {row.walletAddress}
              </span>
            </div>
            {row.githubProfile && (
              <div>
                <strong>GitHub:</strong>{" "}
                <a
                  href={row.githubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {row.githubProfile}
                </a>
              </div>
            )}
            {row.social && (
              <div>
                <strong>Social:</strong>{" "}
                <a
                  href={row.social}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {row.social}
                </a>
              </div>
            )}
            {row.portfolioUrl && (
              <div>
                <strong>Portfolio/LinkedIn:</strong>{" "}
                <a
                  href={row.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {row.portfolioUrl}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Event & Residency Info */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3 flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Residency & Event Info
          </h4>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Registered for Hackathon:</strong>{" "}
              {row.hasRegisteredForTheHackathon ? "Yes" : "No"}
            </div>
            <div>
              <strong>Reason for Joining:</strong> {row.joinReason}
            </div>
            <div>
              <strong>Comfortable Sharing Accommodation:</strong>{" "}
              {row.comfortableSharingAccomodation ? "Yes" : "No"}
            </div>
            <div>
              <strong>Will Be Live:</strong> {row.willBeLive ? "Yes" : "No"}
            </div>
            <div>
              <strong>Need Certificate:</strong>{" "}
              {row.needCertificate ? "Yes" : "No"}
            </div>
            <div>
              <strong>Dietary/Accessibility Needs:</strong>{" "}
              {row.dietaryAccessibilityNeeds}
            </div>
            <div>
              <strong>Referral Source:</strong> {row.referralSource}
            </div>
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
              {row.createdAt ? new Date(row.createdAt).toLocaleString() : ""}
            </div>
            <div>
              <strong>Updated:</strong>{" "}
              {row.updatedAt ? new Date(row.updatedAt).toLocaleString() : ""}
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
          <h1 className="text-2xl font-bold">
            Builder&apos;s Residency Registrations
          </h1>
          <p className="text-gray-600">
            Manage event registrations ({paginationData.total} total
            registrations)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportsDropdown
            data={builder_data}
            columns={exportColumns}
            filename="builders_residency_registrations"
            disabled={isLoading}
          />
        </div>
      </div>

      <ReusableTable
        data={builder_data}
        columns={columns}
        // actions={actions}
        loading={isLoading}
        viewModalTitle="Registration Details"
        viewModalContent={renderModalContent}
        emptyMessage="No registrations found"
        serverSidePagination={true}
        pagination={paginationData}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
