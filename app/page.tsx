import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Timeline } from "@/components/timeline";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ParallaxBackground } from "@/components/parallax-background";
import { CustomCursor } from "@/components/custom-cursor";
import { ChatButton } from "@/components/chat-button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <ParallaxBackground />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        {/* <Testimonials /> */}
        <Contact />
      </main>
      <ChatButton />
      <Footer />
    </div>
  );
}
