"use client";
import { useSearchParams } from "next/navigation";
import Success from "@/components/ui/Success";
import { Suspense } from "react";
import Spinner from "@/components/common/spinner";

const SuccessPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <SuccessP />
    </Suspense>
  );
};

const SuccessP = () => {
  const searchParams = useSearchParams();
  const formType = searchParams.get("form");

  let successContent;

  switch (formType) {
    case "speaker":
      successContent = (
        <Success
          title="Application Received! 🎉"
          content="Thank you for applying to speak at ETH Enugu &lsquo;25. We&lsquo;re excited to review your proposal and will be in touch shortly."
        />
      );
      break;

    case "popup":
      successContent = (
        <Success
          title="You&lsquo;re In! 🎉"
          content="Thanks for registering for the ETH Enugu &lsquo;25 Pop-Up City. You&lsquo;ll receive updates via email or WhatsApp."
        />
      );
      break;

    case "builders":
      successContent = (
        <Success
          title="You&lsquo;re In! 🎉"
          content="Thanks for registering for the ETH Enugu &lsquo;25 Builder residency. You&lsquo;ll receive updates via email or WhatsApp."
        />
      );
      break;

    case "summit":
      successContent = (
        <Success
          title="You&lsquo;re In! 🎉"
          content=" Thanks for registering for the ETH Enugu &lsquo;25 Conference/Summit. You&lsquo;ll receive updates via email or WhatsApp."
        />
      );
      break;

    default:
      successContent = (
        <Success
          title="Success! 🎉"
          content="Thank you! Your form has been submitted successfully."
        />
      );
  }

  return <>{successContent}</>;
};

export default SuccessPage;
