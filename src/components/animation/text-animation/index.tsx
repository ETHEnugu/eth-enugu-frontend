/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import {
  motion,
  useAnimation,
  useInView,
  MotionProps,
  Variants,
  Transition,
} from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";
type RevealDirection = "right" | "left" | "top" | "bottom";

// LetterSlideUp - Animates each letter sliding up into view
export const LetterSlideUp = ({
  text,
  className,
  delay = 0,
  duration = 0.05,
  staggerChildren = 0.02,
  ...props
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  [key: string]: any;
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Split text into individual characters
  const letters = text.split("");

  const containerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: duration,
        // Using a carefully crafted cubic bezier for ultra smooth movement
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block relative", className)}
      aria-label={text}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      style={{ overflow: "hidden" }}
      {...props}
    >
      {letters.map((letter: string, index: number) => (
        <motion.span
          key={`${letter}-${index}`}
          className="inline-block relative"
          aria-hidden="true"
          variants={letterVariants}
          style={{
            display: "inline-block",
            overflow: "hidden",
            willChange: "transform",
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

// WordSlideUp - Animates words sliding up into view
export const WordSlideUp = ({
  text,
  className,
  delay = 0,
  duration = 0.3,
  staggerChildren = 0.1,
  ...props
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
  [key: string]: any;
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Split text into words
  const words = text.split(" ");

  const containerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: duration,
        // Using a carefully crafted cubic bezier for ultra smooth movement
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <motion.p
      ref={ref}
      className={cn("inline-flex flex-wrap gap-1", className)}
      aria-label={text}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      {...props}
    >
      {words.map((word: string, index: number) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden"
          style={{ position: "relative" }}
        >
          <motion.span
            className="inline-block"
            aria-hidden="true"
            variants={wordVariants}
            style={{
              display: "block",
              willChange: "transform",
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
};

interface ScrollFillProps {
  text: string;
  className?: string;
  fillColor?: string;
  emptyColor?: string;
  [key: string]: any;
}

// ScrollFill - Text that fills with color as you scroll
export const ScrollFill = ({
  text,
  className,
  fillColor = "text-blue-500",
  emptyColor = "text-gray-300",
  ...props
}: ScrollFillProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [fillPercentage, setFillPercentage] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      if (!textRef.current) return;

      const element = textRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the element is in view
      const visibleHeight =
        Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const elementHeight = rect.height;
      const percentVisible = Math.max(
        0,
        Math.min(100, (visibleHeight / elementHeight) * 100)
      );

      setFillPercentage(percentVisible);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(to right, currentColor ${fillPercentage}%, transparent ${fillPercentage}%)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  return (
    <div
      ref={textRef}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {/* Visible text with gradient fill */}
      <span
        className={cn("block", fillColor)}
        style={gradientStyle}
        aria-hidden="true"
      >
        {text}
      </span>

      {/* Invisible text for accessibility */}
      <span className="sr-only">{text}</span>

      {/* Background text */}
      <span
        className={cn("absolute top-0 left-0 block", emptyColor)}
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  );
};

interface RevealTextProps {
  text: string;
  className?: string;
  direction?: RevealDirection;
  duration?: number;
  delay?: number;
  [key: string]: any;
}

// RevealText - Text revealed by expanding div
export const RevealText = ({
  text,
  className,
  direction = "right",
  duration = 0.7,
  delay = 0,
  ...props
}: RevealTextProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // const directionMap: Record<RevealDirection, { [key: string]: Array<string | number> }> = {
  //   right: { width: ['0%', '100%'] },
  //   left: { width: ['0%', '100%'], x: ['100%', '0%'] },
  //   top: { height: ['0%', '100%'] },
  //   bottom: { height: ['0%', '100%'], y: ['100%', '0%'] },
  // };

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const revealVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.77, 0, 0.175, 1],
      },
    },
  };

  // Add the appropriate initial and animate properties based on direction
  if (direction === "right" || direction === "left") {
    revealVariants.hidden = {
      width: "0%",
      x: direction === "left" ? "100%" : undefined,
    };
    revealVariants.visible = {
      ...revealVariants.visible,
      width: "100%",
      x: direction === "left" ? "0%" : undefined,
    };
  } else {
    revealVariants.hidden = {
      height: "0%",
      y: direction === "bottom" ? "100%" : undefined,
    };
    revealVariants.visible = {
      ...revealVariants.visible,
      height: "100%",
      y: direction === "bottom" ? "0%" : undefined,
    };
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      {...props}
    >
      {/* The reveal element */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-transparent"
        variants={revealVariants}
      />

      {/* The text itself */}
      <span className="block" aria-label={text}>
        {text}
      </span>
    </motion.div>
  );
};

interface TypewriterTextProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  delay?: number;
  cursorColor?: string;
  showCursor?: boolean;
  [key: string]: any;
}

// TypewriterText - Simulates typing effect
export const TypewriterText = ({
  text,
  className,
  typingSpeed = 0.05,
  delay = 0,
  cursorColor = "text-blue-500",
  showCursor = true,
  ...props
}: TypewriterTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    if (isInView && !isTyping) {
      setIsTyping(true);
      let currentIndex = 0;

      const typingTimeout = setTimeout(() => {
        const typingInterval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayedText(text.substring(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
          }
        }, typingSpeed * 1000);

        return () => clearInterval(typingInterval);
      }, delay * 1000);

      return () => clearTimeout(typingTimeout);
    }
  }, [isInView, text, typingSpeed, delay, isTyping]);

  return (
    <div
      ref={ref}
      className={cn("inline-flex items-center", className)}
      aria-label={text}
      {...props}
    >
      <span>{displayedText}</span>
      {showCursor && (
        <motion.span
          className={cn("inline-block w-0.5 h-5 ml-0.5", cursorColor)}
          animate={{ opacity: [1, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.8,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

interface FadeInProps extends MotionProps {
  children: ReactNode;
  className?: string;
  direction?: Direction | null;
  distance?: number;
  delay?: number;
  duration?: number;
}

// FadeIn - Simple fade in animation for text blocks
export const FadeIn = ({
  children,
  className,
  direction = null,
  distance = 20,
  delay = 0,
  duration = 0.5,
  ...props
}: FadeInProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Set up direction-based animations
  const initial: { opacity: number; x?: number; y?: number } = { opacity: 0 };
  if (direction === "up") initial.y = distance;
  if (direction === "down") initial.y = -distance;
  if (direction === "left") initial.x = distance;
  if (direction === "right") initial.x = -distance;

  const variants: Variants = {
    hidden: initial,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      } as Transition,
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={controls}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};
