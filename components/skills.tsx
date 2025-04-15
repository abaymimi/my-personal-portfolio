"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Database, Layout, Layers, Smartphone, Server, Cloud } from "lucide-react"

const skills = [
  {
    title: "Frontend Development",
    description: "Creating responsive and interactive user interfaces with modern frameworks and libraries.",
    icon: <Layout className="h-10 w-10 text-primary" />,
    technologies: ["React.js", "React Native", "Vue.js", "Angular", "Tailwind CSS", "Material UI", "HTML5", "CSS3"],
  },
  {
    title: "Backend Development",
    description: "Building robust server-side applications and APIs to power web applications.",
    icon: <Server className="h-10 w-10 text-primary" />,
    technologies: ["Node.js", "Python", "Java", "PHP", "Django", "FastAPI", "RESTful APIs"],
  },
  {
    title: "Database Management",
    description: "Designing and implementing efficient database solutions for data storage and retrieval.",
    icon: <Database className="h-10 w-10 text-primary" />,
    technologies: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "DynamoDB", "Redis", "CosmosDB"],
  },
  {
    title: "Mobile Development",
    description: "Developing cross-platform mobile applications for iOS and Android.",
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    technologies: ["React Native", "Firebase", "Push Notifications", "Offline Storage", "Mobile UI/UX"],
  },
  {
    title: "Cloud Services",
    description: "Leveraging cloud platforms for scalable, reliable application deployment.",
    icon: <Cloud className="h-10 w-10 text-primary" />,
    technologies: ["AWS EC2", "AWS S3", "AWS Lambda", "Firebase", "Google Cloud Functions"],
  },
  {
    title: "DevOps",
    description: "Implementing continuous integration and deployment pipelines for efficient development workflows.",
    icon: <Layers className="h-10 w-10 text-primary" />,
    technologies: ["Git", "Bitbucket", "Docker", "CI/CD", "AWS", "Vercel"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">My Skills</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            With over 5 years of experience in full-stack development, I've worked with a variety of technologies and
            frameworks to create scalable, efficient solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="mb-4">{skill.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
                  <p className="text-foreground/80 mb-4">{skill.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
