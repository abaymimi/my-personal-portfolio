"use client";

import type React from "react";
import ReactMarkdown from "react-markdown";

import { useChat } from "ai/react";
import { useRef, useEffect, useState } from "react";
import { Send, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatInterfaceProps {
  useAI?: boolean;
  isExpanded?: boolean;
}

type FeedbackType = "positive" | "negative" | null;

interface MessageFeedback {
  [messageId: string]: FeedbackType;
}

export function ChatInterface({
  useAI = true,
  isExpanded = false,
}: ChatInterfaceProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
  } = useChat({
    api: "/api/chat",
    body: {
      useAI: useAI,
    },
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const [feedback, setFeedback] = useState<MessageFeedback>({});

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Reset error state when input changes
  useEffect(() => {
    if (input && hasError) {
      setHasError(false);
    }
  }, [input, hasError]);

  // Set error state when error occurs
  useEffect(() => {
    if (error) {
      setHasError(true);
    }
  }, [error]);

  const handleFeedback = (messageId: string, type: FeedbackType) => {
    setFeedback((prev) => ({
      ...prev,
      [messageId]: prev[messageId] === type ? null : type,
    }));
  };

  // Custom submit handler
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);

    // Force scroll to bottom after a small delay
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="relative flex flex-col h-full w-full">
      {/* Messages container with absolute positioning and bottom padding for input area */}
      <div className="absolute top-0 left-0 right-0 bottom-[76px] overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-foreground/70 my-8">
            <p>👋 Hi there! Ask me anything about Abebe.</p>
            <p className="text-sm mt-2">
              Some example questions:
              <br />
              "What are Abebe's skills?"
              <br />
              "Tell me about Abebe's experience"
              <br />
              "What projects has Abebe worked on?"
            </p>
            {!useAI && (
              <p className="text-xs mt-4 text-muted-foreground">
                Running in fallback mode with predefined responses
              </p>
            )}
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start gap-2 max-w-[80%] ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="h-8 w-8">
                  {message.role === "user" ? (
                    <>
                      <AvatarFallback>U</AvatarFallback>
                      <AvatarImage src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234B5563'%3E%3Cpath d='M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z'/%3E%3C/svg%3E" />
                    </>
                  ) : (
                    <>
                      <AvatarFallback>AI</AvatarFallback>
                      {/* <AvatarImage src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233B82F6'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z'/%3E%3C/svg%3E" /> */}
                    </>
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {message.role === "user" ? (
                      message.content
                    ) : (
                      <ReactMarkdown
                        components={{
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-2xl font-bold my-4"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2 className="text-xl font-bold my-3" {...props} />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3 className="text-lg font-bold my-2" {...props} />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul className="list-disc pl-6 my-2" {...props} />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol className="list-decimal pl-6 my-2" {...props} />
                          ),
                          li: ({ node, ...props }) => (
                            <li className="my-1" {...props} />
                          ),
                          p: ({ node, ...props }) => (
                            <p className="my-2" {...props} />
                          ),
                          code: ({ node, inline, ...props }) =>
                            inline ? (
                              <code
                                className="bg-muted-foreground/20 rounded px-1 py-0.5"
                                {...props}
                              />
                            ) : (
                              <code
                                className="block bg-muted-foreground/20 rounded p-2 my-2 overflow-x-auto"
                                {...props}
                              />
                            ),
                          blockquote: ({ node, ...props }) => (
                            <blockquote
                              className="border-l-4 border-primary pl-4 italic my-2"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>

                  {/* Feedback buttons for AI messages */}
                  {message.role === "assistant" && (
                    <div className="flex items-center mt-1 ml-1 space-x-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`h-6 w-6 rounded-full ${
                                feedback[message.id] === "positive"
                                  ? "bg-green-100 text-green-600"
                                  : "text-muted-foreground"
                              }`}
                              onClick={() =>
                                handleFeedback(message.id, "positive")
                              }
                            >
                              <ThumbsUp className="h-3 w-3" />
                              <span className="sr-only">Helpful</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>Helpful</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`h-6 w-6 rounded-full ${
                                feedback[message.id] === "negative"
                                  ? "bg-red-100 text-red-600"
                                  : "text-muted-foreground"
                              }`}
                              onClick={() =>
                                handleFeedback(message.id, "negative")
                              }
                            >
                              <ThumbsDown className="h-3 w-3" />
                              <span className="sr-only">Not helpful</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p>Not helpful</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      {feedback[message.id] && (
                        <span className="text-xs text-muted-foreground ml-1">
                          {feedback[message.id] === "positive"
                            ? "Thanks for your feedback!"
                            : "Thanks for letting us know"}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2 max-w-[80%]">
              <Avatar className="h-8 w-8">
                {/* <AvatarFallback>AI</AvatarFallback> */}
                {/* <AvatarImage src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233B82F6'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z'/%3E%3C/svg%3E" /> */}
              </Avatar>
              {/* <div className="rounded-lg px-4 py-2 bg-muted text-foreground">
                <div className="flex items-center space-x-1">
                  <div
                    className="w-2 h-2 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: "600ms" }}
                  ></div>
                </div>
              </div> */}
            </div>
          </div>
        )}

        {/* Error message */}
        {hasError && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription className="flex items-center justify-between">
              <span>Sorry, there was an error processing your request.</span>
              <Button variant="outline" size="sm" onClick={() => reload()}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input form - absolutely positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background">
        <form onSubmit={onSubmit} className="p-4">
          <div className="flex gap-2 max-w-screen-sm mx-auto">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask me anything..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
