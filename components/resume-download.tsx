"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResumeDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);

    // Simulate download delay
    setTimeout(() => {
      setIsDownloading(false);
      setIsComplete(true);

      // Reset after animation completes
      setTimeout(() => {
        setIsComplete(false);
      }, 2000);

      // Trigger actual download
      const link = document.createElement("a");
      link.href = "/resume.pdf"; // Update with your actual resume path
      link.download = "Abebe_Kayimo_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      className="relative overflow-hidden group"
    >
      <span className="flex items-center">
        {!isComplete ? (
          <>
            <FileText className="mr-2 h-4 w-4" />
            <span>Download Resume</span>
          </>
        ) : (
          <>
            <Check className="mr-2 h-4 w-4" />
            <span>Downloaded!</span>
          </>
        )}
      </span>

      {isDownloading && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5 }}
        />
      )}

      <motion.div
        className="absolute inset-0 bg-green-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isComplete ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      />
    </Button>
  );
}
