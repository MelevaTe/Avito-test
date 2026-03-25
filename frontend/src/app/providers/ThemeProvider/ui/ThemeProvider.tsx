import React, { useEffect, useMemo, useState, useCallback } from "react";

import { LOCAL_STORAGE_THEME_MODE_KEY } from "@/shared/const/localstorage";

import {
  ThemeContext,
  ThemeMode,
  type ResolvedTheme,
  type ThemeMode as ThemeModeType,
} from "../lib/ThemeContext";
import { usePrefersDark } from "../lib/usePrefersDark";

function readInitialMode(): ThemeModeType {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_THEME_MODE_KEY);
    if (
      stored === ThemeMode.LIGHT ||
      stored === ThemeMode.DARK ||
      stored === ThemeMode.SYSTEM
    ) {
      return stored;
    }
  } catch (e) {
    console.log("Ошибка в readInitialMode", e);
  }
  return ThemeMode.SYSTEM;
}

interface ThemeProviderProps {
  children?: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const prefersDark = usePrefersDark();

  const [themeMode, setThemeModeState] = useState<ThemeModeType>(() => {
    if (typeof window === "undefined") return ThemeMode.SYSTEM;
    return readInitialMode();
  });

  const resolvedTheme: ResolvedTheme =
    themeMode === ThemeMode.SYSTEM
      ? prefersDark
        ? "dark"
        : "light"
      : themeMode === ThemeMode.DARK
        ? "dark"
        : "light";

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_THEME_MODE_KEY, themeMode);
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  const setThemeMode = useCallback((mode: ThemeModeType) => {
    setThemeModeState(mode);
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeModeState((prev) => {
      switch (prev) {
        case ThemeMode.LIGHT:
          return ThemeMode.DARK;
        case ThemeMode.DARK:
          return ThemeMode.SYSTEM;
        case ThemeMode.SYSTEM:
        default:
          return ThemeMode.LIGHT;
      }
    });
  }, []);

  const value = useMemo(
    () => ({
      themeMode,
      resolvedTheme,
      setThemeMode,
      cycleTheme,
    }),
    [themeMode, resolvedTheme, setThemeMode, cycleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
