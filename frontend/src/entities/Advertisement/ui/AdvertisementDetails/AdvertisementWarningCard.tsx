import WarningIcon from "@/shared/assets/warning.svg?react";

export interface AdvertisementWarningCardProps {
  missingFields: string[];
}

export const AdvertisementWarningCard = ({
  missingFields,
}: AdvertisementWarningCardProps) => {
  if (!missingFields.length) return null;

  return (
    <div className="bg-avito-warning-bg rounded-lg px-4 py-3">
      <div className="flex items-start gap-4">
        <WarningIcon
          aria-hidden="true"
          className="mt-1 h-4 w-4 shrink-0"
        />

        <div>
          <h3 className="typo-warning-title text-avito-text-primary">
            Требуются доработки
          </h3>

          <p className="typo-warning-body text-avito-text-primary mt-1">
            У объявления не заполнены поля:
          </p>

          <ul className="typo-warning-body text-avito-text-primary list-disc pl-5">
            {missingFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
