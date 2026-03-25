import { CheckIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        [
          "peer bg-avito-bg-surface size-4 shrink-0 rounded-[2px] border transition-[border-color,box-shadow,background-color] outline-none",
          "border-avito-border-primary",
          "data-[state=checked]:border-avito-accent-primary",
          "data-[state=checked]:bg-avito-accent-primary",
          "data-[state=checked]:text-avito-accent-primary-foreground",
          "focus-visible:border-avito-accent-primary",
          "focus-visible:ring-[3px] focus-visible:ring-[color:rgba(24,144,255,0.2)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
        ].join(" "),
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current"
      >
        <CheckIcon
          className="size-3"
          strokeWidth={2.5}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
