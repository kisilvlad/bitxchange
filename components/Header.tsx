"use client";

import { useState } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";
import { OpenLeadButton } from "@/components/OpenLeadButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navItems } from "@/lib/content";
import { cn } from "@/lib/cn";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--background)]/72 backdrop-blur-2xl">
      <div className="section-shell flex h-18 items-center justify-between gap-4 py-3">
        <a href="#top" className="flex items-center gap-3" aria-label="На головну">
          <span className="flex size-11 items-center justify-center rounded-2xl border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[color:var(--primary)] shadow-[0_16px_40px_var(--glow)]">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </span>
          <span className="leading-none">
            <span className="block text-sm font-black text-[color:var(--foreground)]">
              P2P Merchant
            </span>
            <span className="block text-xs font-semibold text-[color:var(--muted)]">
              Support
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основна навігація">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-bold text-[color:var(--muted)] transition hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <OpenLeadButton eventLabel="header_cta" hideIcon>
            Залишити заявку
          </OpenLeadButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--foreground)]"
            aria-label="Відкрити меню"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "section-shell grid overflow-hidden transition-all duration-200 lg:hidden",
          isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <nav className="grid gap-1 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-2 shadow-[var(--shadow-card)] backdrop-blur-2xl">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-bold text-[color:var(--muted)] transition hover:bg-[color:var(--surface)] hover:text-[color:var(--foreground)]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <OpenLeadButton
              eventLabel="mobile_header_cta"
              className="mt-2 w-full"
              hideIcon
            >
              Залишити заявку
            </OpenLeadButton>
          </nav>
        </div>
      </div>
    </header>
  );
}
