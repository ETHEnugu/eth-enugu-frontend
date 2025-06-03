"use client";
import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <motion.div
      className="w-5 h-5 border-2 border-t-transparent border-white rounded-full"
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        duration: 1,
      }}
    />
  );
};

export default Spinner;
