import { AdvertisementSortField, SortDirection } from "@/entities/Advertisement";

export type AdvertisementSortOption =
  | "createdAt_desc"
  | "createdAt_asc"
  | "title_asc"
  | "title_desc";

export const mapSortOptionToQueryParams = (
  value: AdvertisementSortOption,
): {
  sortColumn: AdvertisementSortField;
  sortDirection: SortDirection;
} => {
  switch (value) {
    case "createdAt_desc":
      return {
        sortColumn: AdvertisementSortField.CREATED_AT,
        sortDirection: SortDirection.DESC,
      };

    case "createdAt_asc":
      return {
        sortColumn: AdvertisementSortField.CREATED_AT,
        sortDirection: SortDirection.ASC,
      };

    case "title_desc":
      return {
        sortColumn: AdvertisementSortField.TITLE,
        sortDirection: SortDirection.DESC,
      };

    case "title_asc":
    default:
      return {
        sortColumn: AdvertisementSortField.TITLE,
        sortDirection: SortDirection.ASC,
      };
  }
};
