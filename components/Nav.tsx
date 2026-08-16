"use client";

const tabs = [
  { href: "#about", label: "About", color: "hover:text-violet" },
  { href: "#experience", label: "Experience", color: "hover:text-pink" },
  { href: "#projects", label: "Projects", color: "hover:text-lime" },
  { href: "#contact", label: "Contact", color: "hover:text-cyan" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-border/80 bg-ink/85 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-medium text-paper">
          Jan<span className="text-violet">.</span>
        </a>
        <ul className="hidden gap-7 text-sm font-medium sm:flex">
          {tabs.map((tab) => (
            <li key={tab.href}>
              <a
                href={tab.href}
                className={`text-paper-muted transition-colors ${tab.color}`}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full bg-violet px-4 py-2 text-sm font-medium text-ink transition-transform hover:scale-105"
        >
          Say hi
        </a>
      </nav>
    </header>
  );
}
