import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";

export const AdvertisementDetailsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-3">
          <Skeleton className="h-10 w-2/3 rounded-lg" />
          <Skeleton className="h-6 w-40 rounded-lg" />
          <Skeleton className="h-5 w-56 rounded-lg" />
        </div>

        <Skeleton className="h-10 w-40 shrink-0 rounded-lg" />
      </div>

      <Skeleton className="h-[420px] w-full rounded-2xl" />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="bg-avito-bg-surface rounded-2xl p-6">
            <Skeleton className="mb-4 h-8 w-48 rounded-lg" />

            <div className="space-y-3">
              <Skeleton className="h-5 w-full rounded-lg" />
              <Skeleton className="h-5 w-[92%] rounded-lg" />
              <Skeleton className="h-5 w-[78%] rounded-lg" />
            </div>
          </div>

          <div className="bg-avito-bg-surface rounded-2xl p-6">
            <Skeleton className="mb-4 h-8 w-56 rounded-lg" />

            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[180px_minmax(0,1fr)] gap-4"
                >
                  <Skeleton className="h-5 w-32 rounded-lg" />
                  <Skeleton className="h-5 w-40 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-avito-bg-surface rounded-2xl p-6">
          <Skeleton className="mb-4 h-8 w-40 rounded-lg" />

          <div className="space-y-3">
            <Skeleton className="h-5 w-full rounded-lg" />
            <Skeleton className="h-5 w-[88%] rounded-lg" />
            <Skeleton className="h-5 w-[76%] rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
