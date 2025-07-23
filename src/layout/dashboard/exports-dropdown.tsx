/* eslint-disable */
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import * as XLSX from "xlsx";

export interface ExportColumn {
  key: string;
  header: string;
  // Optional custom formatter for export
  exportFormat?: (value: any, row: any) => string | number;
}

export interface ExportsDropdownProps {
  data: any[];
  columns: ExportColumn[];
  filename?: string;
  disabled?: boolean;
  className?: string;
}

const ExportsDropdown: React.FC<ExportsDropdownProps> = ({
  data,
  columns,
  filename = "export",
  disabled = false,
  className = "",
}) => {
  // Helper function to format data for export
  const formatDataForExport = () => {
    return data.map((row) => {
      const formattedRow: any = {};
      columns.forEach((col) => {
        const value = row[col.key];
        if (col.exportFormat) {
          formattedRow[col.header] = col.exportFormat(value, row);
        } else {
          // Default formatting for common data types
          if (value instanceof Date) {
            formattedRow[col.header] = value.toLocaleDateString();
          } else if (typeof value === "boolean") {
            formattedRow[col.header] = value ? "Yes" : "No";
          } else if (Array.isArray(value)) {
            formattedRow[col.header] = value.join(", ");
          } else if (value === null || value === undefined) {
            formattedRow[col.header] = "";
          } else {
            formattedRow[col.header] = String(value);
          }
        }
      });
      return formattedRow;
    });
  };

  // Export to Excel formats
  const exportToExcel = (format: "xlsx" | "xls" | "csv") => {
    if (!data || data.length === 0) {
      alert("No data available to export");
      return;
    }

    const formattedData = formatDataForExport();
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Auto-size columns
    const columnWidths = columns.map((col) => {
      const maxLength = Math.max(
        col.header.length,
        ...formattedData.map((row) => String(row[col.header] || "").length)
      );
      return { wch: Math.min(maxLength + 2, 50) }; // Cap at 50 characters
    });
    worksheet["!cols"] = columnWidths;

    const timestamp = new Date().toISOString().split("T")[0];
    const fileName = `${filename}_${timestamp}.${format}`;

    XLSX.writeFile(workbook, fileName);
  };

  // Export to TXT format
  const exportToTxt = () => {
    if (!data || data.length === 0) {
      alert("No data available to export");
      return;
    }

    const formattedData = formatDataForExport();

    // Create header row
    const headers = columns.map((col) => col.header).join("\t");

    // Create data rows
    const rows = formattedData.map((row) =>
      columns.map((col) => row[col.header] || "").join("\t")
    );

    const txtContent = [headers, ...rows].join("\n");

    // Create and download file
    const blob = new Blob([txtContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const timestamp = new Date().toISOString().split("T")[0];
    link.download = `${filename}_${timestamp}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!data || data.length === 0) {
    return (
      <Button disabled variant="outline" className={className}>
        <Download className="h-4 w-4 mr-2" />
        Export (No Data)
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={disabled} className={className}>
          <Download className="h-4 w-4 mr-2" />
          Export ({data.length} records)
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white">
        <div className="px-2 py-1.5 text-sm font-semibold text-gray-700">
          Excel Formats
        </div>
        <DropdownMenuItem onClick={() => exportToExcel("xlsx")}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export as XLSX
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportToExcel("xls")}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export as XLS
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportToExcel("csv")}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-sm font-semibold text-gray-700">
          Text Format
        </div>
        <DropdownMenuItem onClick={exportToTxt}>
          <FileText className="h-4 w-4 mr-2" />
          Export as TXT
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportsDropdown;
