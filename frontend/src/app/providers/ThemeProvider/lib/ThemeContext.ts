import { createContext } from "react";

export const ThemeMode = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

export type ResolvedTheme = "light" | "dark";

export interface ThemeContextProps {
  themeMode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setThemeMode: (mode: ThemeMode) => void;
  cycleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  themeMode: ThemeMode.SYSTEM,
  resolvedTheme: "light",
  setThemeMode: () => {},
  cycleTheme: () => {},
});
