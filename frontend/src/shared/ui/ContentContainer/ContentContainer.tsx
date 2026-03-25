import { cn } from "@/shared/lib/utils";
import type { ReactNode } from "react";

const sizeClasses = {
  sm: "max-w-xl",
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  page: "max-w-[1496px]",
  full: "",
} as const;

type ContainerSize = keyof typeof sizeClasses;

interface ContentContainerProps {
  children: ReactNode;
  className?: string;
  size?: ContainerSize;
}

export function ContentContainer({
  children,
  className,
  size = "lg",
}: ContentContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeClasses[size], className)}
    >
      {children}
    </div>
  );
}
