"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import DashboardSidebar from "./sidebar";
import Image from "next/image";

export default function DashboardLayoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full h-screen overflow-x-hidden px-4">
        <header className="w-full flex items-center bg-white p-4 shadow-md mt-2 rounded-xl">
          <SidebarTrigger />
          <span className="ml-6 inline-flex items-center">
            <Image
              src="/icon.svg"
              width={32}
              height={32}
              alt="EthEnugu Icon"
              title="EthEnugu Icon"
              aria-label="EthEnugu Icon"
              aria-labelledby="EthEnugu Icon"
            />
            <h4 className="ml-4">EthEnugu Dashboard</h4>
          </span>
        </header>
        {children}
      </main>
    </SidebarProvider>
  );
}
