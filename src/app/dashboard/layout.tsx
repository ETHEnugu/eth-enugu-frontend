import DashboardLayoutProvider from "@/layout/dashboard";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <DashboardLayoutProvider>{children}</DashboardLayoutProvider>;
}
