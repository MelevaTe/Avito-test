import { cn } from "@/shared/lib/utils";
import { PageLayout } from "@/shared/ui/PageLayout/PageLayout";
import type { ReactNode } from "react";

interface CenteredLayoutProps {
  children: ReactNode;
  className?: string;
}

export function CenteredLayout({ children, className }: CenteredLayoutProps) {
  return (
    <PageLayout className={cn("items-center justify-center px-4 py-10", className)}>
      {children}
    </PageLayout>
  );
}
