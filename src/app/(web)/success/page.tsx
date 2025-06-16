"use client";

import BuilderResidencySuccess from "@/components/ui/BuilderResidencyForm/BuilderResidencySuccess";
import ConferenceSuccess from "@/components/ui/ConferenceForm/ConferenceSuccess";
import PopupSuccess from "@/components/ui/popup-city-form/PopupSuccess";
import SpeakerSuccess from "@/components/ui/SpeakerForm/SpeakerSuccess";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const formType = searchParams.get("form");

  const renderSuccessComponent = () => {
    switch (formType) {
      case "Conference":
        return <ConferenceSuccess />;
      case "Speaker":
        return <SpeakerSuccess />;
      case "Popup-city":
        return <PopupSuccess />;
      case "BuilderResidency":
        return <BuilderResidencySuccess />;
      default:
        return <p>No form type found</p>;
    }
  };

  return (
    <div className="bg-[url('/conf-sumit-page-bg/AbstractBg.svg')] bg-no-repeat bg-cover min-h-[75vh] flex items-start justify-center px-[5%] py-20">
      {renderSuccessComponent()}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
}
