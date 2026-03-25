import { cn } from "@/shared/lib/utils";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "shimmer relative overflow-hidden rounded-md bg-black/10 dark:bg-white/10",
        className,
      )}
    />
  );
};
