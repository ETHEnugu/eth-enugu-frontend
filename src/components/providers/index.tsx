"use client";
import { ReactNode } from "react";
import NextQueryProvider from "./NextQueryProvider";
import { Toaster } from "sonner";
import ThirdProviders from "./ThirdwebProvider";

export default function Providers({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <NextQueryProvider>
        <ThirdProviders>
          <Toaster position="bottom-right" closeButton />
          {children}
        </ThirdProviders>
      </NextQueryProvider>
    </>
  );
}
