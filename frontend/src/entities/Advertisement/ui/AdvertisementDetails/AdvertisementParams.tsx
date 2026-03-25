import {
  formatAdvertisementParameterValue,
  getAdvertisementParameterLabel,
} from "@/entities/Advertisement";

export interface AdvertisementParamsProps {
  params: [string, unknown][];
}

export const AdvertisementParams = ({ params }: AdvertisementParamsProps) => {
  if (!params.length) {
    return null;
  }

  return (
    <section>
      <h2 className="typo-section-title text-avito-text-primary mb-4">Характеристики</h2>

      <dl className="grid grid-cols-[160px_1fr] gap-y-3">
        {params.map(([key, value]) => (
          <div
            key={key}
            className="contents"
          >
            <dt className="typo-body-strong text-avito-text-muted">
              {getAdvertisementParameterLabel(key)}
            </dt>

            <dd className="typo-body text-avito-text-primary m-0">
              {formatAdvertisementParameterValue(value)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
