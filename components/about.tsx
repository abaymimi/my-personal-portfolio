"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-md mx-auto rounded-lg overflow-hidden"
          >
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Profile"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
            <p className="text-foreground/80 mb-6">
              I am a full-stack developer with over 8+ years of experience and
              dedicated to delivering high-quality projects on schedule and
              within budget. I specialize in solving complex challenges and
              creating cost-effective, scalable solutions that save clients time
              and resources.
            </p>
            <p className="text-foreground/80 mb-6">
              With a strong blend of technical expertise and clear
              communication, I ensure every project is seamless and
              value-focused from inception to completion. My experience spans
              across various technologies and industries, from AI-based systems
              to educational apps.
            </p>
            <div className="flex flex-wrap gap-4">
              <Card className="w-full sm:w-auto flex-1">
                <CardContent className="p-6 text-center">
                  <h4 className="font-bold text-4xl text-primary mb-2">8+</h4>
                  <p className="text-sm text-foreground/70">Years Experience</p>
                </CardContent>
              </Card>
              <Card className="w-full sm:w-auto flex-1">
                <CardContent className="p-6 text-center">
                  <h4 className="font-bold text-4xl text-primary mb-2">13+</h4>
                  <p className="text-sm text-foreground/70">Major Projects</p>
                </CardContent>
              </Card>
              <Card className="w-full sm:w-auto flex-1">
                <CardContent className="p-6 text-center">
                  <h4 className="font-bold text-4xl text-primary mb-2">
                    100K+
                  </h4>
                  <p className="text-sm text-foreground/70">App Downloads</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
