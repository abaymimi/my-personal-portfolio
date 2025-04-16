"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

interface SkillsRadarProps {
  skills: Skill[];
}

export function SkillsRadar({ skills }: SkillsRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 400;
    canvas.height = 400;

    // Draw radar chart
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    // Group skills by category
    const categories = [...new Set(skills.map((skill) => skill.category))];
    const skillsByCategory = categories.map((category) => ({
      category,
      skills: skills.filter((skill) => skill.category === category),
    }));

    // Draw background circles
    ctx.strokeStyle = "rgba(100, 100, 100, 0.1)";
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw category sections
    const totalCategories = categories.length;
    const anglePerCategory = (Math.PI * 2) / totalCategories;

    // Draw lines for each category
    ctx.strokeStyle = "rgba(100, 100, 100, 0.2)";
    for (let i = 0; i < totalCategories; i++) {
      const angle = i * anglePerCategory;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      );
      ctx.stroke();

      // Draw category label
      const labelX = centerX + Math.cos(angle) * (radius + 20);
      const labelY = centerY + Math.sin(angle) * (radius + 20);
      ctx.fillStyle = "rgba(100, 100, 100, 0.8)";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(categories[i], labelX, labelY);
    }

    // Draw skills for each category
    skillsByCategory.forEach((category, categoryIndex) => {
      const categoryAngle = categoryIndex * anglePerCategory;
      const skillsInCategory = category.skills.length;

      category.skills.forEach((skill, skillIndex) => {
        const skillAngle =
          categoryAngle + (anglePerCategory * skillIndex) / skillsInCategory;
        const skillRadius = (radius * skill.level) / 100;

        const x = centerX + Math.cos(skillAngle) * skillRadius;
        const y = centerY + Math.sin(skillAngle) * skillRadius;

        // Draw skill point
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "hsl(var(--primary))";
        ctx.fill();

        // Draw skill label
        const labelX = centerX + Math.cos(skillAngle) * (skillRadius + 15);
        const labelY = centerY + Math.sin(skillAngle) * (skillRadius + 15);
        ctx.fillStyle = "rgba(100, 100, 100, 0.8)";
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(skill.name, labelX, labelY);
      });
    });
  }, [skills]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex justify-center"
    >
      <Card className="p-4">
        <CardContent className="p-4">
          <h3 className="text-xl font-bold mb-4 text-center">Skills Radar</h3>
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="mx-auto"
            aria-label="Skills radar chart"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
