"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ParallaxBackground() {
  const [windowHeight, setWindowHeight] = useState(0)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, windowHeight], [0, 100])
  const y2 = useTransform(scrollY, [0, windowHeight], [0, -100])

  useEffect(() => {
    setWindowHeight(window.innerHeight)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-20 pointer-events-none">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)/0.3) 1%, transparent 10%), 
                           radial-gradient(circle at 75% 75%, hsl(var(--primary)/0.3) 1%, transparent 10%)`,
          backgroundSize: "80px 80px",
          y: y1,
        }}
      />
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary)/0.2) 1%, transparent 10%)`,
          backgroundSize: "60px 60px",
          y: y2,
        }}
      />
    </div>
  )
}
