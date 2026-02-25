import { Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight">
            Cameron Moeller
          </h1>
          <p className="text-lg text-foreground/70 leading-relaxed max-w-prose">
            Software engineer. 
            This is where I share things I'm working on, things I'm thinking about, and photos I've taken.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/cam-moeller"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/cameron-moeller"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="mailto:cameroncmoeller@gmail.com"
            aria-label="Email"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
