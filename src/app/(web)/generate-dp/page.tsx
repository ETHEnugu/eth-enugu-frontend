import React, { Suspense } from "react";
import GenerateDpClientWrapper from "./GenerateDpClientWrapper";
import Spinner from "@/components/common/spinner";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <GenerateDpClientWrapper />
    </Suspense>
  );
}
