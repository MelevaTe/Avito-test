import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/shared/lib/utils.ts";

const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "cursor-pointer",
    "transition-colors outline-none",
    "disabled:pointer-events-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "focus-visible:ring-2 focus-visible:ring-avito-accent-primary focus-visible:ring-offset-2",
    "focus-visible:ring-offset-avito-bg-page",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-avito-accent-primary text-avito-accent-primary-foreground",
          "hover:bg-avito-accent-primary-hover",
          "disabled:bg-avito-disabled-bg",
          "disabled:text-avito-disabled-foreground",
        ].join(" "),
        outline: [
          "border border-avito-border-primary",
          "bg-avito-bg-surface text-avito-text-primary",
          "hover:bg-avito-bg-page",
          "disabled:bg-avito-disabled-bg",
          "disabled:border-avito-disabled-bg",
          "disabled:text-avito-disabled-foreground",
        ].join(" "),
        warning: [
          "bg-avito-warning-bg text-avito-warning-text",
          "hover:brightness-[0.98]",
        ].join(" "),
        danger: [
          "border border-avito-danger-border-secondary",
          "bg-avito-danger-bg-secondary text-avito-text-muted-secondary",
          "hover:brightness-[0.98]",
        ].join(" "),
        filterReset: [
          "bg-avito-bg-surface text-avito-text-secondary",
          "hover:bg-avito-bg-page",
          "disabled:bg-avito-disabled-bg",
          "disabled:text-avito-disabled-foreground",
        ].join(" "),
        ghost: [
          "bg-transparent text-avito-text-primary",
          "hover:bg-avito-bg-page",
          "disabled:bg-transparent",
          "disabled:text-avito-disabled-foreground",
        ].join(" "),
        pagination: [
          "border border-avito-border-primary bg-avito-bg-surface text-avito-text-primary",
          "hover:bg-avito-bg-page",
          "disabled:bg-avito-disabled-bg",
          "disabled:border-avito-disabled-bg",
          "disabled:text-avito-disabled-foreground",
        ].join(" "),
      },
      size: {
        control: [
          "h-[38px] rounded-[8px] px-3 py-2",
          "gap-2 text-[16px] font-normal leading-[140%]",
          "[&_svg:not([class*='size-'])]:size-[18px]",
        ].join(" "),
        small: [
          "h-6 rounded-[4px] px-[7px]",
          "gap-2 text-[12px] font-normal leading-[140%]",
          "[&_svg:not([class*='size-'])]:size-3.5",
        ].join(" "),
        ai: [
          "h-8 rounded-[8px] px-[7px]",
          "gap-2.5 text-[16px] font-normal leading-[140%]",
          "[&_svg:not([class*='size-'])]:size-[18px]",
        ].join(" "),
        filterReset: [
          "h-[41px] rounded-[8px] px-3",
          "gap-2.5 text-[16px] font-normal leading-[140%]",
          "[&_svg:not([class*='size-'])]:size-[18px]",
        ].join(" "),
        pagination: [
          "h-8 min-w-8 rounded-[8px] px-[7px]",
          "gap-2 text-[16px] font-normal leading-[140%]",
          "[&_svg:not([class*='size-'])]:size-[18px]",
        ].join(" "),
        icon: ["size-10 rounded-[8px]", "[&_svg:not([class*='size-'])]:size-[18px]"].join(
          " ",
        ),
      },
      disableStyles: {
        true: "pointer-events-none",
        false: "disabled:pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "control",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button };
