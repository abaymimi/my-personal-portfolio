"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "@/components/chat-interface";

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [useOpenAI, setUseOpenAI] = useState(true);

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg"
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-background border border-border rounded-lg shadow-xl z-50 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border flex justify-between items-center">
            <h3 className="font-bold">Chat with Me</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUseOpenAI(!useOpenAI)}
                className="text-xs"
              >
                {useOpenAI ? "Using AI" : "Using Fallback"}
              </Button>
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
          <ChatInterface useOpenAI={useOpenAI} />
        </div>
      )}
    </>
  );
}
