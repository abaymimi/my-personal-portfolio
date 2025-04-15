"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO at TechStart",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "Working with this developer was an absolute pleasure. They delivered our project on time and exceeded our expectations with their attention to detail and creative solutions.",
  },
  {
    name: "Michael Chen",
    role: "Product Manager at InnovateCorp",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "I was impressed by the level of professionalism and technical expertise. Our web application is not only beautiful but also performs exceptionally well.",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director at GrowthLabs",
    image: "/placeholder.svg?height=100&width=100",
    content:
      "The redesign of our company website transformed our online presence. We've seen a significant increase in user engagement and conversion rates since the launch.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">What People Say</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Don't just take my word for it. Here's what clients and colleagues have to say about working with me.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="h-10 w-10 text-primary/30 mb-4" />
                  <p className="text-foreground/80 mb-6 flex-grow">{testimonial.content}</p>
                  <div className="flex items-center">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-foreground/70">{testimonial.role}</p>
                    </div>
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
