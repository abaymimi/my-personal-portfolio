"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  X,
  Minimize2,
  Maximize2,
  Expand,
  Minimize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "@/components/chat-interface";
import { motion, AnimatePresence } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const isMobile = useMobile();

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && isMinimized) {
      setIsMinimized(false);
    }
  };

  // Close expanded view when pressing escape
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isExpanded) {
        setIsExpanded(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isExpanded]);

  // Prevent body scroll when expanded on mobile
  useEffect(() => {
    if (isExpanded && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded, isMobile]);

  return (
    <>
      {!isOpen && (
        <Button
          className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              height: isMinimized ? "60px" : "500px",
            }}
            animate={{
              opacity: 1,
              y: 0,
              height: isMinimized ? "60px" : isExpanded ? "100vh" : "500px",
              width: isMinimized ? "200px" : isExpanded ? "100vw" : "80vw",
              maxWidth: isMinimized ? "200px" : isExpanded ? "100vw" : "384px",
              top: isExpanded ? 0 : "auto",
              right: isExpanded ? 0 : "1.5rem",
              bottom: isExpanded ? 0 : "1.5rem",
              borderRadius: isExpanded ? 0 : "0.5rem",
            }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`fixed bg-background border border-border shadow-xl z-50 flex flex-col overflow-hidden ${
              isExpanded ? "inset-0" : ""
            }`}
          >
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="font-bold">Chat with Me</h3>
              <div className="flex items-center space-x-2">
                {!isMinimized && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUseAI(!useAI)}
                      className="text-xs"
                    >
                      {useAI ? "Using Gemini" : "Using Fallback"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleExpand}
                      aria-label={
                        isExpanded ? "Exit full screen" : "Full screen"
                      }
                    >
                      {isExpanded ? (
                        <Minimize className="h-4 w-4" />
                      ) : (
                        <Expand className="h-4 w-4" />
                      )}
                    </Button>
                  </>
                )}
                {!isExpanded && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMinimize}
                    aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                  >
                    {isMinimized ? (
                      <Maximize2 className="h-4 w-4" />
                    ) : (
                      <Minimize2 className="h-4 w-4" />
                    )}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {!isMinimized && (
              <ChatInterface useAI={useAI} isExpanded={isExpanded} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
