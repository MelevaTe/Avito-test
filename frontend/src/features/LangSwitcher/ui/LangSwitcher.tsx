import { Globe } from "lucide-react";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/Button/Button";

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
  const { t, i18n } = useTranslation("common");

  const toggleLang = async () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={t("switchLanguage")}
      onClick={toggleLang}
      className={cn(className)}
    >
      <Globe className="size-5" />
    </Button>
  );
});
