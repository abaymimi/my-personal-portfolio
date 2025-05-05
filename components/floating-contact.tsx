"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute bottom-16 left-0 bg-background rounded-lg shadow-lg border border-border p-4 w-64"
          >
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Get in touch</h3>
              <a
                href="mailto:abebe.kayimo@example.com"
                className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>abebekayew@gmail.com</span>
              </a>
              <a
                href="tel:+251939416681"
                className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+251939416681</span>
              </a>
              <Button className="w-full" asChild>
                <a href="#contact">Send a message</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className={`rounded-full p-3 shadow-lg ${
          isOpen
            ? "bg-muted text-foreground"
            : "bg-primary text-primary-foreground"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  );
}
