import { AdDetailsPage } from "@/pages/AdDetailsPage";
import { AdEditPage } from "@/pages/AdEditPage";
import { AdsListPage } from "@/pages/AdsListPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

import {
  AppRoutes,
  getRouteAdDetails,
  getRouteAdEdit,
  getRouteAds,
} from "@/shared/const/router.ts";
import type { AppRoutesProps } from "@/shared/types/router.ts";

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.ADS]: {
    path: getRouteAds(),
    element: <AdsListPage />,
  },
  [AppRoutes.AD_DETAILS]: {
    path: getRouteAdDetails(":id"),
    element: <AdDetailsPage />,
  },
  [AppRoutes.AD_EDIT]: {
    path: getRouteAdEdit(":id"),
    element: <AdEditPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: "*",
    element: <NotFoundPage />,
  },
};
