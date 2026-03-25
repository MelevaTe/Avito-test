import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { AdvertisementView } from "@/entities/Advertisement";
import type { AdvertisementCategory as AdvertisementCategoryType } from "@/entities/Advertisement";
import {
  mapSortOptionToQueryParams,
  type AdvertisementSortOption,
} from "@/features/AdvertisementSort";
import { useDebounce } from "@/shared/hooks/useDebounce.ts";
import {
  getCategoriesFromSearchParams,
  getPageFromSearchParams,
  isSortOption,
  isView,
  ITEMS_PER_PAGE,
} from "../lib/searchParams";

export const useAdvertisementsPageState = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = getPageFromSearchParams(searchParams);
  const searchFromParams = searchParams.get("q") || "";

  const rawSort = searchParams.get("sort");
  const rawView = searchParams.get("view");

  const sortOption: AdvertisementSortOption = isSortOption(rawSort)
    ? rawSort
    : "createdAt_desc";

  const view = isView(rawView) ? rawView : AdvertisementView.GRID;
  const categories = getCategoriesFromSearchParams(searchParams);
  const needsRevision = searchParams.get("needsRevision") === "true";

  const [searchInput, setSearchInput] = useState(searchFromParams);

  useEffect(() => {
    setSearchInput(searchFromParams);
  }, [searchFromParams]);

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        nextParams.delete(key);
        return;
      }

      nextParams.set(key, value);
    });

    setSearchParams(nextParams);
  };

  const debouncedSearchUpdate = useDebounce((value: string) => {
    updateSearchParams({
      q: value || null,
      page: "1",
    });
  }, 400);

  const sortParams = useMemo(() => mapSortOptionToQueryParams(sortOption), [sortOption]);

  return {
    state: {
      page,
      searchInput,
      sortOption,
      view,
      categories,
      needsRevision,
    },
    queryParams: {
      q: searchFromParams || undefined,
      limit: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
      categories: categories.length ? categories : undefined,
      needsRevision: needsRevision || undefined,
      sortColumn: sortParams.sortColumn,
      sortDirection: sortParams.sortDirection,
    },
    actions: {
      setSearch: (value: string) => {
        setSearchInput(value);
        debouncedSearchUpdate(value);
      },
      setView: (nextView: AdvertisementView) => {
        updateSearchParams({
          view: nextView,
        });
      },
      setSortOption: (nextSortOption: AdvertisementSortOption) => {
        updateSearchParams({
          sort: nextSortOption,
          page: "1",
        });
      },
      setCategories: (nextCategories: AdvertisementCategoryType[]) => {
        updateSearchParams({
          categories: nextCategories.length ? nextCategories.join(",") : null,
          page: "1",
        });
      },
      setNeedsRevision: (value: boolean) => {
        updateSearchParams({
          needsRevision: value ? "true" : null,
          page: "1",
        });
      },
      reset: () => {
        setSearchInput("");
        setSearchParams({});
      },
      setPage: (nextPage: number) => {
        updateSearchParams({
          page: String(nextPage),
        });
      },
    },
  };
};
