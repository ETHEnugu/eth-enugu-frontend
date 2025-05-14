"use client";

import React, { useState, forwardRef } from "react";
import { Icon } from "@iconify/react";

interface FloatInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FloatInput = forwardRef<HTMLInputElement, FloatInputProps>(
  ({ label, type = "text", error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="relative w-full mb-6">
        <div className="relative">
          <input
            ref={ref} // Forward the ref to the input element
            {...props}
            type={inputType}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`peer block w-full px-3 pt-4 pb-2 text-base bg-transparent border rounded-xl appearance-none focus:outline-none focus:ring-1 transition-all
            ${isFocused || hasValue ? "border-blue-500" : "border-foreground/35"}
            ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}
          `}
          />
          <label
            className={`absolute left-3 top-0 text-base text-brown font-medium transition-all duration-200 transform origin-left
            peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100
            ${isFocused || hasValue ? "scale-75 -translate-y-1" : "scale-100 translate-y-3"}
          `}
          >
            {label}
          </label>
          {type === "password" && (
            <span
              className="absolute right-3 top-3 cursor-pointer text-foreground/70"
              onClick={togglePasswordVisibility}
            >
              <Icon
                icon={showPassword ? "mdi:eye" : "mdi:eye-off"}
                width={24}
              />
            </span>
          )}
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

FloatInput.displayName = "FloatInput";

export default FloatInput;
