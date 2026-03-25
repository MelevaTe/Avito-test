import { cn } from "@/shared/lib/utils";
import { Spinner } from "@/shared/ui/Spinner/Spinner";

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => {
  return (
    <div className={cn("flex min-h-dvh flex-1 items-center justify-center", className)}>
      <Spinner className="size-12" />
    </div>
  );
};
