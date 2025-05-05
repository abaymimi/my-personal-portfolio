import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold">
              Abebe Kayimo
            </Link>
            <p className="text-foreground/70 mt-2 max-w-md">
              Senior Full Stack Developer and Team Lead with over 8+ years of
              experience in delivering high-quality projects.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://github.com/abaymimi"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/abebe-kayimo/"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="#"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-foreground/70">
          <p>© {new Date().getFullYear()} Abebe Kayimo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
