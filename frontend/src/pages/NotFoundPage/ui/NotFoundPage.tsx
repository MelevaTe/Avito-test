import { SearchX } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getRouteAds } from "@/shared/const/router.ts";
import { StatusPage } from "@/widgets/StatusPage";

const NotFoundPage = () => {
  const { t } = useTranslation("notFound");

  return (
    <StatusPage
      code="404"
      title={t("pageNotFound")}
      description={t("pageNotFoundDescription")}
      Icon={SearchX}
      action={{
        label: t("backToMain"),
        to: getRouteAds(),
      }}
    />
  );
};

export default NotFoundPage;
