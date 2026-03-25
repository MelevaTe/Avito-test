import { Moon, Sun, Monitor } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

import { ThemeMode } from "@/app/providers/ThemeProvider/lib/ThemeContext";
import { useTheme } from "@/app/providers/ThemeProvider/lib/useTheme";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/Button/Button";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { t } = useTranslation("common");
  const { themeMode, cycleTheme } = useTheme();

  const Icon =
    themeMode === ThemeMode.LIGHT ? Sun : themeMode === ThemeMode.DARK ? Moon : Monitor;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={t("switchTheme")}
      onClick={cycleTheme}
      className={cn(className)}
    >
      <Icon />
    </Button>
  );
});
