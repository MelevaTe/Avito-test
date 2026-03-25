import { cn } from "@/shared/lib/utils";
import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div
      className={cn(
        "bg-avito-bg-page text-avito-text-primary flex min-h-dvh flex-col",
        className,
      )}
    >
      {children}
    </div>
  );
}
