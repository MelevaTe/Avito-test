export interface AdvertisementDescriptionProps {
  description?: string | null;
}

export const AdvertisementDescription = ({
  description,
}: AdvertisementDescriptionProps) => {
  return (
    <div>
      <h2 className="typo-section-title text-avito-text-primary mb-4">Описание</h2>

      <p className="typo-body text-avito-text-primary whitespace-pre-wrap">
        {description?.trim() || "Отсутствует"}
      </p>
    </div>
  );
};
