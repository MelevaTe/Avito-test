import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import type { AdvertisementView } from "../../model/consts/advertisementConsts.ts";

interface AdvertisementListItemSkeletonProps {
  view: AdvertisementView;
}

export const AdvertisementListItemSkeleton = ({
  view,
}: AdvertisementListItemSkeletonProps) => {
  if (view === "list") {
    return (
      <div className="border-avito-border-primary bg-avito-bg-surface flex gap-4 overflow-hidden rounded-2xl border p-4">
        <Skeleton className="min-h-[120px] w-[160px] shrink-0 rounded-xl" />
        <div className="flex flex-1 flex-col gap-3">
          <Skeleton className="h-7 w-[140px]" />
          <Skeleton className="h-8 w-[70%]" />
          <Skeleton className="h-6 w-[30%]" />
          <Skeleton className="h-[26px] w-[150px] rounded-[8px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="border-avito-border-primary bg-avito-bg-surface flex min-h-[268px] w-full flex-col overflow-hidden rounded-2xl border">
      <Skeleton className="h-[150px] w-full rounded-none" />

      <div className="flex flex-1 flex-col p-4 pt-8">
        <Skeleton className="h-[30px] w-[120px] rounded-[10px]" />

        <div className="mt-5 space-y-3">
          <Skeleton className="h-8 w-[70%]" />
          <Skeleton className="h-8 w-[45%]" />
          <Skeleton className="h-[26px] w-[150px] rounded-[8px]" />
        </div>
      </div>
    </div>
  );
};
