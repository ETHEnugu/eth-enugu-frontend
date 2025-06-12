"use client";
import { ReactNode } from "react";
import NextQueryProvider from "./NextQueryProvider";
import { Toaster } from "sonner";

export default function Providers({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <NextQueryProvider>
        <Toaster position="top-center" closeButton />
        {children}
      </NextQueryProvider>
    </>
  );
}
