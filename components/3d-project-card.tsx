"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project3DCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  client: string;
}

export function Project3DCard({
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl,
  client,
}: Project3DCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate rotation based on mouse position
    const rotateXValue = ((mouseY - centerY) / (rect.height / 2)) * -10;
    const rotateYValue = ((mouseX - centerX) / (rect.width / 2)) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  return (
    <motion.div
      ref={cardRef}
      className="h-full perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setScale(1.02)}
      onMouseLeave={() => {
        setRotateX(0);
        setRotateY(0);
        setScale(1);
      }}
      style={{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transition: "transform 0.1s ease-out",
      }}
    >
      <Card className="h-full overflow-hidden group border-2 border-border/50">
        <div className="relative h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <div className="flex gap-4">
              <Button size="sm" variant="default" asChild>
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-background/20"
                asChild
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </a>
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="p-6 relative z-10">
          <div className="text-sm text-primary mb-2">{client}</div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-foreground/80 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 4).map((tech, techIndex) => (
              <Badge key={techIndex} variant="secondary">
                {tech}
              </Badge>
            ))}
            {technologies.length > 4 && (
              <Badge variant="outline">+{technologies.length - 4} more</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
