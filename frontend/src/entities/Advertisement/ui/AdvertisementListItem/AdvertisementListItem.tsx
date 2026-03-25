import { Link, useLocation } from "react-router-dom";
import {
  formatAdvertisementPrice,
  getAdvertisementCategoryLabel,
} from "@/entities/Advertisement";
import type { AdvertisementView } from "@/entities/Advertisement/model/consts/advertisementConsts";
import type { AdvertisementListItem } from "@/entities/Advertisement/model/types/advertisement";
import imagePlaceholder from "@/shared/assets/image-placeholder.png";
import { LOCAL_STORAGE_ADS_LIST_SCROLL_KEY } from "@/shared/const/localstorage.ts";
import { getRouteAdDetails } from "@/shared/const/router.ts";

type AdvertisementListItemCardProps = {
  advertisement: AdvertisementListItem;
  view?: AdvertisementView;
};

const MediaPlaceholder = ({ title }: { title: string }) => {
  return (
    <div
      className="bg-avito-placeholder-bg h-full w-full overflow-hidden"
      aria-hidden="true"
    >
      <img
        src={imagePlaceholder}
        alt={title}
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export const AdvertisementListItemCard = ({
  advertisement,
  view = "grid",
}: AdvertisementListItemCardProps) => {
  const location = useLocation();
  const categoryLabel = getAdvertisementCategoryLabel(advertisement.category);
  const price = formatAdvertisementPrice(advertisement.price);

  const to = getRouteAdDetails(String(advertisement.id));
  const from = `${location.pathname}${location.search}`;

  if (view === "list") {
    return (
      <Link
        to={to}
        state={{ from }}
        onClick={() => {
          localStorage.setItem(LOCAL_STORAGE_ADS_LIST_SCROLL_KEY, String(window.scrollY));
        }}
        aria-label={`${advertisement.title}, ${price}`}
        className="border-avito-border-primary bg-avito-bg-surface flex min-h-[120px] w-full overflow-hidden rounded-2xl border text-left shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="border-avito-border-primary relative h-[120px] w-[min(40%,200px)] min-w-[140px] shrink-0 overflow-hidden border-r">
          <MediaPlaceholder title={advertisement.title} />

          <span className="border-avito-border-primary bg-avito-bg-surface text-avito-text-primary typo-body-sm absolute bottom-0 left-4 z-10 inline-flex max-w-[calc(100%-2rem)] -translate-y-1/2 items-center rounded-md border px-3">
            <span className="min-w-0 truncate">{categoryLabel}</span>
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3">
          <h3
            className="typo-body text-avito-text-primary min-h-[24px] truncate"
            title={advertisement.title}
          >
            {advertisement.title}
          </h3>

          <p
            className="typo-meta-lg text-avito-text-secondary mt-2 min-h-[18px] truncate"
            title={price}
          >
            {price}
          </p>

          <div className="mt-3 flex min-h-[26px] items-center">
            {advertisement.needsRevision ? (
              <div className="bg-avito-warning-bg text-avito-warning-text typo-body-sm inline-flex items-center gap-2 rounded-lg px-2 py-[2px]">
                <span
                  className="bg-avito-warning-text size-2 shrink-0 rounded-full"
                  aria-hidden="true"
                />
                <span className="min-w-0 truncate">Требует доработок</span>
              </div>
            ) : null}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={to}
      state={{ from }}
      onClick={() => {
        localStorage.setItem(LOCAL_STORAGE_ADS_LIST_SCROLL_KEY, String(window.scrollY));
      }}
      aria-label={`${advertisement.title}, ${price}`}
      className="border-avito-border-primary bg-avito-bg-surface flex min-h-[268px] w-full max-w-[200px] min-w-0 flex-col justify-self-start overflow-hidden rounded-2xl border text-left shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-[150px] w-full shrink-0">
        <div className="h-full overflow-hidden">
          <MediaPlaceholder title={advertisement.title} />
        </div>

        <span className="border-avito-border-primary bg-avito-bg-surface text-avito-text-primary typo-body-sm absolute bottom-0 left-4 z-10 inline-flex max-w-[calc(100%-2rem)] translate-y-1/2 items-center rounded-md border px-3">
          <span className="min-w-0 truncate">{categoryLabel}</span>
        </span>
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col px-4 pt-7 pb-3">
        <h3
          className="typo-body text-avito-text-primary min-h-[24px] shrink-0 truncate"
          title={advertisement.title}
        >
          {advertisement.title}
        </h3>

        <p
          className="typo-meta-lg text-avito-text-secondary mt-2 min-h-[18px] shrink-0 truncate"
          title={price}
        >
          {price}
        </p>

        <div className="flex-1" />

        <div className="mt-3 flex min-h-[26px] items-center">
          {advertisement.needsRevision ? (
            <div className="bg-avito-warning-bg text-avito-warning-text typo-body-sm inline-flex max-w-full items-center gap-2 rounded-lg px-2 py-[2px]">
              <span
                className="bg-avito-warning-text size-2 shrink-0 rounded-full"
                aria-hidden="true"
              />
              <span className="min-w-0 truncate">Требует доработок</span>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
};
