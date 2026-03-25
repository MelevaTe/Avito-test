import { AdvertisementCategory } from "@/entities/Advertisement";
import type { Advertisement } from "@/entities/Advertisement";
import type { AdvertisementEditFormValues } from "@/features/AdvertisementEditForm/model/index.ts";

const parseOptionalNumber = (value: string): number | undefined => {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return undefined;
  }

  const parsedValue = Number(normalizedValue);

  return Number.isNaN(parsedValue) ? undefined : parsedValue;
};

const trimToUndefined = (value: string | undefined): string | undefined => {
  const normalizedValue = value?.trim();

  return normalizedValue ? normalizedValue : undefined;
};

export const mapFormValuesToAdvertisement = (
  values: AdvertisementEditFormValues,
  advertisement: Advertisement,
): Advertisement => {
  const baseFields = {
    ...advertisement,
    category: values.category,
    title: values.title.trim(),
    description: trimToUndefined(values.description),
    price: Number(values.price.trim()),
  };

  if (values.category === AdvertisementCategory.AUTO) {
    return {
      ...baseFields,
      category: AdvertisementCategory.AUTO,
      params: {
        brand: trimToUndefined(values.params.brand),
        model: trimToUndefined(values.params.model),
        yearOfManufacture: parseOptionalNumber(values.params.yearOfManufacture ?? ""),
        transmission:
          values.params.transmission === "automatic" ||
          values.params.transmission === "manual"
            ? values.params.transmission
            : undefined,
        mileage: parseOptionalNumber(values.params.mileage ?? ""),
        enginePower: parseOptionalNumber(values.params.enginePower ?? ""),
      },
    };
  }

  if (values.category === AdvertisementCategory.REAL_ESTATE) {
    return {
      ...baseFields,
      category: AdvertisementCategory.REAL_ESTATE,
      params: {
        type:
          values.params.type === "flat" ||
          values.params.type === "house" ||
          values.params.type === "room"
            ? values.params.type
            : undefined,
        address: trimToUndefined(values.params.address),
        area: parseOptionalNumber(values.params.area ?? ""),
        floor: parseOptionalNumber(values.params.floor ?? ""),
      },
    };
  }

  return {
    ...baseFields,
    category: AdvertisementCategory.ELECTRONICS,
    params: {
      type:
        values.params.type === "phone" ||
        values.params.type === "laptop" ||
        values.params.type === "misc"
          ? values.params.type
          : undefined,
      brand: trimToUndefined(values.params.brand),
      model: trimToUndefined(values.params.model),
      condition:
        values.params.condition === "new" || values.params.condition === "used"
          ? values.params.condition
          : undefined,
      color: trimToUndefined(values.params.color),
    },
  };
};
