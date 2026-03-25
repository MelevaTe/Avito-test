import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

const textareaVariants = cva(
  "typo-body w-full rounded-[8px] border bg-avito-bg-surface px-4 py-2 text-avito-text-primary outline-none transition-[border-color,box-shadow,background-color] placeholder:text-avito-text-muted resize-none",
  {
    variants: {
      tone: {
        default:
          "border-avito-border-primary focus:border-avito-accent-primary focus:ring-[3px] focus:ring-[color:rgba(24,144,255,0.2)]",
        warning:
          "border-avito-warning-border focus:border-avito-warning-border focus:ring-[3px] focus:ring-[color:rgba(255,169,64,0.2)]",
        danger:
          "border-avito-danger-border focus:border-avito-danger-border focus:ring-[3px] focus:ring-[color:rgba(236,34,31,0.15)]",
      },
      disabled: {
        false: "",
        true: "cursor-not-allowed opacity-50",
      },
    },
    defaultVariants: {
      tone: "default",
      disabled: false,
    },
  },
);

export type TextareaProps = React.ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants> & {
    label?: string;
    error?: string;
    hint?: string;
    warning?: boolean;
    requiredMark?: boolean;
    showCount?: boolean;
    wrapperClassName?: string;
    textareaClassName?: string;
  };

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const {
    className,
    wrapperClassName,
    textareaClassName,
    label,
    error,
    hint,
    warning = false,
    requiredMark = false,
    showCount = false,
    id,
    disabled,
    rows = 3,
    value,
    maxLength,
    ...textareaProps
  } = props;

  const hasError = Boolean(error);
  const hasHint = Boolean(hint) && !hasError;

  const tone = hasError ? "danger" : warning ? "warning" : "default";
  const currentLength = typeof value === "string" ? value.length : 0;

  return (
    <div className={cn("w-full", wrapperClassName)}>
      {label ? (
        <label
          htmlFor={id}
          className="typo-body-sm-strong text-avito-text-primary mb-2 block"
        >
          {requiredMark ? (
            <span
              className="text-avito-danger-text mr-1"
              aria-hidden="true"
            >
              *
            </span>
          ) : null}
          {label}
        </label>
      ) : null}

      <textarea
        ref={ref}
        id={id}
        rows={rows}
        disabled={disabled}
        value={value}
        maxLength={maxLength}
        aria-invalid={hasError || undefined}
        data-slot="textarea"
        className={cn(textareaVariants({ tone, disabled }), className, textareaClassName)}
        {...textareaProps}
      />

      {showCount && maxLength ? (
        <p className="typo-body-sm text-avito-text-secondary mt-1 text-right">
          {currentLength} / {maxLength}
        </p>
      ) : null}

      {hasError ? (
        <p className="typo-body-sm text-avito-danger-text mt-1">{error}</p>
      ) : hasHint ? (
        <p className="typo-body-sm text-avito-text-secondary mt-1">{hint}</p>
      ) : null}
    </div>
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
