"use client";
import { ReactNode } from "react";
import NextQueryProvider from "./NextQueryProvider";
import { Toaster } from "sonner";
import ThirdProviders from "./ThirdwebProvider";
import RootProviders from "./rootProviders";

export default function Providers({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <NextQueryProvider>
        <ThirdProviders>
          <RootProviders>
            <Toaster position="bottom-right" closeButton />
            {children}
          </RootProviders>
        </ThirdProviders>
      </NextQueryProvider>
    </>
  );
}
