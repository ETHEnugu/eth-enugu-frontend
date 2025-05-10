"use client";

import { HTMLAttributes, useEffect, useState } from "react";

export type ToggleTypes = {
  className?: string;
  toggle: boolean;
  setToggled: (value: boolean) => void;
  id: string;
} & HTMLAttributes<HTMLDivElement>;

export default function Toggle({
  className,
  id,
  toggle,
  setToggled,
  ...props
}: ToggleTypes) {
  const [checked, setChecked] = useState(toggle);

  useEffect(() => {
    setChecked(toggle);
  }, [toggle]);

  const handleToggle = () => {
    setChecked((prevChecked) => !prevChecked);
    setToggled(!checked);
  };

  return (
    <div
      className={`py-1 rounded-full w-[4.3em] bg-gray-300 transition-all cursor-pointer ${className}`}
      onClick={handleToggle}
      role="switch"
      aria-checked={checked}
      {...props}
    >
      <input
        type="checkbox"
        name="checkbox"
        id={id}
        checked={checked}
        className="hidden"
        readOnly
      />
      <div
        className={`w-6 h-6 rounded-full bg-white transition-transform duration-150 ease-in-out ${
          checked ? "translate-x-[170%]" : "translate-x-1"
        }`}
      />
    </div>
  );
}
