"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
}

export function LazySection({ children, threshold = 0.1 }: LazySectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  useEffect(() => {
    if (isInView && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isInView, isLoaded]);

  return (
    <div ref={ref} className="min-h-[100px]">
      {isLoaded ? children : null}
    </div>
  );
}
