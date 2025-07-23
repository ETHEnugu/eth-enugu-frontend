"use client";

import React, { useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { SPEAKER } from "@/config/ENDPOINTS";
import { useGetQuery } from "@/hooks/useApi";
import ReusableTable, { TableColumn } from "@/layout/dashboard/resuable-table";
import ExportsDropdown, {
  ExportColumn,
} from "@/layout/dashboard/exports-dropdown";
import { Calendar, Globe, User } from "lucide-react";

// Define the type for a speaker application row
type SpeakerApplication = {
  fullName: string;
  email: string;
  participationType: string;
  sessionType: string;
  otherSessionType?: string;
  talkTitle: string;
  talkDescription?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  gender?: string;
  country?: string;
  state?: string;
  city?: string;
  whatsappNumber?: string;
  bio?: string;
  roles?: string[] | string;
  otherRole?: string;
  portfolioUrl?: string;
  social?: string;
  sessionLength?: string;
  presentationAvailable?: boolean;
  presentationLink?: string;
  setupRequirements?: string;
  comfortableWithTopicChange?: boolean;
  canMakeItToEnugu?: boolean;
  expectedArrivalDates?: Date[] | string[];
  participateInERV?: boolean;
  ervInvolvement?: string;
  status?: string;
};

const PARTICIPATION_LABELS: Record<string, string> = {
  BOTH: "Speaker & Mentor",
  SPEAK_ONLY: "Speaker",
  MENTOR_ONLY: "Mentor",
};

const getParticipationLabel = (value: string) =>
  PARTICIPATION_LABELS[value] || value || "";

const formatSessionType = (value: string, row: SpeakerApplication) =>
  value === "OTHER"
    ? row.otherSessionType || "Other"
    : value?.replace(/_/g, " ") || "";

const formatDate = (value: string | Date | undefined) =>
  value ? new Date(value).toLocaleString() : "";

const formatDateShort = (value: string | Date | undefined) =>
  value ? new Date(value).toLocaleDateString() : "";

const formatRoles = (value: string[] | string | undefined) =>
  Array.isArray(value)
    ? value.map((r) => r.replace(/_/g, " ")).join(", ")
    : value || "";

const formatSessionLength = (value: string | undefined) =>
  value ? value.replace("MINUTES_", "") + " min" : "";

const formatYesNo = (value: boolean | undefined) => (value ? "Yes" : "No");

const formatExpectedArrivalDates = (value: Date[] | string[] | undefined) =>
  Array.isArray(value)
    ? value
        .map((d) => {
          try {
            return new Date(d as string | Date).toLocaleDateString();
          } catch {
            return "";
          }
        })
        .filter(Boolean)
        .join(", ")
    : "";

export default function SpeakerPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading } = useGetQuery(
    `${SPEAKER.GET_ALL}?page=${currentPage}`,
    `all_speakers_${currentPage}`
  );

  const speakerData: SpeakerApplication[] = data?.applications ?? [];
  const paginationData = {
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    limit: data?.limit ?? 10,
    totalPages: data?.totalPages ?? 1,
  };

  const exportColumns: ExportColumn[] = [
    { key: "fullName", header: "Full Name" },
    { key: "email", header: "Email" },
    {
      key: "participationType",
      header: "Participation",
      exportFormat: getParticipationLabel,
    },
    {
      key: "sessionType",
      header: "Session Type",
      exportFormat: (value: string, row: SpeakerApplication) =>
        formatSessionType(value, row),
    },
    { key: "otherSessionType", header: "Other Session Type" },
    { key: "talkTitle", header: "Talk Title" },
    { key: "talkDescription", header: "Talk Description" },
    {
      key: "createdAt",
      header: "Created At",
      exportFormat: formatDate,
    },
    {
      key: "updatedAt",
      header: "Updated At",
      exportFormat: formatDate,
    },
    { key: "gender", header: "Gender" },
    { key: "country", header: "Country" },
    { key: "state", header: "State" },
    { key: "city", header: "City" },
    { key: "whatsappNumber", header: "WhatsApp Number" },
    { key: "bio", header: "Bio" },
    {
      key: "roles",
      header: "Roles",
      exportFormat: formatRoles,
    },
    { key: "otherRole", header: "Other Role" },
    { key: "portfolioUrl", header: "Portfolio/LinkedIn" },
    { key: "social", header: "Social" },
    {
      key: "sessionLength",
      header: "Session Length",
      exportFormat: formatSessionLength,
    },
    {
      key: "presentationAvailable",
      header: "Presentation Available",
      exportFormat: formatYesNo,
    },
    { key: "presentationLink", header: "Presentation Link" },
    { key: "setupRequirements", header: "Setup Requirements" },
    {
      key: "comfortableWithTopicChange",
      header: "Comfortable With Topic Change",
      exportFormat: formatYesNo,
    },
    {
      key: "canMakeItToEnugu",
      header: "Can Make It To Enugu",
      exportFormat: formatYesNo,
    },
    {
      key: "expectedArrivalDates",
      header: "Expected Arrival Dates",
      exportFormat: formatExpectedArrivalDates,
    },
    {
      key: "participateInERV",
      header: "Participate in ERV",
      exportFormat: formatYesNo,
    },
    {
      key: "ervInvolvement",
      header: "ERV Involvement",
      exportFormat: (value: string) => (value ? value.replace(/_/g, " ") : ""),
    },
    {
      key: "status",
      header: "Status",
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
      key: "participationType",
      header: "Participation",
      render: (value: string) => (
        <Badge variant="outline">{getParticipationLabel(value)}</Badge>
      ),
    },
    {
      key: "sessionType",
      header: "Session Type",
      render: (value: string, row: SpeakerApplication) =>
        formatSessionType(value, row),
    },
    {
      key: "talkTitle",
      header: "Talk Title",
      render: (value: string) => (
        <div className="text-sm font-semibold">{value}</div>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (value: string | Date | undefined) => formatDateShort(value),
    },
  ];

  const renderModalContent = useCallback(
    (row: SpeakerApplication) => (
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
                <strong>Bio:</strong> {row.bio}
              </div>
              <div>
                <strong>Roles:</strong> {formatRoles(row.roles)}
              </div>
              {row.otherRole && (
                <div>
                  <strong>Other Role:</strong> {row.otherRole}
                </div>
              )}
              <div>
                <strong>Portfolio/LinkedIn:</strong>{" "}
                {row.portfolioUrl ? (
                  <a
                    href={row.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {row.portfolioUrl}
                  </a>
                ) : (
                  "N/A"
                )}
              </div>
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
            </div>
          </div>

          {/* Session & Talk Info */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Session & Talk Info
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Participation Type:</strong>{" "}
                {getParticipationLabel(row.participationType)}
              </div>
              <div>
                <strong>Session Type:</strong>{" "}
                {formatSessionType(row.sessionType, row)}
              </div>
              <div>
                <strong>Session Length:</strong>{" "}
                {formatSessionLength(row.sessionLength)}
              </div>
              <div>
                <strong>Talk Title:</strong> {row.talkTitle}
              </div>
              <div>
                <strong>Talk Description:</strong> {row.talkDescription}
              </div>
              <div>
                <strong>Presentation Available:</strong>{" "}
                {formatYesNo(row.presentationAvailable)}
              </div>
              {row.presentationLink && (
                <div>
                  <strong>Presentation Link:</strong>{" "}
                  <a
                    href={row.presentationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {row.presentationLink}
                  </a>
                </div>
              )}
              {row.setupRequirements && (
                <div>
                  <strong>Setup Requirements:</strong> {row.setupRequirements}
                </div>
              )}
              <div>
                <strong>Comfortable With Topic Change:</strong>{" "}
                {formatYesNo(row.comfortableWithTopicChange)}
              </div>
              <div>
                <strong>Can Make It To Enugu:</strong>{" "}
                {formatYesNo(row.canMakeItToEnugu)}
              </div>
              <div>
                <strong>Expected Arrival Dates:</strong>{" "}
                {formatExpectedArrivalDates(row.expectedArrivalDates)}
              </div>
            </div>
          </div>

          {/* ERV & Additional Info */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">ERV & Additional Info</h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Participate in ERV:</strong>{" "}
                {formatYesNo(row.participateInERV)}
              </div>
              {row.ervInvolvement && (
                <div>
                  <strong>ERV Involvement:</strong>{" "}
                  {row.ervInvolvement.replace(/_/g, " ")}
                </div>
              )}
            </div>
          </div>

          {/* Status & Dates */}
          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Status & Dates</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
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
                <strong>Created:</strong> {formatDate(row.createdAt)}
              </div>
              <div>
                <strong>Updated:</strong> {formatDate(row.updatedAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Speaker Applications</h1>
          <p className="text-gray-600">
            Manage speaker applications ({paginationData.total} total
            applications)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportsDropdown
            data={speakerData}
            columns={exportColumns}
            filename="speaker_applications"
            disabled={isLoading}
          />
        </div>
      </div>

      <ReusableTable
        data={speakerData}
        columns={columns}
        loading={isLoading}
        viewModalTitle="Speaker Details"
        viewModalContent={renderModalContent}
        emptyMessage="No speaker applications found"
        serverSidePagination
        pagination={paginationData}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
