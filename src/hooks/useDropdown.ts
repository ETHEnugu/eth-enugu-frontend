"use client";
import { useState } from "react";

export const useDropdown = <T>(initialValue: T) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const selectValue = (value: T) => {
    setSelectedValue(value);
    setIsVisible(false);
  };

  return {
    isVisible,
    selectedValue,
    toggleVisibility,
    selectValue,
    setIsVisible,
  };
};
