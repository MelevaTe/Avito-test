import { useParams } from "react-router-dom";

import {
  AdvertisementDetails,
  AdvertisementDetailsSkeleton,
  useAdvertisementByIdQuery,
} from "@/entities/Advertisement";
import { AdvertisementBackButton } from "@/features/AdvertisementBackButton/AdvertisementBackButton";
import { EditAdvertisementButton } from "@/features/AdvertisementEdit";
import { ContentContainer } from "@/shared/ui/ContentContainer/ContentContainer";

export const AdDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const advertisementId = Number(id);
  const isValidId = Number.isInteger(advertisementId) && advertisementId > 0;

  const { data, isLoading, error } = useAdvertisementByIdQuery(advertisementId);

  if (!isValidId) {
    return (
      <div className="bg-avito-bg-surface min-h-dvh">
        <ContentContainer
          size="page"
          className="pt-3 pb-5"
        >
          <div>Некорректный id</div>
        </ContentContainer>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-avito-bg-surface min-h-dvh">
        <ContentContainer
          size="page"
          className="pt-3 pb-5"
        >
          <AdvertisementDetailsSkeleton />
        </ContentContainer>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-avito-bg-surface min-h-dvh">
        <ContentContainer
          size="page"
          className="pt-3 pb-5"
        >
          <div>{error instanceof Error ? error.message : "Ошибка"}</div>
        </ContentContainer>
      </div>
    );
  }

  return (
    <div className="bg-avito-bg-surface min-h-dvh">
      <ContentContainer
        size="page"
        className="pt-3 pb-5"
      >
        <AdvertisementDetails
          advertisement={data}
          headerNavigationAction={<AdvertisementBackButton />}
          headerAction={<EditAdvertisementButton id={data.id} />}
        />
      </ContentContainer>
    </div>
  );
};

export default AdDetailsPage;
