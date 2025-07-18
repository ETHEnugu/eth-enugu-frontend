"use client";
import { ReactNode } from "react";
import NextQueryProvider from "./NextQueryProvider";
import { Toaster } from "sonner";
import ThirdProviders from "./ThirdwebProvider";
import { AlchemyProviders } from "./AlchemyProvider";


export default function Providers({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <NextQueryProvider>
        <ThirdProviders>
          <AlchemyProviders>
            <Toaster position="bottom-right" closeButton />
            {children}
        </AlchemyProviders>
        </ThirdProviders>
      </NextQueryProvider>
    </>
  );
}
