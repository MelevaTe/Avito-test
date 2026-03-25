import type { Advertisement } from "@/entities/Advertisement";
import {
  getMissingFields,
  getVisibleParameters,
} from "@/entities/Advertisement/model/lib/details";

import { AdvertisementDetailsHeader } from "./AdvertisementDetailsHeader";
import { AdvertisementDetailsMain } from "./AdvertisementDetailsMain";
import type { ReactNode } from "react";

export interface AdvertisementDetailsProps {
  advertisement: Advertisement;
  headerAction?: ReactNode;
  headerNavigationAction?: ReactNode;
}

export const AdvertisementDetails = ({
  advertisement,
  headerAction,
  headerNavigationAction,
}: AdvertisementDetailsProps) => {
  const missingFields = getMissingFields(advertisement);
  const visibleParameters = getVisibleParameters(advertisement);

  return (
    <section className="p-8">
      <AdvertisementDetailsHeader
        advertisement={advertisement}
        actionSlot={headerAction}
        navigationSlot={headerNavigationAction}
      />

      <AdvertisementDetailsMain
        advertisement={advertisement}
        missingFields={missingFields}
        visibleParameters={visibleParameters}
      />
    </section>
  );
};
