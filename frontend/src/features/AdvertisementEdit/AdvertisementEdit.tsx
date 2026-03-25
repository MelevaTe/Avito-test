import { useNavigate } from "react-router-dom";
import EditIcon from "@/shared/assets/Edit.svg?react";
import { getRouteAdEdit } from "@/shared/const/router";
import { Button } from "@/shared/ui/Button/Button";

interface EditAdvertisementButtonProps {
  id: number;
}

export const EditAdvertisementButton = ({ id }: EditAdvertisementButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      onClick={() => navigate(getRouteAdEdit(String(id)))}
      className="inline-flex items-center gap-2"
    >
      <span>Редактировать</span>
      <EditIcon
        aria-hidden="true"
        className="h-4 w-4 shrink-0"
      />
    </Button>
  );
};
