"use client";

import BuilderResisdencyImageUploadForm from "@/components/ui/BuilderResisdencyImageUploadForm";
import ConferenceImageUploadForm from "@/components/ui/ConferenceImageUploadForm";
import ReusableHeroSection from "@/components/ui/ReusableHeroSection";
import ScrollingText from "@/components/ui/Scrolling-text";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [isSharing, setIsSharing] = useState(false);
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const handleShare = async () => {
    if (!navigator.share) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy link:", err);
        toast.error("Sharing not supported. Please copy the URL manually.");
      }
      return;
    }

    setIsSharing(true);

    try {
      await navigator.share({
        title: "ETH-ENUGU - Generate Your DP",
        text: "Create your personalized display picture with ETH-ENUGU!",
        url: window.location.href,
      });
      console.log("Thanks for sharing!");
    } catch (err: unknown) {
      if ((err as { name?: string }).name !== "AbortError") {
        console.error("Error sharing:", err);
        try {
          await navigator.clipboard.writeText(window.location.href);
          toast.info("Link copied to clipboard instead!");
        } catch (clipboardErr) {
          console.error("Clipboard fallback failed:", clipboardErr);
        }
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <>
      <ReusableHeroSection
        hasImage={true}
        imageUrl={"/generate_DP_background/small_images/small_images.svg"}
        pageTitle="Generate DP"
        content={
          <>
            Over 500 people have already created their DPs, <br /> Create yours
            now.{" "}
          </>
        }
        btnFunc={handleShare}
        hasButton={true}
        buttonText={
          <>
            {isSharing ? null : "Share link"}{" "}
            <Icon
              icon={isSharing ? "eos-icons:loading" : "solar:share-outline"}
              width="24"
              height="24"
            />
          </>
        }
      />

      <section className="bg-[var(--background)] w-full flex items-center justify-center py-[60px] px-5 md:py-20 md:px-16">
        {from === "conference" ? (
          <ConferenceImageUploadForm />
        ) : (
          <BuilderResisdencyImageUploadForm />
        )}
      </section>

      <ScrollingText />
    </>
  );
}
