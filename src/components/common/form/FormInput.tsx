"use client";

import React, { useState, forwardRef } from "react";
import { Icon } from "@iconify/react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  type: string;
  className?: string;
  isGrayInput?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, type = "text", className, isGrayInput, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    const inputType = type === "password" && isPasswordVisible ? "text" : type;

    return (
      <div className="relative w-full font-sans">
        {label && (
          <label className="block mb-1 font-bold text-dark text-base">
            {label}
          </label>
        )}

        <span className="relative" style={{ position: "relative" }}>
          <input
            ref={ref}
            type={inputType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full px-4 py-3 text-lg border rounded-xl focus-visible:outline-none focus-visible:ring-1 
              ${isFocused ? "border-lavendar-500" : "border-brown/35"} 
              ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-lavendar-500"} 
              disabled:pointer-events-none 
              ${isGrayInput ? "bg-gray-200 dark:bg-gray-700 border-none" : "bg-transparent"} ${className}`}
            {...props}
          />

          {type === "password" && (
            <span
              className="absolute -top-1 right-3 text-gray-600 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              <Icon
                icon={isPasswordVisible ? "mdi:eye" : "mdi:eye-off"}
                width={24}
              />
            </span>
          )}
        </span>

        {error && <span className="text-red-600 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
