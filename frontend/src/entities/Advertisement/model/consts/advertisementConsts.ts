import {
  autoAdvertisementParamsSchema,
  electronicsAdvertisementParamsSchema,
  realEstateAdvertisementParamsSchema,
} from "../../lib/advertisementSchemas";

export const SortDirection = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];

export const AdvertisementCategory = {
  AUTO: "auto",
  REAL_ESTATE: "real_estate",
  ELECTRONICS: "electronics",
} as const;

export type AdvertisementCategory =
  (typeof AdvertisementCategory)[keyof typeof AdvertisementCategory];

export const AdvertisementSortField = {
  TITLE: "title",
  CREATED_AT: "createdAt",
} as const;

export type AdvertisementSortField =
  (typeof AdvertisementSortField)[keyof typeof AdvertisementSortField];

export const AdvertisementView = {
  GRID: "grid",
  LIST: "list",
} as const;

export type AdvertisementView =
  (typeof AdvertisementView)[keyof typeof AdvertisementView];

export const advertisementParamsSchemaByCategory = {
  [AdvertisementCategory.AUTO]: autoAdvertisementParamsSchema,
  [AdvertisementCategory.REAL_ESTATE]: realEstateAdvertisementParamsSchema,
  [AdvertisementCategory.ELECTRONICS]: electronicsAdvertisementParamsSchema,
} as const;
