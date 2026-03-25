import { AdvertisementCategory, AdvertisementView } from "@/entities/Advertisement";
import type { AdvertisementSortOption } from "@/features/AdvertisementSort";

export const ITEMS_PER_PAGE = 10;

export const isSortOption = (value: string | null): value is AdvertisementSortOption => {
  return (
    value === "createdAt_desc" ||
    value === "createdAt_asc" ||
    value === "title_asc" ||
    value === "title_desc"
  );
};

export const isView = (value: string | null): value is AdvertisementView => {
  return value === AdvertisementView.GRID || value === AdvertisementView.LIST;
};

export const getCategoriesFromSearchParams = (
  searchParams: URLSearchParams,
): AdvertisementCategory[] => {
  const categories = searchParams.get("categories");

  if (!categories) {
    return [];
  }

  return categories
    .split(",")
    .map((item) => item.trim())
    .filter(
      (item): item is AdvertisementCategory =>
        item === AdvertisementCategory.AUTO ||
        item === AdvertisementCategory.ELECTRONICS ||
        item === AdvertisementCategory.REAL_ESTATE,
    );
};

export const getPageFromSearchParams = (searchParams: URLSearchParams) => {
  const rawPage = Number(searchParams.get("page") || "1");

  if (!Number.isFinite(rawPage) || rawPage < 1) {
    return 1;
  }

  return rawPage;
};
