import { Grid2X2, List } from "lucide-react";
import type { AdvertisementView } from "@/entities/Advertisement";
import { cn } from "@/shared/lib/utils";

interface AdvertisementViewSwitchProps {
  value: AdvertisementView;
  onChange: (value: AdvertisementView) => void;
}

export const AdvertisementViewSwitch = ({
  value,
  onChange,
}: AdvertisementViewSwitchProps) => {
  return (
    <div className="border-avito-border-primary bg-avito-bg-surface flex items-center rounded-lg border p-0.5">
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
          value === "grid"
            ? "bg-avito-bg-page text-avito-accent-primary"
            : "text-avito-text-secondary hover:bg-avito-bg-page",
        )}
        aria-label="Сетка"
      >
        <Grid2X2 className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => onChange("list")}
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
          value === "list"
            ? "bg-avito-bg-page text-avito-accent-primary"
            : "text-avito-text-secondary hover:bg-avito-bg-page",
        )}
        aria-label="Список"
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  );
};
