import {
  type Advertisement,
  formatAdvertisementDate,
  formatAdvertisementPrice,
} from "@/entities/Advertisement";
import type { ReactNode } from "react";

export interface AdvertisementDetailsHeaderProps {
  advertisement: Advertisement;
  actionSlot?: ReactNode;
  navigationSlot?: ReactNode;
}

export const AdvertisementDetailsHeader = ({
  advertisement,
  actionSlot,
  navigationSlot,
}: AdvertisementDetailsHeaderProps) => {
  const isEdited =
    advertisement.updatedAt && advertisement.updatedAt !== advertisement.createdAt;

  return (
    <div className="flex flex-col gap-3">
      {navigationSlot ? <div>{navigationSlot}</div> : null}

      <div className="flex justify-between">
        <h1 className="typo-page-title text-avito-text-primary">{advertisement.title}</h1>

        <div className="typo-page-title text-avito-text-primary">
          {formatAdvertisementPrice(advertisement.price)}
        </div>
      </div>
      <div className="flex justify-between">
        <div>{actionSlot}</div>

        <div className="typo-meta text-avito-text-tertiary">
          <p>Опубликовано: {formatAdvertisementDate(advertisement.createdAt)}</p>

          <p className={isEdited ? "" : "invisible"}>
            Отредактировано: {formatAdvertisementDate(advertisement.updatedAt)}
          </p>
        </div>
      </div>

      <div className="bg-avito-border-primary mt-4 h-px" />
    </div>
  );
};
