"use client";

import { useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { motion } from "framer-motion";

export function ButtonWithEffect({ children, ...props }: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      {...props}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${props.className}`}
    >
      {isHovered && (
        <motion.span
          className="absolute inset-0 bg-white/10"
          initial={{ scale: 0, opacity: 0.5, x: 0, y: 0 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
      {children}
    </Button>
  );
}
