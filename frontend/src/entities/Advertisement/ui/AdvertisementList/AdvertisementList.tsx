import { AdvertisementListItemCard } from "../AdvertisementListItem/AdvertisementListItem.tsx";
import { AdvertisementListItemSkeleton } from "../AdvertisementListItem/AdvertisementListItemSkeleton.tsx";
import type { AdvertisementView } from "../../model/consts/advertisementConsts.ts";
import type { AdvertisementListItem } from "../../model/types/advertisement.ts";

interface AdvertisementsListProps {
  items: AdvertisementListItem[];
  view: AdvertisementView;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const SKELETON_COUNT = 10;

export const AdvertisementsList = ({
  items,
  view,
  isLoading = false,
  isError = false,
  errorMessage,
}: AdvertisementsListProps) => {
  const listClassName =
    view === "grid"
      ? "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      : "flex flex-col gap-4";

  if (isLoading) {
    return (
      <div className={listClassName}>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <AdvertisementListItemSkeleton
            key={index}
            view={view}
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-avito-danger-bg text-avito-danger-text rounded-2xl p-6">
        {errorMessage || "Не удалось загрузить объявления"}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="bg-avito-bg-surface text-avito-text-secondary rounded-2xl p-6">
        Ничего не найдено
      </div>
    );
  }

  return (
    <div className={listClassName}>
      {items.map((item) => (
        <AdvertisementListItemCard
          key={item.id}
          advertisement={item}
          view={view}
        />
      ))}
    </div>
  );
};
