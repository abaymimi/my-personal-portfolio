"use client";

import { useState, useEffect, useCallback } from "react";

interface UseMobileOptions {
  breakpoint?: number;
  detectTouch?: boolean;
}

export function useMobile(options: UseMobileOptions = {}): {
  isMobile: boolean;
  isTouch: boolean;
  orientation: "portrait" | "landscape";
} {
  const { breakpoint = 768, detectTouch = true } = options;

  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait"
  );

  // Debounced resize handler
  const debouncedResize = useCallback(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < breakpoint);
        setOrientation(
          window.innerWidth > window.innerHeight ? "landscape" : "portrait"
        );
      }, 100);
    };
  }, [breakpoint]);

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== "undefined") {
      // Check for mobile width
      const checkMobile = () => {
        setIsMobile(window.innerWidth < breakpoint);
        setOrientation(
          window.innerWidth > window.innerHeight ? "landscape" : "portrait"
        );
      };

      // Check for touch capability
      const checkTouch = () => {
        setIsTouch(
          detectTouch &&
            ("ontouchstart" in window ||
              navigator.maxTouchPoints > 0 ||
              // @ts-ignore - Some browsers use this non-standard property
              navigator.msMaxTouchPoints > 0)
        );
      };

      // Initial checks
      checkMobile();
      checkTouch();

      // Set up event listeners
      const handleResize = debouncedResize();
      window.addEventListener("resize", handleResize);

      // Listen for orientation changes specifically
      if ("orientation" in window) {
        window.addEventListener("orientationchange", checkMobile);
      }

      // Clean up
      return () => {
        window.removeEventListener("resize", handleResize);
        if ("orientation" in window) {
          window.removeEventListener("orientationchange", checkMobile);
        }
      };
    }

    return undefined;
  }, [breakpoint, detectTouch, debouncedResize]);

  return { isMobile, isTouch, orientation };
}
