import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useUpdateAdvertisementMutation } from "@/entities/Advertisement";
import type { Advertisement } from "@/entities/Advertisement";
import type { AdvertisementEditFormValues } from "@/features/AdvertisementEditForm/model";
import { getRouteAdDetails } from "@/shared/const/router";
import { mapFormValuesToAdvertisement } from "../mapFormValuesToAdvertisement";

export const useAdvertisementEdit = (advertisement: Advertisement) => {
  const navigate = useNavigate();
  const updateMutation = useUpdateAdvertisementMutation();

  const handleSubmit = async (values: AdvertisementEditFormValues) => {
    try {
      const updatedAdvertisement = mapFormValuesToAdvertisement(values, advertisement);
      await updateMutation.mutateAsync(updatedAdvertisement);
      toast.success("Изменения сохранены");
      navigate(getRouteAdDetails(String(advertisement.id)));
    } catch {
      toast.error(
        "При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.",
      );
    }
  };

  const handleCancel = () => {
    navigate(getRouteAdDetails(String(advertisement.id)));
  };

  return {
    handleSubmit,
    handleCancel,
    isSubmitting: updateMutation.isPending,
  };
};
