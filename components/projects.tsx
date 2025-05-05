"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Loopana - making work smoother & faster",
    description:
      "Meet Loopana — your no-code platform for internal operations automation. Designed for operations managers and lean teams, Loopana helps you replace spreadsheets, manual check-ins, and scattered workflows with smart, repeatable processes. Build, automate, and optimize",
    image: "/Loopana-project-101.png?height=400&width=600",
    technologies: [
      "Next.js",
      "React.js",
      "NodeJS",
      "Tailwind CSS",
      "Redis",
      "PostgreSQL",
      "AWS",
      "Machine Learning",
    ],
    liveUrl: "#",
    githubUrl: "#",
    client: "Personal Project",
  },
  {
    title: "AI-Based Priority Timer",
    description:
      "PriorityTimer is an AI based sleek productivity app based on the Pomodoro technique, offering customizable timers, task management, and deep work-friendly design. It uses AI to analyze your habits, recommend optimal focus/break durations, and intelligently prioritize tasks.",
    image: "/pomodoro-project-102.png?height=400&width=600",
    technologies: [
      "Next.js",
      "React.js",
      "NodeJS",
      "Tailwind CSS",
      "Redis",
      "PostgreSQL",
      "AWS",
      "Machine Learning",
    ],
    liveUrl: "#",
    githubUrl: "#",
    client: "Personal Project",
  },
  {
    title: "AI-Based Credit Scoring System",
    description:
      "An AI-based credit scoring system designed to evaluate borrowers' creditworthiness using machine learning models. The system processes financial and transactional data to generate accurate credit scores.",
    image: "/credit-scoring-102.png?height=400&width=600",
    technologies: [
      "Next.js",
      "React.js",
      "Django",
      "FastAPI",
      "Tailwind CSS",
      "Redis",
      "PostgreSQL",
      "AWS",
      "Machine Learning",
    ],
    liveUrl: "#",
    githubUrl: "#",
    client: "Kifiya Financial Technologies",
  },
  {
    title: "Online English Language Learning App",
    description:
      "A web and mobile app for online English learning, helping learners from beginner to advanced levels improve their English fluency with live course lessons.",
    image: "/safari-english-photo.png?height=400&width=600",
    technologies: [
      "React.js",
      "React Native",
      "Node.js",
      "Tailwind CSS",
      "DynamoDB",
      "WebRTC",
      "Firebase",
    ],
    liveUrl: "#",
    githubUrl: "https://github.com/abaymimi/Safari-English-Academy.git",
    client: "Safari English Academy",
  },
  {
    title: "Gapless Music Mobile App",
    description:
      "An app that lets users listen to audio tracks without any pauses between them, creating a smoother, uninterrupted listening experience with features like crossfade and offline playback.",
    image: "/gapples_music_app.png?height=400&width=600",
    technologies: ["Next.js", "Node.js", "Redux", "React Native", "SQLite"],
    liveUrl: "#",
    githubUrl: "#",
    client: "Crowdbotics Inc.",
  },
  {
    title: "EthioMatric Mobile App",
    description:
      "An educational app for Grade 12 students preparing for national exams, offering 8+ years of past exams with detailed answers and explanations. The app has over 100K downloads.",
    image: "/ethiomatric-photo-1022.png?height=400&width=600",
    technologies: [
      "React Native",
      "PHP",
      "Firebase",
      "SQLite",
      "AWS Lambda",
      "Google Cloud Functions",
    ],
    liveUrl: "#",
    githubUrl: "#",
    client: "Super Technologies",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Here are some of the key projects I've worked on throughout my
            career. Each project represents unique challenges and solutions in
            web and mobile development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-4">
                      <Button size="sm" variant="default" asChild>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
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
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="text-sm text-primary mb-2 flex items-center">
                    {project.client}
                    {project.client === "Personal Project" && (
                      <Flame className="h-4 w-4 ml-2 text-orange-500" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-foreground/80 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 4 && (
                      <Badge variant="outline">
                        +{project.technologies.length - 4} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
