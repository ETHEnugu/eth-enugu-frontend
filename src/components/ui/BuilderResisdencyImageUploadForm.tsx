"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "../common/button";
import { toast } from "sonner";

export default function BuilderResidencyImageUploadForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formValues, setFormValues] = useState({
    name: "",
  });

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setImagePreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setImagePreviewUrl("");
    }
  }, [imageFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const generateDp = async (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = canvasRef.current;
      if (!canvas || !imageFile) {
        reject(new Error("Canvas or image file not available"));
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }

      // Setting canvas width to match the visual layout
      canvas.width = 720;
      canvas.height = 700;

      // Load background image
      const backgroundImg = new window.Image();
      backgroundImg.crossOrigin = "anonymous";
      backgroundImg.onload = () => {
        // Draw background
        ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

        // Load user image
        const userImg = new window.Image();
        userImg.crossOrigin = "anonymous";
        userImg.onload = () => {
          // Calculate the position and size for centered circular image
          const userImgSize = 220;
          const userImgX = (canvas.width - userImgSize) / 2;
          const userImgY = (canvas.height - userImgSize) / 2;

          // Save the context state
          ctx.save();

          // Draw the green background circle (shadow effect)
          ctx.fillStyle = "#016401";
          ctx.beginPath();
          ctx.arc(
            userImgX + userImgSize / 2 - 7,
            userImgY + userImgSize / 2 + 1,
            userImgSize / 2,
            0,
            2 * Math.PI
          );
          ctx.fill();

          // Draw the orange border circle
          ctx.strokeStyle = "#EE7E01";
          ctx.lineWidth = 1.7;
          ctx.beginPath();
          ctx.arc(
            userImgX + userImgSize / 2,
            userImgY + userImgSize / 2,
            userImgSize / 2,
            0,
            2 * Math.PI
          );
          ctx.stroke();

          // Create circular clipping path for the user image
          ctx.beginPath();
          ctx.arc(
            userImgX + userImgSize / 2,
            userImgY + userImgSize / 2,
            userImgSize / 2 - 2,
            0,
            2 * Math.PI
          );
          ctx.clip();

          // Draw user image (clipped to circle)
          ctx.drawImage(userImg, userImgX, userImgY, userImgSize, userImgSize);

          // Restore the context state to remove clipping
          ctx.restore();

          // Add name text background (orange bar)
          if (formValues.name) {
            // Position for the orange background (centered below the circle)
            const nameBoxWidth = 270;
            const nameBoxHeight = 25;
            const nameBoxX = (canvas.width - nameBoxWidth) / 2;
            const nameBoxY = userImgY + userImgSize + 20;

            // Draw orange background for name
            ctx.fillStyle = "#EE7E01";
            ctx.fillRect(nameBoxX, nameBoxY, nameBoxWidth, nameBoxHeight);

            // Add name text
            ctx.fillStyle = "white";
            ctx.font = "18px Arial, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Position text in the center of the orange background
            const textX = nameBoxX + nameBoxWidth / 2;
            const textY = nameBoxY + nameBoxHeight / 2;

            // Reset shadow settings
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            ctx.fillText(formValues.name, textX, textY);
          }

          // Converting canvas to blob and create download URL
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve(url);
            } else {
              reject(new Error("Failed to generate image blob"));
            }
          }, "image/png");
        };

        userImg.onerror = () => reject(new Error("Failed to load user image"));
        userImg.src = imagePreviewUrl;
      };

      backgroundImg.onerror = () =>
        reject(new Error("Failed to load background image"));
      backgroundImg.src = "/generate_DP_background/builder-residency-bg.jpg";
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile || !formValues.name) {
      toast.info("Please upload an image and enter your name");
      return;
    }
    setIsGenerating(true);

    try {
      const generatedUrl = await generateDp();
      setGeneratedImageUrl(generatedUrl);
      setHasSubmitted(true);
    } catch (error) {
      console.error("Error generating DP:", error);
      toast.error("Failed to generate DP. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImageUrl) {
      const link = document.createElement("a");
      link.href = generatedImageUrl;
      link.download = `${formValues.name || "builder-residency"}-dp.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setHasSubmitted(false);
    setGeneratedImageUrl("");
    setFormValues({ name: "" });
    setImageFile(null);
    if (generatedImageUrl) {
      URL.revokeObjectURL(generatedImageUrl);
    }
  };

  return (
    <div className="w-full max-w-[720px] mx-auto h-fit">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[720px] border border-[var(--color-peach-5)] rounded-3xl relative"
      >
        <div className="flex flex-col items-start gap-3 leading-[28.8px] p-8">
          <h2 className="text-[var(--color-dark)]">
            The First Ethereum Conference in South-east Nigeria
          </h2>
          <p className="text-[var(--color-dark)]">
            Add your image and name below to generate your DP.
          </p>
        </div>

        <div className="relative h-[335px] md:h-[700px] w-full">
          <Image
            src="/generate_DP_background/builder-residency-bg.jpg"
            alt="background"
            fill
            className="object-cover object-center"
          />

          {/* Image upload input */}
          <label
            htmlFor="image"
            className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] size-[110px] md:size-[220px] bg-transparent border-[#EE7E01] border-[1.7px] rounded-full flex items-center justify-center before:absolute before:w-full before:h-full before:top-[1px] before:bg-[#016401] before:left-[-7px] before:z-0 before:rounded-full"
          >
            <div className="relative  h-full w-full cursor-pointer ml-[-5%]  ">
              <div className="h-[75%] border-1 border-dashed border-[#FFFFFF99] z-50 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "></div>
              <div className="w-[75%] border-1 border-dashed border-[#FFFFFF99] z-50   absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "></div>
            </div>
            <input
              type="file"
              id="image"
              name="imageFile"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleImageChange}
              required
            />

            {/* Image preview */}
            {imagePreviewUrl && (
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <Image
                  src={imagePreviewUrl || "/placeholder.svg"}
                  alt="user image"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </label>
        </div>

        {/* Name display */}
        <div
          className={`w-full bg-[#EE7E01] absolute  translate-x-[-50%] max-w-[230px] md:max-w-[270px] overflow-hidden  left-[50%] z-10 flex items-center justify-center text-[10px] h-[20px] md:h-[25px] md:text-lg ${hasSubmitted ? " top-[66.6%] md:top-[65.8%] translate-y-[-50%]  " : "top-[61.3%] md:top-[62.4%] translate-y-[-50%] "} `}
        >
          <p className="text-center text-[10px] md:text-lg text-white overflow-hidden whitespace-nowrap">
            {formValues.name}
          </p>
        </div>

        {/* Name input */}
        <div className="flex flex-col items-start gap-3 leading-[28.8px] p-8">
          <div className="w-full">
            {hasSubmitted ? null : (
              <div className="border-[1px] border-[#2D2D2D] rounded-xl py-2 px-8 focus-within:border-[#707070] transition-colors duration-300">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder=" "
                    name="name"
                    id="name"
                    value={formValues.name}
                    maxLength={24}
                    onChange={handleInputChange}
                    className="peer w-full border-none outline-none font-normal text-sm text-[#707070] bg-transparent pt-4 pb-1"
                    required
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 top-0 text-gray-500 text-sm transform transition-all duration-300
                      peer-placeholder-shown:translate-y-[10px] peer-placeholder-shown:text-[#707070]
                      peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-[#707070]"
                  >
                    Enter your name here
                  </label>
                </div>
              </div>
            )}
          </div>

          {!hasSubmitted ? (
            <Button
              type="submit"
              variant="default"
              design="rounded"
              className="flex items-center gap-3 w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Icon
                    icon="solar:loading-linear"
                    className="w-5 h-5 animate-spin"
                  />
                  Generating DP...
                </>
              ) : (
                <>
                  Generate my DP
                  <Icon
                    icon="solar:arrow-right-linear"
                    width={18}
                    height={18}
                  />
                </>
              )}
            </Button>
          ) : (
            <div className="flex gap-3 w-full">
              <Button
                type="button"
                variant="default"
                design="rounded"
                className="w-full"
                onClick={handleDownload}
              >
                Download your DP Now
              </Button>
              <Button
                type="button"
                onClick={handleReset}
                variant="outline"
                className="px-4 rounded-xl"
              >
                <Icon
                  icon="solar:restart-linear"
                  width={18}
                  height={18}
                  color="black"
                />
              </Button>
            </div>
          )}
        </div>
      </form>

      {/* Hidden canvas for image generation */}
      <canvas ref={canvasRef} className="hidden" width={720} height={700} />
    </div>
  );
}
