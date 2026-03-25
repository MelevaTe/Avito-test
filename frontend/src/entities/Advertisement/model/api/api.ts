import {
  advertisementSchema,
  advertisementsListResponseSchema,
} from "@/entities/Advertisement/lib/advertisementSchemas.ts";
import type {
  Advertisement,
  AdvertisementsListResponse,
  GetAdvertisementsListParams,
} from "@/entities/Advertisement/model/types/advertisement.ts";
import { $api } from "@/shared/api/api";

const buildAdvertisementsListParams = (params: GetAdvertisementsListParams) => {
  return {
    q: params.q || undefined,
    limit: params.limit,
    skip: params.skip,
    categories: params.categories?.length ? params.categories.join(",") : undefined,
    needsRevision: params.needsRevision || undefined,
    sortColumn: params.sortColumn,
    sortDirection: params.sortDirection,
  };
};

export const getAdvertisementsList = async (
  params: GetAdvertisementsListParams,
): Promise<AdvertisementsListResponse> => {
  const response = await $api.get("/items", {
    params: buildAdvertisementsListParams(params),
  });

  const parsed = advertisementsListResponseSchema.safeParse(response.data);

  if (!parsed.success) {
    console.error("Invalid advertisements list response", parsed.error);
    throw new Error("Некорректный формат списка объявлений");
  }

  return parsed.data;
};

export const getAdvertisementById = async (id: number): Promise<Advertisement> => {
  const response = await $api.get(`/items/${id}`);

  const parsed = advertisementSchema.safeParse(response.data);

  if (!parsed.success) {
    console.error("Invalid advertisement details response", parsed.error);
    throw new Error("Некорректный формат объявления");
  }

  return parsed.data;
};

export const updateAdvertisement = async (
  advertisement: Advertisement,
): Promise<{ success: boolean }> => {
  const response = await $api.put(`/items/${advertisement.id}`, advertisement);

  return response.data;
};
