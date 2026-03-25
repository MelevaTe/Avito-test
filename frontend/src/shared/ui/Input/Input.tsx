import { cva, type VariantProps } from "class-variance-authority";
import { CircleXIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/lib/utils";

const inputRootVariants = cva(
  "group flex w-full items-center rounded-[8px] border px-3 py-[5px] transition-[border-color,box-shadow,background-color]",
  {
    variants: {
      size: {
        default: "h-8",
      },
      tone: {
        default:
          "bg-avito-bg-surface border-avito-border-primary focus-within:border-avito-accent-primary focus-within:ring-[3px] focus-within:ring-[color:rgba(24,144,255,0.2)]",
        warning:
          "bg-avito-bg-surface border-avito-warning-border focus-within:border-avito-warning-border focus-within:ring-[3px] focus-within:ring-[color:rgba(255,169,64,0.2)]",
        danger:
          "bg-avito-bg-surface border-avito-danger-border focus-within:border-avito-danger-border focus-within:ring-[3px] focus-within:ring-[color:rgba(236,34,31,0.15)]",
        search:
          "bg-avito-input-bg border-avito-border-primary focus-within:border-avito-accent-primary focus-within:ring-[3px] focus-within:ring-[color:rgba(24,144,255,0.2)]",
      },
      disabled: {
        false: "",
        true: "cursor-not-allowed opacity-50",
      },
    },
    defaultVariants: {
      size: "default",
      tone: "default",
      disabled: false,
    },
  },
);

const inputElementVariants = cva(
  "typo-body-sm w-full min-w-0 border-none bg-transparent p-0 text-avito-text-primary outline-none shadow-none placeholder:text-avito-text-muted disabled:cursor-not-allowed file:border-0 file:bg-transparent file:text-sm file:font-medium selection:bg-avito-accent-primary selection:text-avito-accent-primary-foreground",
  {
    variants: {
      size: {
        default: "h-[22px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputRootVariants> & {
    label?: string;
    error?: string;
    hint?: string;
    warning?: boolean;
    requiredMark?: boolean;
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
    onClear?: () => void;
    wrapperClassName?: string;
    inputClassName?: string;
  };

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className,
    wrapperClassName,
    inputClassName,
    label,
    error,
    hint,
    warning = false,
    requiredMark = false,
    leftSlot,
    rightSlot,
    onClear,
    id,
    size = "default",
    tone: toneProp = "default",
    disabled,
    value,
    ...inputProps
  } = props;

  const hasError = Boolean(error);
  const describedBy = id ? `${id}-message` : undefined;

  const tone = hasError ? "danger" : warning ? "warning" : toneProp;
  const showClear = Boolean(onClear && value);

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

      <div
        data-slot="input-root"
        className={cn(inputRootVariants({ size, tone, disabled }), className)}
      >
        {leftSlot ? (
          <span className="text-avito-text-secondary mr-2 flex shrink-0 items-center justify-center">
            {leftSlot}
          </span>
        ) : null}

        <input
          ref={ref}
          id={id}
          disabled={disabled}
          value={value}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          data-slot="input"
          className={cn(inputElementVariants({ size }), inputClassName)}
          {...inputProps}
        />

        {showClear ? (
          <button
            type="button"
            tabIndex={-1}
            onClick={onClear}
            aria-label="Очистить"
            className="text-avito-text-muted hover:text-avito-text-secondary ml-1 flex shrink-0 cursor-pointer items-center"
          >
            <CircleXIcon className="size-4" />
          </button>
        ) : null}

        {rightSlot ? (
          <span className="text-avito-text-secondary ml-2 flex shrink-0 items-center justify-center">
            {rightSlot}
          </span>
        ) : null}
      </div>
    </div>
  );
});

Input.displayName = "Input";

export { Input };
