import { cn } from "@/shared/lib/utils";
import { PageLayout } from "@/shared/ui/PageLayout/PageLayout";
import type { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <PageLayout>
      <main className={cn("flex-1", className)}>{children}</main>
    </PageLayout>
  );
}
