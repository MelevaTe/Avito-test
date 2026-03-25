import { cva } from "class-variance-authority";

import { cn } from "@/shared/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select/Select";

export interface SelectOption {
  value: string;
  label: string;
}

const selectTriggerVariants = cva(
  "typo-body-sm flex h-8 w-full items-center justify-between rounded-[8px] border bg-avito-bg-surface px-3 py-[5px] text-avito-text-primary shadow-none outline-none transition-[border-color,box-shadow,background-color] disabled:cursor-not-allowed disabled:opacity-50",
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
    },
    defaultVariants: {
      tone: "default",
    },
  },
);

export interface FormSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;

  label?: string;
  error?: string;
  hint?: string;
  warning?: boolean;
  requiredMark?: boolean;
  disabled?: boolean;
  name?: string;

  wrapperClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

export const FormSelect = ({
  value,
  onValueChange,
  options,
  placeholder,
  label,
  error,
  hint,
  warning = false,
  requiredMark = false,
  disabled = false,
  name,
  wrapperClassName,
  triggerClassName,
  contentClassName,
}: FormSelectProps) => {
  const hasError = Boolean(error);
  const hasHint = Boolean(hint) && !hasError;
  const describedBy = name ? `${name}-message` : undefined;

  const tone = hasError ? "danger" : warning ? "warning" : "default";

  return (
    <div className={cn("w-full", wrapperClassName)}>
      {label ? (
        <label className="typo-body-sm-strong text-avito-text-primary mb-2 block">
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

      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          className={cn(selectTriggerVariants({ tone }), triggerClassName)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          className={cn(
            "border-avito-border-primary bg-avito-bg-surface rounded-lg border p-1 shadow-md",
            contentClassName,
          )}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="typo-body-sm text-avito-text-primary focus:bg-avito-bg-page rounded-md px-3 py-2"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasError ? (
        <p
          id={describedBy}
          aria-live="polite"
          className="typo-body-sm text-avito-danger-text mt-1"
        >
          {error}
        </p>
      ) : hasHint ? (
        <p
          id={describedBy}
          className="typo-body-sm text-avito-text-secondary mt-1"
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
};
