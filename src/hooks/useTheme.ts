import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage or default to light
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial = stored || "light";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const html = document.documentElement;
    if (newTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    },
    toggleTheme,
    mounted,
  };
}
