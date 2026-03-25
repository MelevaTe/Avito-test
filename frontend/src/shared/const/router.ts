export const AppRoutes = {
  ADS: "ads",
  AD_DETAILS: "ad_details",
  AD_EDIT: "ad_edit",
  NOT_FOUND: "not_found",
} as const;

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes];

export const getRouteAds = () => "/ads";
export const getRouteAdDetails = (id: string) => `/ads/${id}`;
export const getRouteAdEdit = (id: string) => `/ads/${id}/edit`;

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteAds()]: AppRoutes.ADS,
  [getRouteAdDetails(":id")]: AppRoutes.AD_DETAILS,
  [getRouteAdEdit(":id")]: AppRoutes.AD_EDIT,
};
