import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getAdvertisementById, getAdvertisementsList, updateAdvertisement } from "./api";
import type { Advertisement, GetAdvertisementsListParams } from "../types/advertisement";

export const useAdvertisementsListQuery = (params: GetAdvertisementsListParams) => {
  return useQuery({
    queryKey: ["advertisements", params],
    queryFn: () => getAdvertisementsList(params),
  });
};

export const useAdvertisementByIdQuery = (id: number) => {
  return useQuery({
    queryKey: ["advertisement", id],
    queryFn: () => getAdvertisementById(id),
    enabled: Number.isFinite(id) && id > 0,
  });
};

export const useUpdateAdvertisementMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (advertisement: Advertisement) => updateAdvertisement(advertisement),
    onSuccess: (_, advertisement) => {
      queryClient.invalidateQueries({ queryKey: ["advertisements"] });
      queryClient.invalidateQueries({ queryKey: ["advertisement", advertisement.id] });
    },
  });
};
