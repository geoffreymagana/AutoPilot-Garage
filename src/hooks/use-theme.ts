
"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function useTheme(storageKey: string, defaultTheme: Theme = "dark") {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return defaultTheme;
    }
    try {
      const item = window.localStorage.getItem(storageKey);
      return item ? (item as Theme) : defaultTheme;
    } catch (error) {
      console.error(error);
      return defaultTheme;
    }
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);

    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.error(error);
    }
  }, [theme, storageKey]);
  
  // This effect ensures the correct theme is applied on initial load if it differs from the system/default
  useEffect(() => {
      const storedTheme = localStorage.getItem(storageKey);
      if (storedTheme && storedTheme !== theme) {
          setTheme(storedTheme as Theme);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { theme, setTheme };
}
