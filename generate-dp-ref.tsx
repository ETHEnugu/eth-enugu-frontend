"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "@/components/common/button";

export default function ConferenceImageUploadForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
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

  const generateDP = async (): Promise<string> => {
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

      // Set canvas dimensions (matching the visual layout)
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
          // Calculate position and size for user image (matching the CSS positioning)
          const userImgWidth = 205;
          const userImgHeight = 220;
          const userImgX = canvas.width * 0.88 - userImgWidth;
          const userImgY = canvas.height * 0.44 - userImgHeight / 2;

          // Draw user image
          ctx.drawImage(
            userImg,
            userImgX,
            userImgY,
            userImgWidth,
            userImgHeight
          );

          // Add name text
          if (formValues.name) {
            ctx.fillStyle = "white";
            ctx.font = "18px Arial, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            // Position text below the user image (matching CSS positioning)
            const textX = userImgX + userImgWidth / 2;
            const textY = userImgY + userImgHeight + 20;

            // Add text shadow for better visibility
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;

            ctx.fillText(formValues.name, textX, textY);
          }

          // Convert canvas to blob and create download URL
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
      backgroundImg.src = "/generate_DP_background/conference-bg.jpg";
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile || !formValues.name) {
      alert("Please upload an image and enter your name");
      return;
    }

    setIsGenerating(true);

    try {
      const generatedUrl = await generateDP();
      setGeneratedImageUrl(generatedUrl);
      setHasSubmitted(true);
    } catch (error) {
      console.error("Error generating DP:", error);
      alert("Failed to generate DP. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImageUrl) {
      const link = document.createElement("a");
      link.href = generatedImageUrl;
      link.download = `${formValues.name || "conference"}-dp.png`;
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
    <div className="w-full max-w-[720px] mx-auto">
      <form
        onSubmit={handleSubmit}
        className="w-full border border-gray-200 rounded-3xl relative bg-white"
      >
        <div className="flex flex-col items-start gap-3 leading-[28.8px] p-8">
          <h2 className="text-gray-900 text-xl font-semibold">
            The First Ethereum Conference in South-east Nigeria
          </h2>
          <p className="text-gray-700">
            Add your image and name below to generate your DP.
          </p>
        </div>

        <div className="relative h-[335px] md:h-[700px] w-full">
          <Image
            src="/generate_DP_background/conference-bg.jpg"
            alt="Conference background"
            fill
            className="object-cover object-center rounded-lg"
          />

          {/* Image upload input */}
          <label
            htmlFor="image"
            className="absolute top-[44%] translate-y-[-50%] left-[89%] lg:left-[88%] translate-x-[-91%] w-[95px] h-[100px] md:w-[205px] md:h-[220px] bg-gray-500 overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors"
          >
            <div className="absolute w-[78%] border-2 border-dashed border-white/60" />
            <div className="absolute h-[78%] border-2 border-dashed border-white/60" />

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
            {imagePreviewUrl ? (
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={imagePreviewUrl || "/placeholder.svg"}
                  alt="User image preview"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="text-white text-center text-xs md:text-sm">
                <Icon
                  icon="solar:camera-add-linear"
                  className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2"
                />
                Upload Image
              </div>
            )}
          </label>
        </div>

        {/* Name display */}
        <div className="w-full absolute top-[61.4%] md:top-[58.5%] lg:top-[59%] max-w-[95px] md:max-w-[220px] overflow-hidden translate-y-[-50%] left-[89.3%] lg:left-[88.2%] translate-x-[-91%] z-10 flex items-center justify-center text-xs md:text-lg text-white">
          <p className="text-center text-[10px] md:text-lg text-white overflow-hidden whitespace-nowrap drop-shadow-lg">
            {formValues.name}
          </p>
        </div>

        {/* Name input */}
        <div className="flex flex-col items-start gap-3 leading-[28.8px] p-8">
          <div className="w-full">
            {!hasSubmitted && (
              <div className="border border-gray-300 rounded-xl py-2 px-4 focus-within:border-gray-500 transition-colors duration-300">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder=" "
                    name="name"
                    id="name"
                    maxLength={20}
                    value={formValues.name}
                    onChange={handleInputChange}
                    className="peer w-full border-none outline-none font-normal text-sm text-gray-700 bg-transparent pt-4 pb-1"
                    required
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 top-0 text-gray-500 text-sm transform transition-all duration-300 peer-placeholder-shown:translate-y-[10px] peer-placeholder-shown:text-gray-500 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-gray-700"
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
              className="flex items-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3"
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
                onClick={handleDownload}
                className="flex items-center gap-3 flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl py-3"
              >
                <Icon icon="solar:download-linear" width={18} height={18} />
                Download your DP Now
              </Button>
              <Button
                type="button"
                onClick={handleReset}
                variant="outline"
                className="px-4 rounded-xl"
              >
                <Icon icon="solar:restart-linear" width={18} height={18} />
              </Button>
            </div>
          )}
        </div>
      </form>

      {/* Hidden canvas for image generation */}
      <canvas ref={canvasRef} className="hidden" width={720} height={700} />

      {/* Preview of generated image */}
      {generatedImageUrl && (
        <div className="mt-8 p-4 border border-gray-200 rounded-xl bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Your Generated DP:
          </h3>
          <div className="relative w-full max-w-md mx-auto aspect-square">
            <Image
              src={generatedImageUrl || "/placeholder.svg"}
              alt="Generated DP"
              fill
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
