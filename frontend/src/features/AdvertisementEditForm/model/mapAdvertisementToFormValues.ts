import { advertisementParamsSchemaByCategory } from "@/entities/Advertisement";
import type { Advertisement } from "@/entities/Advertisement";
import type { AdvertisementEditFormValues } from "@/features/AdvertisementEditForm/model/index.ts";

export const mapAdvertisementToFormValues = (
  advertisement: Advertisement,
): AdvertisementEditFormValues => {
  const parameterKeys = Object.keys(
    advertisementParamsSchemaByCategory[advertisement.category].shape,
  );

  const params = Object.fromEntries(
    parameterKeys.map((key) => {
      const value = advertisement.params[key as keyof typeof advertisement.params];

      return [key, value == null ? "" : String(value)];
    }),
  );

  return {
    category: advertisement.category,
    title: advertisement.title,
    price: advertisement.price == null ? "" : String(advertisement.price),
    description: advertisement.description ?? "",
    params,
  };
};
