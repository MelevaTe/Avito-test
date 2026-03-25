import { useEffect } from "react";
import { AdvertisementsList, useAdvertisementsListQuery } from "@/entities/Advertisement";
import { AdvertisementFilters } from "@/features/AdvertisementFilters";
import { LOCAL_STORAGE_ADS_LIST_SCROLL_KEY } from "@/shared/const/localstorage.ts";
import { ContentContainer } from "@/shared/ui/ContentContainer/ContentContainer";
import { Pagination } from "@/shared/ui/Pagination/Pagination.tsx";
import { AdvertisementsPageHeader } from "@/widgets/AdvertisementsPageHeader";
import { AdvertisementsToolbar } from "@/widgets/AdvertisementsToolbar";
import { useAdvertisementsPageState } from "../model/hooks/useAdvertisementsPageState";
import { ITEMS_PER_PAGE } from "../model/lib/searchParams";

const AdsListPage = () => {
  const { state, queryParams, actions } = useAdvertisementsPageState();

  const { data, isLoading, isError, error } = useAdvertisementsListQuery(queryParams);

  useEffect(() => {
    if (isLoading || isError) return;

    const savedScrollY = localStorage.getItem(LOCAL_STORAGE_ADS_LIST_SCROLL_KEY);
    if (!savedScrollY) return;

    const scrollY = Number(savedScrollY);
    if (Number.isNaN(scrollY)) {
      localStorage.removeItem(LOCAL_STORAGE_ADS_LIST_SCROLL_KEY);
      return;
    }

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
      localStorage.removeItem(LOCAL_STORAGE_ADS_LIST_SCROLL_KEY);
    });
  }, [isLoading, isError, data]);

  return (
    <ContentContainer
      size="page"
      className="pt-3 pb-5"
    >
      <div className="space-y-4">
        <AdvertisementsPageHeader total={data?.total ?? 0} />

        <AdvertisementsToolbar
          search={state.searchInput}
          onChangeSearch={actions.setSearch}
          view={state.view}
          onChangeView={actions.setView}
          sortOption={state.sortOption}
          onChangeSortOption={actions.setSortOption}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[256px_minmax(0,1fr)]">
          <AdvertisementFilters
            categories={state.categories}
            needsRevision={state.needsRevision}
            onChangeCategories={actions.setCategories}
            onChangeNeedsRevision={actions.setNeedsRevision}
            onReset={actions.reset}
          />

          <div className="min-w-0">
            <div className="space-y-6">
              <AdvertisementsList
                items={data?.items ?? []}
                view={state.view}
                isLoading={isLoading}
                isError={isError}
                errorMessage={error instanceof Error ? error.message : undefined}
              />

              {!isLoading && !isError && (
                <Pagination
                  className="w-full"
                  page={state.page}
                  total={data?.total ?? 0}
                  perPage={ITEMS_PER_PAGE}
                  onChange={actions.setPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};

export default AdsListPage;
