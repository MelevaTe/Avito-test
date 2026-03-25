import { useParams } from "react-router-dom";

import { useAdvertisementByIdQuery } from "@/entities/Advertisement";
import type { Advertisement } from "@/entities/Advertisement";
import {
  AdvertisementEditForm,
  useAdvertisementEdit,
} from "@/features/AdvertisementEditForm";
import { ContentContainer } from "@/shared/ui/ContentContainer/ContentContainer";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";

const PageShell = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-avito-bg-surface min-h-dvh">
    <ContentContainer
      size="page"
      className="pt-3 pb-5"
    >
      {children}
    </ContentContainer>
  </div>
);

const EditFormSkeleton = () => (
  <div className="bg-avito-bg-surface rounded-2xl px-8 py-7">
    <Skeleton className="h-10 w-80 rounded-lg" />

    <div className="mt-6 space-y-5">
      <div>
        <Skeleton className="mb-2 h-5 w-24 rounded" />
        <Skeleton className="h-8 w-[262px] rounded-lg" />
      </div>

      <div className="border-avito-border-primary border-t" />

      <div>
        <Skeleton className="mb-2 h-5 w-20 rounded" />
        <Skeleton className="h-8 w-[456px] rounded-[8px]" />
      </div>
      <div>
        <Skeleton className="mb-2 h-5 w-14 rounded" />
        <Skeleton className="h-8 w-[456px] rounded-[8px]" />
      </div>

      <div className="border-avito-border-primary border-t" />

      <Skeleton className="h-8 w-40 rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-[456px] rounded-[8px]" />
        <Skeleton className="h-8 w-[456px] rounded-[8px]" />
        <Skeleton className="h-8 w-[456px] rounded-[8px]" />
      </div>

      <div className="border-avito-border-primary border-t" />

      <div>
        <Skeleton className="mb-2 h-5 w-24 rounded" />
        <Skeleton className="h-20 w-[640px] rounded-lg" />
      </div>

      <div className="flex gap-3 pt-2">
        <Skeleton className="h-[38px] w-28 rounded-lg" />
        <Skeleton className="h-[38px] w-28 rounded-lg" />
      </div>
    </div>
  </div>
);

export const AdEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const advertisementId = Number(id);
  const isValidId = Number.isInteger(advertisementId) && advertisementId > 0;

  const { data, isLoading, error } = useAdvertisementByIdQuery(advertisementId);

  if (!isValidId) {
    return (
      <PageShell>
        <p className="typo-body text-avito-text-secondary py-8">
          Некорректный ID объявления
        </p>
      </PageShell>
    );
  }

  if (isLoading) {
    return (
      <PageShell>
        <EditFormSkeleton />
      </PageShell>
    );
  }

  if (error || !data) {
    return (
      <PageShell>
        <p className="typo-body text-avito-danger-text py-8">
          {error instanceof Error ? error.message : "Не удалось загрузить объявление"}
        </p>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <AdEditPageContent advertisement={data} />
    </PageShell>
  );
};

const AdEditPageContent = ({ advertisement }: { advertisement: Advertisement }) => {
  const { handleSubmit, handleCancel, isSubmitting } =
    useAdvertisementEdit(advertisement);

  return (
    <div className="bg-avito-bg-surface rounded-2xl px-8 py-7">
      <h1 className="typo-page-title text-avito-text-primary">
        Редактирование объявления
      </h1>

      <AdvertisementEditForm
        advertisement={advertisement}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default AdEditPage;
