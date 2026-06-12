"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Перемкнути тему"
      title="Перемкнути тему"
      onClick={toggleTheme}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb">
          <Moon className="theme-toggle__icon theme-toggle__icon--moon size-4" />
          <Sun className="theme-toggle__icon theme-toggle__icon--sun size-4" />
        </span>
      </span>
    </button>
  );
}
