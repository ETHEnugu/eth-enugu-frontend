import { ReactNode } from "react";
import { Button } from "../common/button";
import Image from "next/image";

interface ReusableHeroSectionProps {
  pageTitle: string;
  content: string | ReactNode;
  hasButton?: boolean;
  buttonText?: string | ReactNode;
  hasImage?: boolean;
  imageUrl?: string;
}

export default function ReusableHeroSection({
  pageTitle,
  content,
  hasButton = false,
  buttonText = null,
  hasImage = false,
  imageUrl = "",
}: ReusableHeroSectionProps) {
  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[50vh] bg-[url('/bg/hero_bg.svg')] bg-no-repeat bg-cover bg-center gap-6 text-center py-10 px-5">
      <h1 className="custom-scroll-heading">{pageTitle}</h1>

      <div className="flex items-start gap-3">
        {hasImage && (
          <Image
            src={imageUrl}
            alt="Decorative small image"
            width={73}
            height={25}
            className="hidden md:block w-[73px] h-[25px]"
          />
        )}

        <div className="flex flex-col items-center gap-4 md:gap-6">
          <p className="max-w-[220px] md:max-w-[367px]">{content}</p>

          {hasImage && imageUrl && (
            <Image
              src={imageUrl}
              alt="Responsive small image"
              width={73}
              height={25}
              className="block md:hidden w-[73px] h-[25px]"
            />
          )}

          {hasButton && buttonText && (
            <Button
              type="button"
              variant="plain"
              design="rounded"
              className="bg-[var(--background)] gap-3 text-sm"
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
