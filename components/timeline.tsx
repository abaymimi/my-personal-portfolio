"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap } from "lucide-react";

const timelineItems = [
  {
    title: "Sr. Full Stack Developer and Team Lead",
    organization: "Kifiya Financial Technologies",
    period: "Jan 2024 - Present",
    description:
      "Leading a team of developers working on an AI-based credit scoring system, developing both frontend and backend components, and integrating machine learning models.",
    type: "work",
  },
  {
    title: "Sr. Full Stack Developer",
    organization: "Safari English Academy",
    period: "Jan 2024 - Dec 2024",
    description:
      "Developed web and mobile applications for online English learning, implementing features like live course lessons using WebRTC and push notifications.",
    type: "work",
  },
  {
    title: "Mobile App Developer",
    organization: "Crowdbotics Inc.",
    period: "Dec 2022 - Jan 2024",
    description:
      "Developed the Gapless Music mobile app with features like crossfade, caching system, and offline mode for uninterrupted audio playback.",
    type: "work",
  },
  {
    title: "Full Stack Developer",
    organization: "Tiltek Technologies",
    period: "Oct 2021 - Dec 2022",
    description:
      "Created Trabahanapp (9000jobs), a job search platform with features like dynamic job search, resume building, and application tracking.",
    type: "work",
  },
  {
    title: "Mobile App Developer",
    organization: "Super Technologies",
    period: "May 2018 - May 2021",
    description:
      "Developed EthioMatric Mobile App, an educational app for Grade 12 students with past exams, answers, and performance tracking. Achieved over 100K downloads.",
    type: "work",
  },
  {
    title: "B.Sc in Software Engineering",
    organization: "Addis Ababa Institute of Technology",
    period: "2016 - 2020",
    description:
      "Completed Bachelor's degree in Software Engineering with focus on web and mobile application development.",
    type: "education",
  },
];

export function Timeline() {
  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Experience & Education</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            My professional journey and educational background that have shaped
            my skills and expertise in full-stack development.
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline center line - visible on medium screens and up */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden md:block"></div>

          {/* Timeline center line - visible on small screens */}
          <div className="absolute left-8 h-full w-0.5 bg-border md:hidden"></div>

          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative mb-12 ${
                index % 2 === 0
                  ? "md:ml-auto md:pl-12 md:pr-0 md:text-left"
                  : "md:mr-auto md:pr-12 md:pl-0 md:text-left"
              } md:w-1/2 pl-16 md:pl-0 md:pr-0`}
            >
              {/* Timeline dot - medium screens and up */}
              <div
                className={`absolute top-6 ${
                  index % 2 === 0 ? "md:-left-5" : "md:-right-6"
                } left-8 md:left-auto transform -translate-x-1/2 md:translate-x-0 w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10 hidden md:flex`}
              >
                {item.type === "work" ? (
                  <Briefcase className="h-5 w-5 text-primary" />
                ) : (
                  <GraduationCap className="h-5 w-5 text-primary" />
                )}
              </div>

              {/* Timeline dot - small screens */}
              <div
                className={`absolute top-6 left-8 transform -translate-x-1/2 w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10 md:hidden`}
              >
                {item.type === "work" ? (
                  <Briefcase className="h-5 w-5 text-primary" />
                ) : (
                  <GraduationCap className="h-5 w-5 text-primary" />
                )}
              </div>

              <Card className="h-full">
                <CardContent className="p-6">
                  <span className="text-sm font-medium text-primary">
                    {item.period}
                  </span>
                  <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                  <p className="text-foreground/70 mb-4">{item.organization}</p>
                  <p className="text-foreground/80">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
