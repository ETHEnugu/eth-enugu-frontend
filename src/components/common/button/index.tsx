import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
// import Image from "next/image";
import { Icon } from "@iconify/react";

const buttonVariants = cva(
  "button inline-flex items-center justify-center whitespace-nowrap rounded-3xl text-base font-medium border transition-all duration-150 ease-in-out hover:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-550 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-green-550 text-white border-dark hover:bg-green-750",
        accent: "bg-green-550/40 text-white",
        outline: "bg-transparent text-green-550 border border-green-550",
        plain: "bg-transparent text-dark",
      },
      size: {
        default: "px-4 py-3",
        sm: "py-2.5 px-3 text-sm",
        lg: "py-4 px-8",
        icon: "p-2.5",
      },
      design: {
        default: "rounded-none",
        curved: "rounded-lg",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      design: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    children: React.ReactNode;
    isLoading?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      design,
      asChild = false,
      isLoading,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? "span" : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, design, className }))}
        ref={ref}
        {...props}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icon
            icon={"icon-park-outline:loading-two"}
            width={24}
            height={24}
            // alt="Spinner"
            className="animate-spin opacity-70"
          />
        ) : (
          <>{children}</>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
