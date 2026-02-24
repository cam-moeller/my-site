import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/photography", label: "Photography" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight hover:opacity-80 transition-opacity"
        >
          Cameron Moeller
        </Link>

        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-foreground/60 transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
