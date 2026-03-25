import { type LucideIcon } from "lucide-react";

import { Link } from "react-router-dom";
import { cn } from "@/shared/lib/utils.ts";
import { Button } from "@/shared/ui/Button/Button";
import { Card } from "@/shared/ui/Card/Card";
import { CenteredLayout } from "@/shared/ui/CenteredLayout/CenteredLayout";

interface StatusPageAction {
  label: string;
  to?: string;
  onClick?: () => void;
}

interface StatusPageProps {
  className?: string;
  code?: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  action?: StatusPageAction;
}

export const StatusPage = ({
  className,
  code,
  title,
  description,
  Icon,
  action,
}: StatusPageProps) => {
  return (
    <CenteredLayout className={cn("bg-avito-bg-page", className)}>
      <Card className="border-avito-border-primary bg-avito-bg-surface text-avito-text-primary w-full max-w-md rounded-2xl border p-6 shadow-sm sm:p-8">
        <div className="border-avito-border-primary bg-avito-bg-page mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border">
          <Icon className="text-avito-text-secondary size-7" />
        </div>

        <div className="space-y-2">
          {code ? (
            <p className="text-avito-text-secondary text-sm font-medium tracking-wide">
              {code}
            </p>
          ) : null}

          <h1 className="text-avito-text-primary text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h1>

          <p className="text-avito-text-secondary text-sm leading-6 sm:text-base">
            {description}
          </p>
        </div>

        {action ? (
          <div className="mt-6">
            {action.to ? (
              <Button
                asChild
                variant="primary"
                size="control"
                className="w-full"
              >
                <Link to={action.to}>{action.label}</Link>
              </Button>
            ) : (
              <Button
                variant="primary"
                size="control"
                className="w-full"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            )}
          </div>
        ) : null}
      </Card>
    </CenteredLayout>
  );
};
