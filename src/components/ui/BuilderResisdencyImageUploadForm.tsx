"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "../common/button";

export default function BuilderResisdencyImageUploadForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
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
    alert("Form submitted");
    setFormValues({
      name: "",
    });
    setImageFile(null);
    setHasSubmitted(true);
  };

  return (
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
          className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]  size-[110px] md:size-[220px] bg-[#707070] rounded-full  overflow-hidden flex items-center justify-center"
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
            required
          />

          {/* Image preview */}
          {imagePreviewUrl && (
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <Image
                src={imagePreviewUrl || "/placeholder.svg"}
                alt="user image"
                fill
                className="object-contain"
              />
            </div>
          )}
        </label>
      </div>

      {/* name display */}
      <div className="w-full  absolute top-[61.3%] md:top-[62.4%] translate-x-[-50%] max-w-[130px] md:max-w-[270px] overflow-hidden translate-y-[-50%]  left-[50%] bg-transparent z-10 flex items-center justify-center  text-[10px] md:text-lg">
        <p className="text-center  text-[10px] md:text-lg text-white overflow-hidden whitespace-nowrap ">
          {" "}
          {formValues.name}{" "}
        </p>
      </div>

      {/* Name input */}
      <div className="flex flex-col items-start gap-3 leading-[28.8px] p-8  ">
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
                  maxLength={20}
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

        <Button
          type="submit"
          variant="default"
          design="rounded"
          className="flex items-center gap-3 w-full"
        >
          {hasSubmitted ? (
            "Download your DP Now"
          ) : (
            <>
              Generate my DP{" "}
              <Icon icon="solar:arrow-right-linear" width={18} height={18} />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
