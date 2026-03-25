import { Switch as SwitchPrimitive } from "radix-ui";
import * as React from "react";

import { cn } from "@/shared/lib/utils.ts";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[22px] w-[44px] shrink-0 items-center rounded-[16px] border border-transparent px-[2px]",
        "transition-colors outline-none",
        "focus-visible:ring-avito-accent-primary focus-visible:ring-offset-avito-bg-page focus-visible:ring-2 focus-visible:ring-offset-2",
        "data-[state=checked]:bg-avito-accent-primary",
        "data-[state=unchecked]:bg-avito-control-disabled",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-avito-bg-surface pointer-events-none block size-[18px] rounded-full shadow-sm ring-0",
          "transition-transform duration-200",
          "data-[state=unchecked]:translate-x-0",
          "data-[state=checked]:translate-x-[22px]",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
