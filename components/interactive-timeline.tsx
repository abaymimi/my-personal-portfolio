"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, ChevronDown, ChevronUp } from "lucide-react";

interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  description: string;
  type: "work" | "education";
  details?: string[];
}

interface InteractiveTimelineProps {
  items: TimelineItem[];
}

export function InteractiveTimeline({ items }: InteractiveTimelineProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Center line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"></div>

      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`relative mb-12 flex ${
            index % 2 === 0 ? "flex-row-reverse" : ""
          }`}
        >
          {/* Left side */}
          <div className="w-1/2 pr-8">
            {index % 2 !== 0 && (
              <Card
                className={`h-full cursor-pointer transition-all duration-300 ${
                  expandedIndex === index ? "shadow-lg border-primary/50" : ""
                }`}
                onClick={() => toggleExpand(index)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm font-medium text-primary">
                        {item.period}
                      </span>
                      <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                      <p className="text-foreground/70 mb-4">
                        {item.organization}
                      </p>
                    </div>
                    {item.details && (
                      <button
                        className="text-primary"
                        aria-label={
                          expandedIndex === index
                            ? "Collapse details"
                            : "Expand details"
                        }
                      >
                        {expandedIndex === index ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    )}
                  </div>

                  <p className="text-foreground/80">{item.description}</p>

                  <AnimatePresence>
                    {expandedIndex === index && item.details && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 space-y-2 list-disc pl-5">
                          {item.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="text-foreground/80"
                            >
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Center dot */}
          <div className="absolute left-1/2 top-6 transform -translate-x-1/2 z-10">
            <motion.div
              className="w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {item.type === "work" ? (
                <Briefcase className="h-5 w-5 text-primary" />
              ) : (
                <GraduationCap className="h-5 w-5 text-primary" />
              )}
            </motion.div>
          </div>

          {/* Right side */}
          <div className="w-1/2 pl-8">
            {index % 2 === 0 && (
              <Card
                className={`h-full cursor-pointer transition-all duration-300 ${
                  expandedIndex === index ? "shadow-lg border-primary/50" : ""
                }`}
                onClick={() => toggleExpand(index)}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm font-medium text-primary">
                        {item.period}
                      </span>
                      <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                      <p className="text-foreground/70 mb-4">
                        {item.organization}
                      </p>
                    </div>
                    {item.details && (
                      <button
                        className="text-primary"
                        aria-label={
                          expandedIndex === index
                            ? "Collapse details"
                            : "Expand details"
                        }
                      >
                        {expandedIndex === index ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    )}
                  </div>

                  <p className="text-foreground/80">{item.description}</p>

                  <AnimatePresence>
                    {expandedIndex === index && item.details && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 space-y-2 list-disc pl-5">
                          {item.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="text-foreground/80"
                            >
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
