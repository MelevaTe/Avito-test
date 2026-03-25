import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { getRouteAds } from "@/shared/const/router";
import { Button } from "@/shared/ui/Button/Button";

type AdvertisementDetailsLocationState = {
  from?: string;
};

export const AdvertisementBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const state = location.state as AdvertisementDetailsLocationState | null;

    if (state?.from) {
      navigate(state.from);
      return;
    }

    navigate(getRouteAds());
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="small"
      className="w-fit"
      onClick={handleBack}
    >
      <ArrowLeft />
      Назад
    </Button>
  );
};
