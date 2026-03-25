import type { Advertisement } from "@/entities/Advertisement";
import { AdvertisementDescription } from "@/entities/Advertisement/ui/AdvertisementDetails/AdvertisementDescription.tsx";
import { AdvertisementImage } from "@/entities/Advertisement/ui/AdvertisementDetails/AdvertisementImage.tsx";
import { AdvertisementSidebar } from "@/entities/Advertisement/ui/AdvertisementDetails/AdvertisementSidebar.tsx";

export interface AdvertisementDetailsMainProps {
  advertisement: Advertisement;
  missingFields: string[];
  visibleParameters: [string, unknown][];
}

export const AdvertisementDetailsMain = ({
  advertisement,
  missingFields,
  visibleParameters,
}: AdvertisementDetailsMainProps) => {
  return (
    <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[480px_1fr]">
      <div className="flex flex-col gap-8">
        <AdvertisementImage advertisement={advertisement} />

        <AdvertisementDescription description={advertisement.description} />
      </div>
      <div className="flex flex-col gap-9">
        <AdvertisementSidebar
          missingFields={missingFields}
          visibleParameters={visibleParameters}
        />
      </div>
    </div>
  );
};
