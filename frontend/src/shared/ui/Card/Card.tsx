import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils.ts";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, interactive = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border-avito-border-primary bg-avito-bg-surface text-avito-text-primary w-full rounded-xl border shadow-sm",
          interactive && "transition-shadow hover:shadow-md",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
