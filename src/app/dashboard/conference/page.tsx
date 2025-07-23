"use client";

import { Badge } from "@/components/ui/badge";
import { CONFERENCE } from "@/config/ENDPOINTS";
import { useGetQuery } from "@/hooks/useApi";
import ReusableTable, { TableColumn } from "@/layout/dashboard/resuable-table";
import ExportsDropdown, {
  ExportColumn,
} from "@/layout/dashboard/exports-dropdown";

// Define a type for a conference registration row
type ConferenceRegistration = {
  fullName: string;
  email: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  whatsappNumber: string;
  social?: string;
  willBeLive?: boolean;
  certificateNeeded?: string;
  roleDescription?: string;
  otherRole?: string;
  walletAddress?: string;
  referralSource?: string;
  openToVolunteer?: boolean;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function ConferencePage() {
  // const [currentPage, setCurrentPage] = useState(1);
  // const setLimit = 10;
  const { data, isLoading } = useGetQuery(
    `${CONFERENCE.GET_ALL}`,
    "get_conference"
  );

  const conference_data: ConferenceRegistration[] =
    data?.paginatedData?.registrations || [];
  const paginationData = {
    total: data?.paginatedData?.total || 0,
    page: data?.paginatedData?.page || 1,
    limit: data?.paginatedData?.limit || 10,
    totalPages: data?.paginatedData?.totalPages || 1,
  };

  // Export columns for ExportsDropdown
  const exportColumns: ExportColumn[] = [
    { key: "fullName", header: "Full Name" },
    { key: "email", header: "Email" },
    { key: "gender", header: "Gender" },
    { key: "country", header: "Country" },
    { key: "state", header: "State" },
    { key: "city", header: "City" },
    { key: "whatsappNumber", header: "WhatsApp Number" },
    { key: "social", header: "Social" },
    {
      key: "willBeLive",
      header: "Will Be Live",
      exportFormat: (value) => (value ? "Yes" : "No"),
    },
    { key: "certificateNeeded", header: "Certificate Needed" },
    {
      key: "roleDescription",
      header: "Role Description",
      exportFormat: (value) =>
        value ? String(value).replace(/,/g, ", ").replace(/_/g, " ") : "",
    },
    { key: "otherRole", header: "Other Role" },
    { key: "walletAddress", header: "Wallet Address" },
    { key: "referralSource", header: "Referral Source" },
    {
      key: "openToVolunteer",
      header: "Open To Volunteer",
      exportFormat: (value) => (value ? "Yes" : "No"),
    },
    {
      key: "status",
      header: "Status",
    },
    {
      key: "createdAt",
      header: "Created At",
      exportFormat: (value) => (value ? new Date(value).toLocaleString() : ""),
    },
    {
      key: "updatedAt",
      header: "Updated At",
      exportFormat: (value) => (value ? new Date(value).toLocaleString() : ""),
    },
  ];

  const columns: TableColumn[] = [
    {
      key: "fullName",
      header: "Full Name",
      render: (value) => <div className="font-medium">{value}</div>,
    },
    {
      key: "email",
      header: "Email",
      render: (value) => <div className="text-sm text-gray-600">{value}</div>,
    },
    {
      key: "gender",
      header: "Gender",
      render: (value) => <Badge variant="outline">{value}</Badge>,
    },
    {
      key: "country",
      header: "Country",
    },
    {
      key: "status",
      header: "Status",
      render: (value) => (
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
      render: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  const renderModalContent = (row: ConferenceRegistration) => (
    <div className="space-y-6 px-4">
      <div className="flex items-center space-x-3">
        {/* No icon since User is not imported */}
        <div>
          <h3 className="text-lg font-semibold">{row.fullName}</h3>
          <p className="text-sm text-gray-500">{row.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {/* Personal Information */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3 flex items-center">
            {/* No icon since User is not imported */}
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
            <div>
              <strong>Social:</strong>{" "}
              {row.social ? (
                <a
                  href={row.social}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {row.social}
                </a>
              ) : (
                "N/A"
              )}
            </div>
          </div>
        </div>

        {/* Event Participation */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3 flex items-center">
            {/* No icon since Calendar is not imported */}
            Event Participation
          </h4>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Will Be Live:</strong> {row.willBeLive ? "Yes" : "No"}
            </div>
            <div>
              <strong>Certificate Needed:</strong> {row.certificateNeeded}
            </div>
          </div>
        </div>

        {/* Web3 & Professional Info */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-3 flex items-center">
            {/* No icon since Globe is not imported */}
            Web3 & Professional Info
          </h4>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Role Description:</strong>{" "}
              {row.roleDescription
                ? row.roleDescription.replace(/,/g, ", ").replace(/_/g, " ")
                : "N/A"}
            </div>
            <div>
              <strong>Other Role:</strong> {row.otherRole || "None"}
            </div>
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
              <strong>Open To Volunteer:</strong>{" "}
              {row.openToVolunteer ? "Yes" : "No"}
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
                variant={row.status === "APPROVED" ? "default" : "secondary"}
              >
                {row.status}
              </Badge>
            </div>
            <div>
              <strong>Created:</strong>{" "}
              {row.createdAt ? new Date(row.createdAt).toLocaleString() : "N/A"}
            </div>
            <div>
              <strong>Updated:</strong>{" "}
              {row.updatedAt ? new Date(row.updatedAt).toLocaleString() : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const handlePageChange = () => {
    // setCurrentPage(page);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Conference Registrations</h1>
          <p className="text-gray-600">
            Manage event registrations ({paginationData.total} total
            registrations)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportsDropdown
            data={conference_data}
            columns={exportColumns}
            filename="conference_registrations"
            disabled={isLoading}
          />
        </div>
      </div>

      <ReusableTable
        data={conference_data}
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
