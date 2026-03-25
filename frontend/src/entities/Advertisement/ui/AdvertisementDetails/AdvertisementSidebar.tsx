import { AdvertisementParams } from "@/entities/Advertisement/ui/AdvertisementDetails/AdvertisementParams.tsx";
import { AdvertisementWarningCard } from "./AdvertisementWarningCard";

export interface AdvertisementSidebarProps {
  missingFields: string[];
  visibleParameters: [string, unknown][];
}

export const AdvertisementSidebar = ({
  missingFields,
  visibleParameters,
}: AdvertisementSidebarProps) => {
  return (
    <>
      <AdvertisementWarningCard missingFields={missingFields} />

      <AdvertisementParams params={visibleParameters} />
    </>
  );
};
