"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const KEY = "athletix_admin_theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = (localStorage.getItem(KEY) || "dark") as "dark" | "light";
    setTheme(stored);
    document.documentElement.dataset.theme = stored;
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem(KEY, next);
  };

  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-label="Toggle theme">
      {theme === "dark" ? <Moon /> : <Sun />}
      {theme === "dark" ? "Dark mode" : "Light mode"}
    </button>
  );
}
