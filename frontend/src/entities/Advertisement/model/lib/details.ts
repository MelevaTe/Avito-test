import { advertisementParamsSchemaByCategory } from "@/entities/Advertisement/model/consts/advertisementConsts.ts";
import { getAdvertisementParameterLabel } from "./presentation";
import type { Advertisement } from "../types/advertisement";

const isEmptyValue = (value: unknown): boolean => {
  return value === undefined || value === null || value === "";
};

const getParameterKeys = (advertisement: Advertisement): string[] => {
  return Object.keys(advertisementParamsSchemaByCategory[advertisement.category].shape);
};

export const getMissingFields = (advertisement: Advertisement): string[] => {
  const missingFields: string[] = [];

  if (!advertisement.description?.trim()) {
    missingFields.push("Описание");
  }

  getParameterKeys(advertisement).forEach((key) => {
    const value = advertisement.params[key as keyof typeof advertisement.params];

    if (isEmptyValue(value)) {
      missingFields.push(getAdvertisementParameterLabel(key));
    }
  });

  return missingFields;
};

export const getVisibleParameters = (
  advertisement: Advertisement,
): [string, unknown][] => {
  return getParameterKeys(advertisement)
    .map(
      (key) =>
        [key, advertisement.params[key as keyof typeof advertisement.params]] as [
          string,
          unknown,
        ],
    )
    .filter(([, value]) => !isEmptyValue(value));
};
