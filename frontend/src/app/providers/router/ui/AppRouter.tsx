import { memo, Suspense, useCallback } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { getRouteAds } from "@/shared/const/router.ts";
import type { AppRoutesProps } from "@/shared/types/router.ts";
import { AppShell } from "@/widgets/AppShell";
import { PageLoader } from "@/widgets/PageLoader";
import { routeConfig } from "../config/routeConfig";

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <AppShell>
            <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
          </AppShell>
        }
      />
    );
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            to={getRouteAds()}
            replace
          />
        }
      />
      {Object.values(routeConfig).map(renderWithWrapper)}
    </Routes>
  );
};

export default memo(AppRouter);
