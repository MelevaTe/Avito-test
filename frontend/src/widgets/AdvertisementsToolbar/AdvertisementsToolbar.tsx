import type { AdvertisementView } from "@/entities/Advertisement";
import { AdvertisementSearch } from "@/features/AdvertisementSearch";
import {
  AdvertisementSort,
  type AdvertisementSortOption,
} from "@/features/AdvertisementSort";
import { AdvertisementViewSwitch } from "@/features/AdvertisementViewSwitch";

interface AdvertisementsToolbarProps {
  search: string;
  onChangeSearch: (value: string) => void;
  view: AdvertisementView;
  onChangeView: (value: AdvertisementView) => void;
  sortOption: AdvertisementSortOption;
  onChangeSortOption: (value: AdvertisementSortOption) => void;
}

export const AdvertisementsToolbar = ({
  search,
  onChangeSearch,
  view,
  onChangeView,
  sortOption,
  onChangeSortOption,
}: AdvertisementsToolbarProps) => {
  return (
    <div className="bg-avito-bg-surface rounded-[8px] p-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1">
          <AdvertisementSearch
            value={search}
            onChange={onChangeSearch}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:shrink-0">
          <AdvertisementViewSwitch
            value={view}
            onChange={onChangeView}
          />
          <AdvertisementSort
            value={sortOption}
            onChange={onChangeSortOption}
          />
        </div>
      </div>
    </div>
  );
};
