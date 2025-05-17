"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "../common/button";

export default function ImageUploadForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formValues, imageFile);
    setFormValues({
      name: "",
    });
    setImageFile(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[720px] border border-[var(--color-peach-5)] rounded-3xl"
    >
      <div className="flex flex-col items-start gap-3 leading-[28.8px] p-8">
        <h2 className="text-[var(--color-dark)]">
          The First Ethereum Conference in South-east Nigeria
        </h2>
        <p className="text-[var(--color-dark)]">
          Add your image and name below to generate your DP.
        </p>
      </div>

      <div className="relative h-[335px] md:h-[640px] w-full">
        <Image
          src="/generate_DP_background/DP_background.svg"
          alt="background"
          fill
          className="object-cover"
        />

        {/* Image upload input */}
        <label
          htmlFor="image"
          className="absolute bottom-3 right-5 md:right-14 w-36 h-36 md:w-64 md:h-64 bg-[#707070] rounded-full border-[5px] md:border-[10px] border-[var(--background)] overflow-hidden flex items-center justify-center"
        >
          <div className="absolute w-[78%] border-2 border-dashed border-[#FFFFFF99]" />
          <div className="absolute h-[78%] border-2 border-dashed border-[#FFFFFF99]" />

          <input
            type="file"
            id="image"
            name="imageFile"
            className="absolute w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            onChange={handleImageChange}
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

      {/* Name input */}
      <div className="flex flex-col items-start gap-3 leading-[28.8px] p-8  ">
        <div className="w-full">
          <div className="border-[1px] border-[#2D2D2D] rounded-xl py-2 px-8 focus-within:border-[#707070] transition-colors duration-300">
            <div className="relative w-full">
              <input
                type="text"
                placeholder=" "
                name="name"
                id="name"
                value={formValues.name}
                onChange={handleInputChange}
                className="peer w-full border-none outline-none font-normal text-sm text-[#707070] bg-transparent pt-4 pb-1"
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
        </div>

        <Button
          type="submit"
          variant="default"
          design="rounded"
          className="flex items-center gap-3 w-full"
        >
          Generate my DP{" "}
          <Icon icon="solar:arrow-right-linear" width={18} height={18} />
        </Button>
      </div>
    </form>
  );
}
